/**
 * Storage do painel /admin.
 *
 * Em produção (Vercel) usa Upstash Redis via REST — basta ter as envs
 * KV_REST_API_URL + KV_REST_API_TOKEN (provisionadas pelo Marketplace da Vercel).
 * Localmente, sem essas envs, cai num arquivo JSON em .admin-data/ (gitignorado),
 * pra dar pra desenvolver/testar sem banco.
 *
 * Guardamos tudo como valores JSON simples (string), o que é suficiente pro
 * volume deste painel (configurações + leads da campanha).
 */

import { promises as fs } from "fs";
import path from "path";

// Aceita os dois padrões de nome que a Vercel/Upstash pode criar.
const REST_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const STORE_BACKEND: "redis" | "file" =
  REST_URL && REST_TOKEN ? "redis" : "file";

const LOCAL_DIR = path.join(process.cwd(), ".admin-data");
const LOCAL_FILE = path.join(LOCAL_DIR, "db.json");

/* ------------------------------------------------------------------ */
/*  Upstash REST                                                       */
/* ------------------------------------------------------------------ */

async function redisCommand<T = unknown>(command: unknown[]): Promise<T> {
  const res = await fetch(REST_URL as string, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upstash ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as { result: T; error?: string };
  if (json.error) throw new Error(`Upstash error: ${json.error}`);
  return json.result;
}

/* ------------------------------------------------------------------ */
/*  Fallback local (arquivo)                                           */
/* ------------------------------------------------------------------ */

async function readLocal(): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

async function writeLocal(data: Record<string, string>): Promise<void> {
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(data, null, 2), "utf8");
}

/* ------------------------------------------------------------------ */
/*  API pública                                                        */
/* ------------------------------------------------------------------ */

export async function kvGet<T>(key: string): Promise<T | null> {
  let raw: string | null;
  if (STORE_BACKEND === "redis") {
    raw = await redisCommand<string | null>(["GET", key]);
  } else {
    const data = await readLocal();
    raw = data[key] ?? null;
  }
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function kvSet<T>(key: string, value: T): Promise<void> {
  const raw = JSON.stringify(value);
  if (STORE_BACKEND === "redis") {
    await redisCommand(["SET", key, raw]);
  } else {
    const data = await readLocal();
    data[key] = raw;
    await writeLocal(data);
  }
}

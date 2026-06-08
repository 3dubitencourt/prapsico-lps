/**
 * Auth simples do painel /admin: uma senha compartilhada (env ADMIN_PASSWORD).
 *
 * O cookie NÃO guarda a senha crua — guarda um token derivado por SHA-256
 * (senha + sal fixo). O middleware e as rotas recalculam o token esperado e
 * comparam. Usa Web Crypto (globalThis.crypto.subtle), que existe tanto no
 * runtime Edge (middleware) quanto no Node (rotas), então o mesmo código vale
 * pros dois lados.
 */

export const ADMIN_COOKIE = "prapsico_admin";
const SALT = "prapsico-admin-v1";

/** Senha vigente. Se não houver env, usa uma default só pra não travar o dev local. */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "prapsico2026";
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token que vai pro cookie quando o login dá certo. */
export async function makeSessionToken(password: string): Promise<string> {
  return sha256Hex(`${SALT}:${password}`);
}

/** Confere se o valor do cookie corresponde à senha vigente. */
export async function isValidSession(
  cookieValue: string | undefined,
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await makeSessionToken(getAdminPassword());
  // comparação de tamanho constante o suficiente pro caso
  if (cookieValue.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= cookieValue.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

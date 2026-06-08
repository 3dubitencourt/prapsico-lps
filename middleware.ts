import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/admin/auth";

/**
 * Protege a área administrativa. Tudo sob /admin e /api/admin exige sessão
 * válida, exceto a própria tela/rota de login. Sem sessão → redireciona pro
 * login (páginas) ou responde 401 (rotas de API).
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // rotas liberadas (login)
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await isValidSession(cookie);
  if (ok) return NextResponse.next();

  if (isAdminApi) {
    return NextResponse.json({ error: "não autenticado" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

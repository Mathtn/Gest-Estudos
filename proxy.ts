import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {

  const usuario = request.cookies.get('usuario_email');
  const { pathname } = request.nextUrl;


  if (!usuario && (pathname.startsWith('/dashboard') || pathname.startsWith('/perfil'))) {

    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (usuario && (pathname === '/login' || pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*', '/login', '/register'], 
};
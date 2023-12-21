import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    '/',
    '/((?!maintenance|_next/static|_next/image|assets|favicon.ico).*)',
  ]
}

export async function middleware(req: NextRequest) {
  // development & staging環境の場合Basic認証を適応する
  if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development" || process.env.NEXT_PUBLIC_ENVIRONMENT == "staging") {
    if (req.nextUrl.pathname.startsWith('/')) {
      const authorizationHeader = req.headers.get('authorization')

      if (authorizationHeader) {
        const basicAuth = authorizationHeader.split(' ')[1]
        const [user, password] = atob(basicAuth).split(':')

        if (
          user === process.env.NEXT_PUBLIC_BASIC_AUTH_USER &&
          password === process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD
        ) {
          return NextResponse.next()
        }
      }

      return new NextResponse('Auth Requred', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Auth Requred"'
          },
        });
    }

    return NextResponse.next()
  }
}
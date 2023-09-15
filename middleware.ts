import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const role = request.nextauth.token?.role as string
    if (['ADMIN', 'EDITOR'].includes(role)
      && request.nextUrl.pathname.startsWith('/user')) {
      return NextResponse.rewrite(
        new URL('/manage', request.url)
      )
    }

    if (!['ADMIN', 'EDITOR'].includes(role)
      && request.nextUrl.pathname.startsWith('/manage')) {
      return NextResponse.rewrite(
        new URL('/user', request.url)
      )
    }
  }, {
  callbacks: {
    authorized: ({ token }) => !!token
  }
}
)


// export { default } from 'next-auth/middleware' 
export const config = {
  matcher: ['/user', '/manage']
}
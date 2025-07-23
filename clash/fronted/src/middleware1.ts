import { NextResponse, NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
	const token = !!request.cookies.get('token')?.value;
	console.log(request.nextUrl.pathname)
	const isAuthPage = request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/register');

	if (request.nextUrl.pathname === '/'){
		return NextResponse.next()
	}

	if (token && isAuthPage) {
		console.log("Token found, redirecting to dashboard");
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	if (!token && !isAuthPage) {
		console.log("No token found, redirecting to login");
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}
 
export const config = {
  matcher: ['/login', '/register', '/dashboard', '/'],
}
import { NextResponse } from 'next/server';

export function proxy() {
  // Extension point: add real session validation when authentication exists.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

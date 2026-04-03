import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const userCookie = request.cookies.get('user');
    const tokenCookie = request.cookies.get('auth_token');

    if (!tokenCookie || !userCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    try {
      const user = JSON.parse(userCookie.value);
      return NextResponse.json(
        {
          authenticated: true,
          user,
        },
        { status: 200 }
      );
    } catch (e) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  }
}

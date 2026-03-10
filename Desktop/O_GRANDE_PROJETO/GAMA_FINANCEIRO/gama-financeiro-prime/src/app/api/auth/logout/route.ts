import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Clear auth cookies
    const response = NextResponse.json(
      { message: 'Logout realizado com sucesso' },
      { status: 200 }
    );

    response.cookies.delete('auth_token');
    response.cookies.delete('user');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer logout' },
      { status: 500 }
    );
  }
}

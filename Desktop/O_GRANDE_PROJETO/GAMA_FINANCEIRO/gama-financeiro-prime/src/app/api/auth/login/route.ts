import { NextRequest, NextResponse } from 'next/server';

// Hardcoded users for now
const USERS = [
  {
    id: '1',
    email: 'matheus@gama.com',
    password: 'GamaFinanceiro2024',
    role: 'ceo',
    name: 'Matheus Queiroz',
    title: 'CEO Agência GAMA',
  },
  {
    id: '2',
    email: 'user@gama.com',
    password: 'GamaUser2024',
    role: 'user',
    name: 'Usuário Demo',
    title: 'Operador',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Find user
    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Create token (simple JWT-like token for demo)
    const token = Buffer.from(
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
      })
    ).toString('base64');

    // Prepare response
    const response = NextResponse.json(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          title: user.title,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Set httpOnly cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    response.cookies.set('user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      title: user.title,
      role: user.role,
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}

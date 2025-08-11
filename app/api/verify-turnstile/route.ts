import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, error: 'Token is missing.' }, { status: 400 });
  }

  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('CLOUDFLARE_TURNSTILE_SECRET_KEY is not set.');
    return NextResponse.json({ success: false, error: 'Server configuration error.' }, { status: 500 });
  }

  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);
  
  const ip = req.headers.get('x-forwarded-for');
  if (ip) {
    formData.append('remoteip', ip);
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid token.', 'error-codes': data['error-codes'] }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return NextResponse.json({ success: false, error: 'Error verifying token.' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Create form data for Groq API
    const groqFormData = new FormData();
    groqFormData.append('file', audioFile);
    groqFormData.append('model', 'whisper-large-v3-turbo');
    groqFormData.append('language', 'pt');
    groqFormData.append('response_format', 'json');

    // Call Groq API
    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: groqFormData,
      }
    );

    if (!groqResponse.ok) {
      const error = await groqResponse.json();
      return NextResponse.json(
        {
          error: 'Transcription failed',
          details: error.error?.message || groqResponse.statusText,
        },
        { status: groqResponse.status }
      );
    }

    const result = await groqResponse.json();

    return NextResponse.json({
      success: true,
      text: result.text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      {
        error: 'Transcription failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

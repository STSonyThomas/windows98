export async function POST(request) {
  const { messages } = await request.json();

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xai-zuRHQkmPKUpH7a2LIES73A7HfxSgJaeSrNFHYnEz3HKv12rmKwp0jNMQV8gQU7K1qM63gcSlPC7XbpeN'
      },
      body: JSON.stringify({
        messages,
        model: 'grok-2-1212',
        stream: false,
        temperature: 0
      })
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

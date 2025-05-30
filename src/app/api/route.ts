export async function GET(request: Request) {
  console.log('processing the request');
  const response = new Response('This is the coolest thing ever', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });

  return response;
}

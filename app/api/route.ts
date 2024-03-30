export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
}

export async function POST(request: Request) {
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
}

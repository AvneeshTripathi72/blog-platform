export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Inkspire</title><description>Publishing for ambitious builders.</description><link>https://example.com</link></channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}

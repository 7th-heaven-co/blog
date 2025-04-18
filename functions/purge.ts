import 'dotenv/config';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  try {
    const { paths = [] } = await request.json();
    if (!Array.isArray(paths) || paths.length === 0) {
      return new Response('No paths provided', { status: 400 });
    }

    const baseUrl = env.SITE_URL.replace(/\/$/, '');
    const files = paths.map((path) => `${baseUrl}${path}`);

    const purgeRequest = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${env.CLOUDFLARE_ZONE_ID}/purge_cache`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files }),
      },
    );

    const result = await purgeRequest.json();

    // Optional: Log history to KV
    if (env.PURGE_HISTORY) {
      const timestamp = new Date().toISOString();
      await env.PURGE_HISTORY.put(`purge-${timestamp}`, JSON.stringify({ paths, timestamp }));
    }

    return new Response(JSON.stringify(result, null, 2), {
      headers: { 'Content-Type': 'application/json' },
      status: purgeRequest.status,
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
};

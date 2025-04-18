import 'dotenv/config';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const logs = [];

  if (!env.PURGE_HISTORY) {
    return new Response('PURGE_HISTORY KV not bound.', { status: 500 });
  }

  for await (const key of env.PURGE_HISTORY.list({ prefix: 'purge-' })) {
    const value = await env.PURGE_HISTORY.get(key.name);
    if (value) {
      logs.push(JSON.parse(value));
    }
  }

  return new Response(
    JSON.stringify(
      logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
      null,
      2,
    ),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
};

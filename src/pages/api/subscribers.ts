import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = env.DB;

  const subscribers = await db
    .prepare('SELECT email, subscribed_at, unsubscribed_at FROM subscribers ORDER BY subscribed_at DESC')
    .all();

  return new Response(JSON.stringify(subscribers.results, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};

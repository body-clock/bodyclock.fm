import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const db = env.DB;
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Invalid unsubscribe link', { status: 400 });
  }

  const subscriber = await db
    .prepare('SELECT id FROM subscribers WHERE unsubscribe_token = ?')
    .bind(token)
    .first();

  if (!subscriber) {
    return new Response('Invalid unsubscribe link', { status: 404 });
  }

  await db
    .prepare('UPDATE subscribers SET unsubscribed_at = datetime("now") WHERE unsubscribe_token = ?')
    .bind(token)
    .run();

  return new Response(
    `<!DOCTYPE html>
<html>
<head><title>Unsubscribed</title></head>
<body style="font-family: Georgia, serif; text-align: center; padding: 4rem 2rem;">
  <h1>You've been unsubscribed</h1>
  <p>You won't receive any more emails from bodyclock.fm.</p>
  <p><a href="https://bodyclock.fm">Return to site</a></p>
</body>
</html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
};

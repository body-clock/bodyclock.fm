import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

// Generate a random unsubscribe token
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

export const POST: APIRoute = async ({ request }) => {
  const db = env.DB;

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if already subscribed
    const existing = await db
      .prepare('SELECT id FROM subscribers WHERE email = ? AND unsubscribed_at IS NULL')
      .bind(email)
      .first();

    if (existing) {
      return new Response(JSON.stringify({ message: 'Already subscribed' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if was previously unsubscribed and resubscribe
    const wasUnsubscribed = await db
      .prepare('SELECT id FROM subscribers WHERE email = ? AND unsubscribed_at IS NOT NULL')
      .bind(email)
      .first();

    if (wasUnsubscribed) {
      await db
        .prepare('UPDATE subscribers SET unsubscribed_at = NULL, subscribed_at = datetime("now") WHERE email = ?')
        .bind(email)
        .run();
    } else {
      // New subscriber
      const token = generateToken();
      await db
        .prepare(
          'INSERT INTO subscribers (email, unsubscribe_token, subscribed_at) VALUES (?, ?, datetime("now"))'
        )
        .bind(email, token)
        .run();
    }

    return new Response(JSON.stringify({ message: 'Subscribed!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

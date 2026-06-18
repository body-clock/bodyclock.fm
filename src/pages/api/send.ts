import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { renderEmail } from '../../lib/email-template';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resendApiKey = env.RESEND_API_KEY as string;
  const fromEmail = (env.FROM_EMAIL as string) || 'patrick@bodyclock.fm';
  const db = env.DB;

  try {
    const body = await request.json();
    const { title, content, slug } = body;

    if (!title) {
      return new Response(JSON.stringify({ error: 'Title required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get all active subscribers
    const subscribers = await db
      .prepare('SELECT email, unsubscribe_token FROM subscribers WHERE unsubscribed_at IS NULL')
      .all();

    if (!subscribers.results.length) {
      return new Response(JSON.stringify({ message: 'No subscribers' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build email using shared template
    // title + content (ad-hoc) or title + description (post-based) both work
    const emailHtml = renderEmail({
      post: {
        title,
        description: content || body.description || '',
        date: body.date ? new Date(body.date) : new Date(),
        slug: slug || '',
        tags: body.tags || [],
      },
      unsubscribeUrl: '{{UNSUBSCRIBE_URL}}',
    });

    // Send to each subscriber
    const results = await Promise.allSettled(
      subscribers.results.map(async (sub: any) => {
        const unsubscribeUrl = `https://bodyclock.fm/api/unsubscribe?token=${sub.unsubscribe_token}`;
        const html = emailHtml.replace('{{UNSUBSCRIBE_URL}}', unsubscribeUrl);

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: sub.email,
            subject: title,
            html,
          }),
        });

        if (!res.ok) {
          const errorBody = await res.text();
          throw new Error(`Failed to send to ${sub.email}: ${res.status} - ${errorBody}`);
        }
        return sub.email;
      })
    );

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failedResults = results.filter((r) => r.status === 'rejected');
    const failed = failedResults.length;
    const errors = failedResults.map((r: any) => r.reason?.message);

    return new Response(
      JSON.stringify({
        message: `Sent to ${sent} subscribers`,
        failed,
        errors,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Send error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send', details: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

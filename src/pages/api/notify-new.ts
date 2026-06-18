import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { env } from 'cloudflare:workers';
import { renderEmail, type EmailPost } from '../../lib/email-template';

export const prerender = false;

/**
 * POST /api/notify-new
 *
 * Finds blog posts that haven't been emailed to subscribers yet,
 * sends an email for each new post, and records the notification.
 *
 * Called automatically after deploy via the deploy script in package.json.
 */
export const POST: APIRoute = async () => {
  const resendApiKey = env.RESEND_API_KEY as string;
  const fromEmail = (env.FROM_EMAIL as string) || 'patrick@bodyclock.fm';
  const db = env.DB;

  try {
    // 1. Get all published blog posts from the content collection
    const allPosts = await getCollection('blog');
    const publishedPosts = allPosts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    if (!publishedPosts.length) {
      return new Response(JSON.stringify({ message: 'No posts found' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Get the set of already-notified post slugs from D1
    const notifiedResult = await db
      .prepare('SELECT post_slug FROM notifications')
      .all();
    const notifiedSlugs = new Set(
      (notifiedResult.results as { post_slug: string }[]).map((r) => r.post_slug)
    );

    // 3. Find new posts (not yet notified)
    const newPosts = publishedPosts.filter(
      (post) => !notifiedSlugs.has(post.id)
    );

    if (!newPosts.length) {
      return new Response(
        JSON.stringify({ message: 'No new posts to notify' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 4. Get all active subscribers
    const subscribers = await db
      .prepare(
        'SELECT email, unsubscribe_token FROM subscribers WHERE unsubscribed_at IS NULL'
      )
      .all();

    if (!subscribers.results.length) {
      // Record posts as notified even if no subscribers, so we don't retry forever
      for (const post of newPosts) {
        await db
          .prepare('INSERT INTO notifications (post_slug, post_title) VALUES (?, ?)')
          .bind(post.id, post.data.title)
          .run();
      }
      return new Response(
        JSON.stringify({ message: 'No subscribers to notify', newPosts: newPosts.map((p) => p.id) }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. Send emails for each new post to all subscribers
    type SendResult = {
      slug: string;
      sent: number;
      failed: number;
      errors: string[];
    };

    const results: SendResult[] = [];

    for (const post of newPosts) {
      const emailPost: EmailPost = {
        title: post.data.title,
        description: post.data.description,
        date: post.data.date,
        slug: post.id,
        tags: post.data.tags,
      };

      const sendResults = await Promise.allSettled(
        subscribers.results.map(async (sub: any) => {
          const emailHtml = renderEmail({
            post: emailPost,
            unsubscribeUrl: `https://bodyclock.fm/api/unsubscribe?token=${sub.unsubscribe_token}`,
          });

          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: fromEmail,
              to: sub.email,
              subject: post.data.title,
              html: emailHtml,
            }),
          });

          if (!res.ok) {
            const errorBody = await res.text();
            throw new Error(
              `Failed to send to ${sub.email}: ${res.status} - ${errorBody}`
            );
          }
          return sub.email;
        })
      );

      const sent = sendResults.filter((r) => r.status === 'fulfilled').length;
      const failedResults = sendResults.filter((r) => r.status === 'rejected');
      const errors = failedResults.map((r: any) => r.reason?.message);

      results.push({ slug: post.id, sent, failed: failedResults.length, errors });

      // Record notification only if at least one send succeeded, or if there are no subscribers
      if (sent > 0 || !subscribers.results.length) {
        await db
          .prepare(
            'INSERT INTO notifications (post_slug, post_title, sent_at) VALUES (?, ?, datetime("now"))'
          )
          .bind(post.id, post.data.title)
          .run();
      }
    }

    return new Response(
      JSON.stringify({ message: 'Notifications sent', results }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Notify error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send notifications',
        details: (error as Error).message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

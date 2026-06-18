/**
 * Email template for bodyclock.fm newsletters.
 * Matches the site's design: purple palette, Georgia body, Recursive headings.
 * Uses inline styles for email client compatibility.
 */

export interface EmailPost {
  title: string;
  description?: string;
  date: Date;
  slug: string;
  tags?: string[];
}

interface EmailOptions {
  post: EmailPost;
  unsubscribeUrl: string;
}

const colors = {
  bg: '#faf5ff',
  text: '#6d28d9',
  textMuted: '#9333ea',
  accent: '#7c3aed',
  surface: '#f3e8ff',
  border: '#e9d5ff',
};

const fontBody = "Georgia, 'Times New Roman', serif";
const fontHeading =
  "'Recursive', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export function renderEmail({ post, unsubscribeUrl }: EmailOptions): string {
  const siteUrl = 'https://bodyclock.fm';
  const postUrl = `${siteUrl}/blog/${post.slug}/`;
  const date = post.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tagsHtml =
    post.tags && post.tags.length > 0
      ? post.tags
          .map(
            (tag) =>
              `<span style="display:inline-block;font-size:12px;color:${colors.textMuted};border:1px solid ${colors.text};border-radius:999px;padding:2px 8px;margin-right:4px;margin-bottom:4px;text-decoration:none;">#${tag}</span>`
          )
          .join('')
      : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>${post.title} — Body Clock</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.bg};font-family:${fontBody};line-height:1.6;color:${colors.text};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-family:${fontHeading};font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${colors.textMuted};">
                Body Clock
              </p>
            </td>
          </tr>

          <!-- Post card -->
          <tr>
            <td style="background-color:#ffffff;border:1px solid ${colors.border};border-radius:8px;padding:40px 36px;">

              <!-- Tags -->
              ${tagsHtml ? `<div style="margin-bottom:16px;">${tagsHtml}</div>` : ''}

              <!-- Title -->
              <h1 style="margin:0 0 12px;font-family:${fontHeading};font-size:24px;font-weight:900;line-height:1.2;color:${colors.text};">
                <a href="${postUrl}" style="color:${colors.text};text-decoration-color:${colors.accent};text-decoration-thickness:1px;text-underline-offset:2px;">
                  ${escapeHtml(post.title)}
                </a>
              </h1>

              <!-- Date -->
              <p style="margin:0 0 20px;font-size:13px;color:${colors.textMuted};">
                ${date}
              </p>

              <!-- Description -->
              ${
                post.description
                  ? `<p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:${colors.text};">${escapeHtml(post.description)}</p>`
                  : ''
              }

              <!-- Read more button -->
              <a href="${postUrl}" style="display:inline-block;background-color:${colors.accent};color:#ffffff;font-family:${fontHeading};font-size:14px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:6px;text-align:center;">
                Read the full post →
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:${colors.textMuted};">
                You're receiving this because you subscribed at
                <a href="${siteUrl}" style="color:${colors.textMuted};">bodyclock.fm</a>.
              </p>
              <p style="margin:0;font-size:12px;">
                <a href="${unsubscribeUrl}" style="color:${colors.textMuted};text-decoration:underline;">Unsubscribe</a>
                &nbsp;·&nbsp;
                <a href="${siteUrl}" style="color:${colors.textMuted};text-decoration:underline;">bodyclock.fm</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

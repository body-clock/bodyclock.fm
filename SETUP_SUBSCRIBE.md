# Email Subscription Setup

## 1. Create D1 Database

```bash
wrangler d1 create bodyclock-subscribers
```

Copy the `database_id` from the output.

## 2. Add D1 Binding in Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Workers & Pages → bodyclockfm
2. Go to Settings → Bindings
3. Add D1 Database binding:
   - Variable name: `DB`
   - Database: select the one you just created

## 3. Initialize Database Schema

```bash
wrangler d1 execute bodyclock-subscribers --file=schema.sql --remote
```

## 4. Get Resend API Key

1. Sign up at [resend.com](https://resend.com) (free: 3,000 emails/month)
2. Create an API key
3. Verify your domain `bodyclock.fm` in Resend (add DNS records)
4. Add API key as environment variable in Cloudflare Dashboard:
   - Settings → Variables & Secrets → Add
   - Variable name: `RESEND_API_KEY`
   - Value: your API key
   - Type: Secret

## 5. Add FROM_EMAIL Variable

In Cloudflare Dashboard → Settings → Variables & Secrets:
- Variable name: `FROM_EMAIL`
- Value: `hello@bodyclock.fm` (or your preferred sender)

## 6. Deploy

```bash
npm run deploy
```

## API Endpoints

- `POST /api/subscribe` - Subscribe an email
- `GET /api/unsubscribe?token=xxx` - Unsubscribe
- `POST /api/send` - Send email to all subscribers
- `GET /api/subscribers` - List all subscribers

## Sending Emails

```bash
curl -X POST https://bodyclock.fm/api/send \
  -H "Content-Type: application/json" \
  -d '{"title": "New Post", "content": "<p>Check out my new post!</p>"}'
```

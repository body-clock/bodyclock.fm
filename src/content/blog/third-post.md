---
title: 'Third post'
description: 'Why I chose Astro for this blog.'
date: '2026-06-05'
tags: ['tech']
---

I spent a lot of time thinking about what platform to use for this blog.

I've used Jekyll before, and it worked fine. But it felt a bit dated. I considered staying in the Ruby ecosystem with Bridgetown, but I wanted to try something new.

Astro kept coming up. It's markdown-first, which is exactly what I want — write a `.md` file, and it becomes a post. No database, no CMS, no admin panel. Just files.

The other thing I liked is the islands architecture. Right now, this site is fully static. No JavaScript at all. But if I want to add an audio player for my music later, I can add a React component without rewriting the whole site. It's built for incremental complexity.

The writing workflow is simple:

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter (title, date, tags)
3. Write
4. Push to GitHub
5. It deploys automatically

That's it. No friction. No admin interface to log into. Just write and push.

I think that's how blogs should work.

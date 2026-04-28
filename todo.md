# Promptier — AI Image Blog · Todo

> A blog-style platform where users share AI-generated images alongside the prompt used to create them.
> Stack: Next.js 16 · React 19 · TypeScript · Tailwind v4 · Clerk auth · Framer Motion

---

## 🗺️ Feature Overview

| Area | Description |
|---|---|
| **Feed** | Infinite-scroll public wall of posts (image + prompt preview) |
| **Post** | Single post page — full image, full prompt, metadata, comments |
| **Create** | Form to upload AI image + enter prompt + tags + model used |
| **Profile** | User profile page — their posts, stats, bio |
| **Explore** | Browse by model, tag, or popularity |
| **Auth** | Sign-up / sign-in via Clerk (already wired) |

---

## ✅ Phase 1 — Backend / Data Layer

- [ ] **Choose a database** — Neon (Postgres) recommended; add `@neondatabase/serverless` + Drizzle ORM
- [ ] **Schema design**
  - `users` — `id`, `clerkId`, `username`, `bio`, `avatarUrl`, `createdAt`
  - `posts` — `id`, `authorId`, `imageUrl`, `prompt`, `title`, `model` (e.g. DALL-E 3, Midjourney, Flux), `tags[]`, `likes`, `createdAt`
  - `comments` — `id`, `postId`, `authorId`, `body`, `createdAt`
  - `likes` — `id`, `postId`, `userId` (unique constraint)
- [ ] **Image storage** — set up Cloudflare R2 or Vercel Blob for image uploads
- [ ] **Server Actions / API routes**
  - `POST /api/posts` — create a post (auth-gated)
  - `GET /api/posts` — paginated feed (public)
  - `GET /api/posts/[id]` — single post
  - `DELETE /api/posts/[id]` — own posts only
  - `POST /api/posts/[id]/like` — toggle like
  - `POST /api/posts/[id]/comments` — add comment
  - `GET /api/users/[username]` — public profile

---

## ✅ Phase 2 — Core UI Pages

### 2a. Home / Feed (`/`)
- [ ] Masonry / responsive grid of post cards
- [ ] Each card: thumbnail, author avatar + name, prompt snippet, like count
- [ ] Infinite scroll or "Load more" pagination
- [ ] Skeleton loading states

### 2b. Create Post (`/create`)
- [ ] Image upload with drag-and-drop (preview before submit)
- [ ] `<textarea>` for the full prompt (no truncation)
- [ ] Optional fields: title, AI model selector, comma-separated tags
- [ ] Client-side validation + optimistic UI on submit
- [ ] Auth guard — redirect unauthenticated users to `/sign-in`

### 2c. Single Post (`/posts/[id]`)
- [ ] Full-resolution image with lightbox/zoom
- [ ] Full prompt displayed in a styled code/prose block (easy to copy)
- [ ] Copyable prompt button (one-click copy to clipboard)
- [ ] Like button with animated counter
- [ ] Comment section (authenticated users only)
- [ ] Share button (copy link)
- [ ] Author card → links to their profile
- [ ] Delete button (only visible to post owner)

### 2d. User Profile (`/profile/[username]`)
- [ ] Avatar, display name, bio, join date
- [ ] Post count, total likes received
- [ ] Grid of user's posts (same card component as feed)
- [ ] Edit profile button (own profile only)

### 2e. Explore / Discover (`/explore`)
- [ ] Filter by AI model (DALL-E, Midjourney, Stable Diffusion, Flux, etc.)
- [ ] Filter by tag (clickable tag pills)
- [ ] Sort: Latest · Most Liked · Trending (likes in last 24 h)
- [ ] Search bar (full-text search on prompt + title)

---

## ✅ Phase 3 — Components to Build

- [ ] `<PostCard />` — reusable card for feed + profile grids
- [ ] `<PromptBlock />` — styled prompt display with copy button
- [ ] `<ImageUpload />` — drag-and-drop uploader with preview
- [ ] `<LikeButton />` — animated heart button with optimistic update
- [ ] `<CommentList />` + `<CommentForm />` — threaded comments
- [ ] `<TagPill />` — clickable tag badge
- [ ] `<ModelBadge />` — shows AI model (DALL-E, Flux, etc.) as a badge
- [ ] `<UserAvatar />` — avatar with fallback initials
- [ ] `<InfiniteScroll />` — intersection observer wrapper
- [ ] `<Lightbox />` — full-screen image overlay

---

## ✅ Phase 4 — Design & Polish

- [ ] Define design tokens in `globals.css` (colors, typography, spacing)
- [ ] Dark mode first (already hinted at by the stack)
- [ ] Smooth page transitions using Framer Motion (already installed)
- [ ] Hover animations on cards (scale + shadow)
- [ ] Stagger animation for feed grid on mount
- [ ] Toast notifications (upload success, copy success, errors)
- [ ] Responsive: mobile-first, works well on 320 px → 4 K

---

## ✅ Phase 5 — Auth & Access Control

- [ ] Clerk middleware already in place — verify routes protected correctly
- [ ] Sync Clerk user to DB on first sign-in (`webhooks/clerk`)
- [ ] Public routes: `/`, `/posts/[id]`, `/explore`, `/profile/[username]`
- [ ] Protected routes: `/create`, `/settings`

---

## ✅ Phase 6 — Nice-to-Have / Stretch Goals

- [ ] **AI re-run link** — "Try this prompt" deep-links to ChatGPT / Midjourney with the prompt pre-filled
- [ ] **Collections** — users can save posts to named collections (like bookmarks)
- [ ] **Follow system** — follow users, get a personalized feed
- [ ] **Notification system** — likes + comments on your posts
- [ ] **Prompt remix** — fork a post and post a variation
- [ ] **NSFW filter** — flag / hide explicit content
- [ ] **OG image generation** — dynamic `opengraph-image.tsx` per post for rich social previews
- [ ] **RSS feed** — `/feed.xml` for power users

---

## 🚦 Immediate Next Steps (start here)

1. Pick and provision a database (Neon recommended)
2. Install Drizzle: `bun add drizzle-orm @neondatabase/serverless` + `bun add -d drizzle-kit`
3. Write the schema in `src/db/schema.ts` and run first migration
4. Set up Cloudflare R2 / Vercel Blob for image storage
5. Build `<PostCard />` and wire the feed page at `/`
6. Build the Create Post page at `/create`

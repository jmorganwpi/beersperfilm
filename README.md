# 🍺🎬 Beers Per Film

**Movie ratings for the drinking cinephile.**

How many beers does it take to understand Inception? Find out with our dual-axis rating system measuring confusion and enhancement.

## The Rating System

### 🧠 Confusion Beers (1-10)
How much mental lubrication do you need to follow the plot? From "Crystal Clear" to "Pure Chaos."

### 🎉 Enhancement Beers (1-10)
How much better does the movie get with a buzz? From "Stone Sober" to "Drunk Only."

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Movie Data:** OMDB API
- **Auth:** Supabase Auth (Google OAuth)
- **Hosting:** Vercel (recommended)

## Setup

### 1. Clone and Install

```bash
git clone <your-repo>
cd beersperfilm
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Enable Google Auth:
   - Go to Authentication > Providers > Google
   - Add your Google OAuth credentials
   - Add `http://localhost:3000/auth/callback` to redirect URLs

### 3. Get an OMDB API Key

1. Get a free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Verify your email to activate

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_OMDB_API_KEY=your-omdb-key
OMDB_API_KEY=your-omdb-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Update Supabase redirect URLs to your production domain
5. Deploy!

## Admin Access

1. Navigate to `/admin`
2. Sign in with Google
3. Add/edit/delete movie ratings

**Tip:** In Supabase, you can restrict admin access by:
- Creating an `admins` table with allowed email addresses
- Adding a policy that checks against this table

## Project Structure

```
beersperfilm/
├── app/
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   │   └── movies/      # Movie CRUD + search
│   ├── auth/            # Auth callback
│   ├── movie/[imdbId]/  # Movie detail page
│   ├── search/          # Search page
│   ├── about/           # About page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # React components
├── lib/                 # Utilities
│   ├── omdb.ts          # OMDB API helpers
│   ├── supabase/        # Supabase clients
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # General utilities
└── public/              # Static assets
```

## Adding Movies

### Via Admin Panel
1. Go to `/admin`
2. Click "Add Movie"
3. Enter the IMDB ID (e.g., `tt1375666` for Inception)
4. Set confusion and enhancement ratings
5. Add a witty blurb
6. Save

### Via Search
1. Search for a movie on the `/search` page
2. Click an unrated movie
3. You'll be redirected to admin with the IMDB ID pre-filled

## Contributing

PRs welcome! Especially for:
- More curated movie ratings
- UI/UX improvements
- Additional features (user ratings, lists, etc.)

## License

MIT

---

**Drink responsibly. Watch irresponsibly.** 🍺

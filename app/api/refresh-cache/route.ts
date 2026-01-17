import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getMovieByImdbId } from '@/lib/omdb'

// Secret key to protect this endpoint (set in Vercel env vars)
const REFRESH_SECRET = process.env.CACHE_REFRESH_SECRET

export async function POST(request: NextRequest) {
  // Verify secret key
  const authHeader = request.headers.get('authorization')
  if (REFRESH_SECRET && authHeader !== `Bearer ${REFRESH_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient()

  // Get all movie IDs that need caching
  const { data: ratings, error: ratingsError } = await supabase
    .from('beer_ratings')
    .select('imdb_id')

  if (ratingsError) {
    return NextResponse.json({ error: ratingsError.message }, { status: 500 })
  }

  if (!ratings || ratings.length === 0) {
    return NextResponse.json({ message: 'No movies to cache', cached: 0 })
  }

  // Get existing cache to check what needs updating
  const { data: existingCache } = await supabase
    .from('movie_cache')
    .select('imdb_id, cached_at')

  const cacheMap = new Map<string, Date>()
  if (existingCache) {
    existingCache.forEach((c: { imdb_id: string; cached_at: string }) => {
      cacheMap.set(c.imdb_id, new Date(c.cached_at))
    })
  }

  // Only refresh movies not cached in the last 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const needsRefresh = ratings.filter((r: { imdb_id: string }) => {
    const cachedAt = cacheMap.get(r.imdb_id)
    return !cachedAt || cachedAt < oneDayAgo
  })

  let cached = 0
  let errors = 0

  // Process in batches to avoid rate limits
  const batchSize = 10
  for (let i = 0; i < needsRefresh.length; i += batchSize) {
    const batch = needsRefresh.slice(i, i + batchSize)

    const promises = batch.map(async (rating: { imdb_id: string }) => {
      try {
        const movie = await getMovieByImdbId(rating.imdb_id)
        if (movie && movie.Response !== 'False') {
          const { error } = await supabase
            .from('movie_cache')
            .upsert({
              imdb_id: rating.imdb_id,
              title: movie.Title,
              year: movie.Year,
              poster: movie.Poster,
              plot: movie.Plot,
              director: movie.Director,
              actors: movie.Actors,
              genre: movie.Genre,
              runtime: movie.Runtime,
              imdb_rating: movie.imdbRating,
              rated: movie.Rated,
              cached_at: new Date().toISOString(),
            })

          if (error) {
            console.error(`Cache error for ${rating.imdb_id}:`, error)
            errors++
          } else {
            cached++
          }
        } else {
          errors++
        }
      } catch (err) {
        console.error(`Fetch error for ${rating.imdb_id}:`, err)
        errors++
      }
    })

    await Promise.all(promises)

    // Small delay between batches to be nice to OMDB API
    if (i + batchSize < needsRefresh.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return NextResponse.json({
    message: 'Cache refresh complete',
    total: ratings.length,
    refreshed: needsRefresh.length,
    cached,
    errors,
    skipped: ratings.length - needsRefresh.length,
  })
}

// Also allow GET for easy testing/manual trigger
export async function GET(request: NextRequest) {
  return POST(request)
}

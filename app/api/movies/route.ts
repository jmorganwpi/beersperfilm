import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { BeerRating } from '@/lib/types'

interface MovieCache {
  imdb_id: string
  title: string | null
  year: string | null
  poster: string | null
  plot: string | null
  director: string | null
  actors: string | null
  genre: string | null
  runtime: string | null
  imdb_rating: string | null
  rated: string | null
}

export async function GET(request: NextRequest) {
  const supabase = createClient()

  // Fetch ratings and cached movie data in parallel
  const [ratingsResult, cacheResult] = await Promise.all([
    supabase
      .from('beer_ratings')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('movie_cache')
      .select('*')
  ])

  if (ratingsResult.error) {
    return NextResponse.json({ error: ratingsResult.error.message }, { status: 500 })
  }

  const ratings = ratingsResult.data
  if (!ratings || ratings.length === 0) {
    return NextResponse.json([])
  }

  // Create a map of cached movie data
  const cacheMap = new Map<string, MovieCache>()
  if (cacheResult.data) {
    cacheResult.data.forEach((movie: MovieCache) => {
      cacheMap.set(movie.imdb_id, movie)
    })
  }

  // Combine data
  const movies = ratings.map((rating: BeerRating) => {
    const cached = cacheMap.get(rating.imdb_id)
    return {
      ...rating,
      title: cached?.title || `Movie ${rating.imdb_id}`,
      year: cached?.year,
      poster: cached?.poster,
      plot: cached?.plot,
      director: cached?.director,
      actors: cached?.actors,
      genre: cached?.genre,
      runtime: cached?.runtime,
      imdbRating: cached?.imdb_rating,
      rated: cached?.rated,
    }
  })

  return NextResponse.json(movies)
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  const { imdb_id, confusion_beers, enhancement_beers, rating_blurb, tags } = body
  
  if (!imdb_id || !confusion_beers || !enhancement_beers) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  
  const { data, error } = await supabase
    .from('beer_ratings')
    .insert([{
      imdb_id,
      confusion_beers,
      enhancement_beers,
      rating_blurb: rating_blurb || '',
      tags: tags || [],
    }])
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const supabase = createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  const { id, confusion_beers, enhancement_beers, rating_blurb, tags } = body
  
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  
  const { data, error } = await supabase
    .from('beer_ratings')
    .update({
      confusion_beers,
      enhancement_beers,
      rating_blurb,
      tags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient()
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  
  const { error } = await supabase
    .from('beer_ratings')
    .delete()
    .eq('id', id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}

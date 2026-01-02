import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getMoviesByImdbIds } from '@/lib/omdb'
import { BeerRating } from '@/lib/types'

export async function GET(request: NextRequest) {
  const supabase = createClient()
  
  const { data: ratings, error } = await supabase
    .from('beer_ratings')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  if (!ratings || ratings.length === 0) {
    return NextResponse.json([])
  }
  
  // Fetch OMDB data for all movies
  const imdbIds = ratings.map((r: BeerRating) => r.imdb_id)
  const omdbData = await getMoviesByImdbIds(imdbIds)
  
  // Combine data
  const movies = ratings.map((rating: BeerRating) => {
    const omdb = omdbData.get(rating.imdb_id)
    return {
      ...rating,
      title: omdb?.Title,
      year: omdb?.Year,
      poster: omdb?.Poster,
      plot: omdb?.Plot,
      director: omdb?.Director,
      actors: omdb?.Actors,
      genre: omdb?.Genre,
      runtime: omdb?.Runtime,
      imdbRating: omdb?.imdbRating,
      rated: omdb?.Rated,
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

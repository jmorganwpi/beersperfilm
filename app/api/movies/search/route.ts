import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { searchMovies } from '@/lib/omdb'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  if (!query) {
    return NextResponse.json({ results: [], error: 'No query provided' })
  }
  
  // Search OMDB
  const omdbResults = await searchMovies(query)
  
  if (omdbResults.Response === 'False' || !omdbResults.Search) {
    return NextResponse.json({ results: [], total: 0 })
  }
  
  // Check which movies we have ratings for
  const supabase = createClient()
  const imdbIds = omdbResults.Search.map(m => m.imdbID)
  
  const { data: ratings } = await supabase
    .from('beer_ratings')
    .select('imdb_id, confusion_beers, enhancement_beers, rating_blurb')
    .in('imdb_id', imdbIds)
  
  const ratingsMap = new Map(
    (ratings || []).map(r => [r.imdb_id, r])
  )
  
  // Combine results
  const results = omdbResults.Search.map(movie => ({
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
    hasRating: ratingsMap.has(movie.imdbID),
    rating: ratingsMap.get(movie.imdbID),
  }))
  
  // Sort: rated movies first
  results.sort((a, b) => {
    if (a.hasRating && !b.hasRating) return -1
    if (!a.hasRating && b.hasRating) return 1
    return 0
  })
  
  return NextResponse.json({
    results,
    total: parseInt(omdbResults.totalResults || '0', 10),
  })
}

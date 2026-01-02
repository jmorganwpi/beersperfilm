import { OMDBMovie, OMDBSearchResponse } from './types'

const OMDB_API_KEY = process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY
const OMDB_BASE_URL = 'https://www.omdbapi.com'

export async function getMovieByImdbId(imdbId: string): Promise<OMDBMovie | null> {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    )
    
    const data: OMDBMovie = await response.json()
    
    if (data.Response === 'False') {
      console.error('OMDB Error:', data.Error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Failed to fetch movie:', error)
    return null
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<OMDBSearchResponse> {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}&type=movie`
    )
    
    const data: OMDBSearchResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to search movies:', error)
    return { Response: 'False', Error: 'Failed to search' }
  }
}

export async function getMoviesByImdbIds(imdbIds: string[]): Promise<Map<string, OMDBMovie>> {
  const results = new Map<string, OMDBMovie>()
  
  // Fetch in parallel with a reasonable batch size
  const batchSize = 10
  for (let i = 0; i < imdbIds.length; i += batchSize) {
    const batch = imdbIds.slice(i, i + batchSize)
    const promises = batch.map(id => getMovieByImdbId(id))
    const movies = await Promise.all(promises)
    
    movies.forEach((movie, index) => {
      if (movie) {
        results.set(batch[index], movie)
      }
    })
  }
  
  return results
}

// Extract IMDB rating as a number
export function parseImdbRating(rating: string | undefined): number | null {
  if (!rating || rating === 'N/A') return null
  const parsed = parseFloat(rating)
  return isNaN(parsed) ? null : parsed
}

// Format runtime to be more readable
export function formatRuntime(runtime: string | undefined): string {
  if (!runtime || runtime === 'N/A') return 'Unknown'
  return runtime
}

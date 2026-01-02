'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import MovieCard, { MovieCardSkeleton } from '@/components/MovieCard'
import { RatedMovie } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface SearchResult {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  hasRating: boolean
  rating?: {
    confusion_beers: number
    enhancement_beers: number
    rating_blurb: string
  }
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl text-cream mb-6">FIND YOUR FILM</h1>
              <div className="text-beer-gold animate-pulse">Loading...</div>
            </div>
          </div>
        </main>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [results, setResults] = useState<SearchResult[]>([])
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!query) {
      // Load all rated movies when no query
      fetchRatedMovies()
      return
    }
    
    searchMovies(query)
  }, [query])

  async function fetchRatedMovies() {
    setLoading(true)
    try {
      const res = await fetch('/api/movies')
      if (res.ok) {
        const data = await res.json()
        setRatedMovies(data)
      }
    } catch (error) {
      console.error('Failed to fetch rated movies:', error)
    } finally {
      setLoading(false)
    }
  }

  async function searchMovies(q: string) {
    setLoading(true)
    setSearched(true)
    
    try {
      const res = await fetch(`/api/movies/search?q=${encodeURIComponent(q)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.results || [])
      }
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  // Filter rated movies by search query if showing rated movies
  const filteredRated = query 
    ? ratedMovies.filter(m => 
        m.title?.toLowerCase().includes(query.toLowerCase())
      )
    : ratedMovies

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl text-cream mb-6">
              FIND YOUR FILM
            </h1>
            <SearchBar 
              placeholder="Search any movie..." 
              defaultValue={query}
              autoFocus
            />
            <p className="text-smoke mt-4 text-sm">
              Search for any movie to see if we've rated it, or discover new ones
            </p>
          </div>
          
          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          ) : query && searched ? (
            // Search results from OMDB
            <div>
              <h2 className="font-display text-2xl text-cream mb-6">
                SEARCH RESULTS
                <span className="text-smoke font-body text-base ml-3">
                  {results.length} found for "{query}"
                </span>
              </h2>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {results.map((movie) => (
                    <SearchResultCard key={movie.imdbID} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-bar-dark rounded-lg border border-smoke">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-xl text-cream mb-2">No movies found</p>
                  <p className="text-smoke">Try a different search term</p>
                </div>
              )}
            </div>
          ) : (
            // Show all rated movies
            <div>
              <h2 className="font-display text-2xl text-cream mb-6">
                ALL RATED MOVIES
                <span className="text-smoke font-body text-base ml-3">
                  {filteredRated.length} movies
                </span>
              </h2>
              
              {filteredRated.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {filteredRated.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-bar-dark rounded-lg border border-smoke">
                  <p className="text-4xl mb-4">🍺</p>
                  <p className="text-xl text-cream mb-2">No rated movies yet</p>
                  <p className="text-smoke">Search for a movie to get started</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Card for search results (may not have our rating)
function SearchResultCard({ movie }: { movie: SearchResult }) {
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : '/poster-placeholder.svg'

  return (
    <Link 
      href={movie.hasRating ? `/movie/${movie.imdbID}` : `/admin?add=${movie.imdbID}`}
      className="movie-card group block"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={posterUrl}
          alt={movie.Title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bar-black via-transparent to-transparent" />
        
        {/* Rating badge if we have it */}
        {movie.hasRating && movie.rating && (
          <div className="absolute top-3 right-3 rating-badge">
            <span className="text-lg">🍺</span>
            <span className="font-display text-xl">
              {Math.round((movie.rating.confusion_beers + movie.rating.enhancement_beers) / 2)}
            </span>
          </div>
        )}
        
        {/* "Not Rated" badge */}
        {!movie.hasRating && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-smoke/80 rounded text-xs text-cream">
            Not Rated
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-display text-xl text-cream tracking-wide truncate group-hover:text-beer-gold transition-colors">
          {movie.Title}
        </h3>
        <p className="text-sm text-smoke">{movie.Year}</p>
        
        {movie.hasRating && movie.rating ? (
          <p className="mt-2 text-sm text-smoke italic line-clamp-2">
            "{movie.rating.rating_blurb}"
          </p>
        ) : (
          <p className="mt-2 text-xs text-beer-gold">
            Click to add rating →
          </p>
        )}
      </div>
    </Link>
  )
}

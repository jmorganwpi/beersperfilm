'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import MovieCard, { MovieCardSkeleton } from '@/components/MovieCard'
import { RatedMovie, TAG_LABELS, MovieTag } from '@/lib/types'
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

type SortOption = 'recent' | 'confusion_high' | 'confusion_low' | 'enhancement_high' | 'enhancement_low' | 'alphabetical'
type CategoryFilter = 'all' | 'brain_melters' | 'party_picks' | 'sober_friendly'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'confusion_high', label: 'Most Confusing' },
  { value: 'confusion_low', label: 'Least Confusing' },
  { value: 'enhancement_high', label: 'Best for Parties' },
  { value: 'enhancement_low', label: 'Sober Viewing' },
  { value: 'alphabetical', label: 'A-Z' },
]

const CATEGORY_FILTERS: { value: CategoryFilter; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Movies', emoji: '🎬' },
  { value: 'brain_melters', label: 'Brain Melters', emoji: '🧠' },
  { value: 'party_picks', label: 'Party Picks', emoji: '🎉' },
  { value: 'sober_friendly', label: 'Sober-Friendly', emoji: '☕' },
]

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

  // Filter states
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [confusionRange, setConfusionRange] = useState<[number, number]>([1, 10])
  const [enhancementRange, setEnhancementRange] = useState<[number, number]>([1, 10])

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

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (categoryFilter !== 'all') count++
    if (selectedTags.length > 0) count++
    if (confusionRange[0] > 1 || confusionRange[1] < 10) count++
    if (enhancementRange[0] > 1 || enhancementRange[1] < 10) count++
    if (sortBy !== 'recent') count++
    return count
  }, [categoryFilter, selectedTags, confusionRange, enhancementRange, sortBy])

  // Filter and sort rated movies
  const filteredRated = useMemo(() => {
    let filtered = [...ratedMovies]

    // Text search filter
    if (query) {
      filtered = filtered.filter(m =>
        m.title?.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter === 'brain_melters') {
      filtered = filtered.filter(m => m.confusion_beers >= 8)
    } else if (categoryFilter === 'party_picks') {
      filtered = filtered.filter(m => m.enhancement_beers >= 8)
    } else if (categoryFilter === 'sober_friendly') {
      filtered = filtered.filter(m => m.confusion_beers <= 3 && m.enhancement_beers <= 4)
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(m =>
        selectedTags.some(tag => m.tags?.includes(tag))
      )
    }

    // Beer range filters
    filtered = filtered.filter(m =>
      m.confusion_beers >= confusionRange[0] &&
      m.confusion_beers <= confusionRange[1] &&
      m.enhancement_beers >= enhancementRange[0] &&
      m.enhancement_beers <= enhancementRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'confusion_high':
        filtered.sort((a, b) => b.confusion_beers - a.confusion_beers)
        break
      case 'confusion_low':
        filtered.sort((a, b) => a.confusion_beers - b.confusion_beers)
        break
      case 'enhancement_high':
        filtered.sort((a, b) => b.enhancement_beers - a.enhancement_beers)
        break
      case 'enhancement_low':
        filtered.sort((a, b) => a.enhancement_beers - b.enhancement_beers)
        break
      case 'alphabetical':
        filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        break
      // 'recent' is default order from API
    }

    return filtered
  }, [ratedMovies, query, categoryFilter, selectedTags, confusionRange, enhancementRange, sortBy])

  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function resetFilters() {
    setCategoryFilter('all')
    setSelectedTags([])
    setConfusionRange([1, 10])
    setEnhancementRange([1, 10])
    setSortBy('recent')
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
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
            // Show all rated movies with filters
            <div>
              {/* Category Quick Filters */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategoryFilter(cat.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      categoryFilter === cat.value
                        ? 'bg-beer-gold text-bar-black'
                        : 'bg-bar-dark text-cream hover:bg-bar-gray border border-smoke'
                    }`}
                  >
                    <span className="mr-2">{cat.emoji}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Filter Toggle & Sort */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    showFilters || activeFilterCount > 0
                      ? 'bg-beer-gold text-bar-black'
                      : 'bg-bar-dark text-cream hover:bg-bar-gray border border-smoke'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-bar-black text-beer-gold text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <label className="text-smoke text-sm">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-bar-dark text-cream border border-smoke rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-beer-gold"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expanded Filters Panel */}
              {showFilters && (
                <div className="bg-bar-dark rounded-xl p-6 mb-6 border border-smoke">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg text-cream">FILTERS</h3>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-smoke hover:text-beer-gold transition-colors"
                    >
                      Reset All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Confusion Range */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        🧠 Confusion Beers: {confusionRange[0]} - {confusionRange[1]}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={confusionRange[0]}
                          onChange={(e) => setConfusionRange([Math.min(parseInt(e.target.value), confusionRange[1]), confusionRange[1]])}
                          className="flex-1 accent-neon-blue"
                        />
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={confusionRange[1]}
                          onChange={(e) => setConfusionRange([confusionRange[0], Math.max(parseInt(e.target.value), confusionRange[0])])}
                          className="flex-1 accent-neon-blue"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-smoke mt-1">
                        <span>Crystal Clear</span>
                        <span>Pure Chaos</span>
                      </div>
                    </div>

                    {/* Enhancement Range */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        🎉 Enhancement Beers: {enhancementRange[0]} - {enhancementRange[1]}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={enhancementRange[0]}
                          onChange={(e) => setEnhancementRange([Math.min(parseInt(e.target.value), enhancementRange[1]), enhancementRange[1]])}
                          className="flex-1 accent-beer-gold"
                        />
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={enhancementRange[1]}
                          onChange={(e) => setEnhancementRange([enhancementRange[0], Math.max(parseInt(e.target.value), enhancementRange[0])])}
                          className="flex-1 accent-beer-gold"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-smoke mt-1">
                        <span>Stone Sober</span>
                        <span>Drunk Only</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm text-smoke mb-2">
                        Genre Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(TAG_LABELS).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => toggleTag(key)}
                            className={`px-3 py-1 rounded-full text-xs transition-colors ${
                              selectedTags.includes(key)
                                ? 'bg-beer-gold text-bar-black'
                                : 'bg-bar-gray text-smoke hover:text-cream'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-cream">
                  {categoryFilter === 'all' ? 'ALL RATED MOVIES' :
                   categoryFilter === 'brain_melters' ? 'BRAIN MELTERS' :
                   categoryFilter === 'party_picks' ? 'PARTY PICKS' : 'SOBER-FRIENDLY'}
                  <span className="text-smoke font-body text-base ml-3">
                    {filteredRated.length} movies
                  </span>
                </h2>
              </div>

              {filteredRated.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {filteredRated.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-bar-dark rounded-lg border border-smoke">
                  <p className="text-4xl mb-4">🍺</p>
                  <p className="text-xl text-cream mb-2">No movies match your filters</p>
                  <p className="text-smoke mb-4">Try adjusting your filter settings</p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-beer-gold text-bar-black rounded-lg font-medium hover:bg-beer-amber transition-colors"
                  >
                    Reset Filters
                  </button>
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

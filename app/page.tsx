import { createClient } from '@/lib/supabase/server'
import { getMoviesByImdbIds } from '@/lib/omdb'
import { RatedMovie, BeerRating } from '@/lib/types'
import Header from '@/components/Header'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'

async function getMovies(): Promise<RatedMovie[]> {
  const supabase = createClient()
  
  const { data: ratings, error } = await supabase
    .from('beer_ratings')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error || !ratings) {
    console.error('Error fetching ratings:', error)
    return []
  }
  
  // Fetch OMDB data for all movies
  const imdbIds = ratings.map((r: BeerRating) => r.imdb_id)
  const omdbData = await getMoviesByImdbIds(imdbIds)
  
  // Combine data
  return ratings.map((rating: BeerRating) => {
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
}

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const movies = await getMovies()
  
  // Group movies by rating categories
  const brainMelters = movies.filter(m => m.confusion_beers >= 8)
  const partyPicks = movies.filter(m => m.enhancement_beers >= 8)
  const soberFriendly = movies.filter(m => m.confusion_beers <= 3 && m.enhancement_beers <= 4)
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-beer-gold/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto text-center relative">
          {/* Tagline */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-beer-gold/10 border border-beer-gold/30 rounded-full text-beer-gold text-sm font-medium">
              🎬 Cinema for the chemically enhanced 🍺
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-cream tracking-wide mb-4">
            HOW MANY <span className="text-beer-gold neon-text-subtle animate-glow">BEERS</span>
            <br />
            DOES IT TAKE?
          </h1>
          
          <p className="text-xl text-smoke max-w-2xl mx-auto mb-10">
            Every movie has a drinking requirement. We measure <span className="text-neon-blue">confusion beers</span> (how many you need to follow the plot) and <span className="text-beer-gold">enhancement beers</span> (how much better it gets with a buzz).
          </p>
          
          {/* Search */}
          <div className="flex justify-center mb-8">
            <SearchBar placeholder="Search for a movie..." />
          </div>
          
          {/* Quick stats */}
          <div className="flex justify-center gap-8 text-sm text-smoke">
            <div>
              <span className="text-2xl font-display text-cream">{movies.length}</span>
              <span className="ml-2">Movies Rated</span>
            </div>
            <div>
              <span className="text-2xl font-display text-beer-gold">
                {Math.round(movies.reduce((acc, m) => acc + m.confusion_beers + m.enhancement_beers, 0) / movies.length / 2) || 0}
              </span>
              <span className="ml-2">Avg Beers</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Movie Sections */}
      <main className="max-w-7xl mx-auto px-4 pb-20 space-y-16">
        
        {/* All Movies Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-cream tracking-wide">
              ALL RATED FILMS
            </h2>
            <span className="text-smoke">{movies.length} movies</span>
          </div>
          
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie, index) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  priority={index < 10}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-bar-dark rounded-lg border border-smoke">
              <p className="text-4xl mb-4">🍺</p>
              <p className="text-xl text-cream mb-2">No movies rated yet</p>
              <p className="text-smoke">Check back soon or add some via the admin panel</p>
            </div>
          )}
        </section>
        
        {/* Category Sections */}
        {brainMelters.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🧠</span>
              <h2 className="font-display text-3xl text-neon-blue tracking-wide">
                BRAIN MELTERS
              </h2>
              <span className="text-smoke text-sm">(Confusion 8+)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {brainMelters.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
        
        {partyPicks.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🎉</span>
              <h2 className="font-display text-3xl text-beer-gold tracking-wide">
                PARTY PICKS
              </h2>
              <span className="text-smoke text-sm">(Enhancement 8+)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {partyPicks.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
        
        {soberFriendly.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">☕</span>
              <h2 className="font-display text-3xl text-cream tracking-wide">
                SOBER-FRIENDLY
              </h2>
              <span className="text-smoke text-sm">(Low confusion, low enhancement)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {soberFriendly.slice(0, 5).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-smoke py-8 text-center text-sm text-smoke">
        <p>Please drink responsibly. Movie ratings are subjective and for entertainment only.</p>
        <p className="mt-2">
          Built by <Link href="https://jonmorgan.me" className="text-beer-gold hover:underline">Jon Morgan</Link>
        </p>
      </footer>
    </div>
  )
}

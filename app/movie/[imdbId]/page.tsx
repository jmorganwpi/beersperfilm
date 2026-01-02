import { createClient } from '@/lib/supabase/server'
import { getMovieByImdbId } from '@/lib/omdb'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import BeerMeter from '@/components/BeerMeter'
import { TAG_LABELS, MovieTag, CONFUSION_LABELS, ENHANCEMENT_LABELS } from '@/lib/types'
import { getRecommendation, averageBeers } from '@/lib/utils'

interface MoviePageProps {
  params: { imdbId: string }
}

async function getMovie(imdbId: string) {
  const supabase = createClient()
  
  // Get our rating
  const { data: rating, error } = await supabase
    .from('beer_ratings')
    .select('*')
    .eq('imdb_id', imdbId)
    .single()
  
  if (error || !rating) {
    return null
  }
  
  // Get OMDB data
  const omdb = await getMovieByImdbId(imdbId)
  
  return { rating, omdb }
}

export async function generateMetadata({ params }: MoviePageProps) {
  const data = await getMovie(params.imdbId)
  
  if (!data) {
    return { title: 'Movie Not Found | Beers Per Film' }
  }
  
  const title = data.omdb?.Title || 'Unknown Movie'
  const avgBeers = averageBeers(data.rating.confusion_beers, data.rating.enhancement_beers)
  
  return {
    title: `${title} - ${avgBeers} Beers | Beers Per Film`,
    description: data.rating.rating_blurb || `${title} requires ${avgBeers} beers according to our rating system.`,
    openGraph: {
      title: `${title} | Beers Per Film`,
      description: data.rating.rating_blurb,
      images: data.omdb?.Poster && data.omdb.Poster !== 'N/A' ? [data.omdb.Poster] : [],
    },
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const data = await getMovie(params.imdbId)
  
  if (!data) {
    notFound()
  }
  
  const { rating, omdb } = data
  const posterUrl = omdb?.Poster && omdb.Poster !== 'N/A' 
    ? omdb.Poster 
    : '/poster-placeholder.svg'
  
  const avgBeers = averageBeers(rating.confusion_beers, rating.enhancement_beers)
  const recommendation = getRecommendation(rating.confusion_beers, rating.enhancement_beers)

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Background gradient based on poster */}
      <div className="fixed inset-0 bg-gradient-to-b from-bar-black via-bar-dark to-bar-black -z-10" />
      <div className="fixed inset-0 bg-gradient-radial from-beer-gold/3 via-transparent to-transparent -z-10" />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-smoke hover:text-cream transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all movies
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Poster Column */}
            <div className="md:col-span-1">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={posterUrl}
                  alt={omdb?.Title || 'Movie poster'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* IMDB Link */}
              {omdb && (
                <a
                  href={`https://www.imdb.com/title/${params.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-[#F5C518] text-black font-bold rounded hover:bg-[#E0B015] transition-colors"
                >
                  View on IMDb
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            
            {/* Info Column */}
            <div className="md:col-span-2 space-y-8">
              {/* Title & Meta */}
              <div>
                <h1 className="font-display text-5xl sm:text-6xl text-cream tracking-wide mb-2">
                  {omdb?.Title || 'Unknown Title'}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-smoke">
                  <span className="text-lg">{omdb?.Year}</span>
                  {omdb?.Runtime && omdb.Runtime !== 'N/A' && (
                    <>
                      <span>•</span>
                      <span>{omdb.Runtime}</span>
                    </>
                  )}
                  {omdb?.Rated && omdb.Rated !== 'N/A' && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-0.5 border border-smoke rounded text-sm">{omdb.Rated}</span>
                    </>
                  )}
                </div>
                
                {/* Genre tags */}
                {omdb?.Genre && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {omdb.Genre.split(', ').map((genre) => (
                      <span 
                        key={genre}
                        className="px-3 py-1 bg-bar-dark border border-smoke rounded-full text-sm text-cream"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Beer Ratings - The Main Event */}
              <div className="bg-bar-dark rounded-xl p-6 border border-smoke">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🍺</span>
                  <div>
                    <h2 className="font-display text-3xl text-beer-gold">
                      {avgBeers} BEERS RECOMMENDED
                    </h2>
                    <p className="text-smoke">{recommendation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Confusion Rating */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🧠</span>
                      <span className="font-display text-xl text-neon-blue">CONFUSION BEERS</span>
                    </div>
                    <BeerMeter 
                      value={rating.confusion_beers} 
                      type="confusion" 
                      size="lg" 
                    />
                    <p className="text-sm text-smoke">
                      {CONFUSION_LABELS[rating.confusion_beers]}
                    </p>
                  </div>
                  
                  {/* Enhancement Rating */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎉</span>
                      <span className="font-display text-xl text-beer-gold">ENHANCEMENT BEERS</span>
                    </div>
                    <BeerMeter 
                      value={rating.enhancement_beers} 
                      type="enhancement" 
                      size="lg" 
                    />
                    <p className="text-sm text-smoke">
                      {ENHANCEMENT_LABELS[rating.enhancement_beers]}
                    </p>
                  </div>
                </div>
                
                {/* Rating Blurb */}
                {rating.rating_blurb && (
                  <div className="mt-6 pt-6 border-t border-smoke">
                    <p className="text-lg text-cream italic">
                      "{rating.rating_blurb}"
                    </p>
                  </div>
                )}
                
                {/* Tags */}
                {rating.tags && rating.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {rating.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-beer-gold/10 border border-beer-gold/30 rounded-full text-sm text-beer-gold"
                      >
                        {TAG_LABELS[tag as MovieTag] || tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* IMDB Rating */}
              {omdb?.imdbRating && omdb.imdbRating !== 'N/A' && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl text-yellow-400">★</span>
                    <div>
                      <span className="text-3xl font-bold text-cream">{omdb.imdbRating}</span>
                      <span className="text-smoke">/10</span>
                    </div>
                  </div>
                  {omdb.imdbVotes && omdb.imdbVotes !== 'N/A' && (
                    <span className="text-smoke text-sm">
                      ({omdb.imdbVotes} votes)
                    </span>
                  )}
                </div>
              )}
              
              {/* Plot */}
              {omdb?.Plot && omdb.Plot !== 'N/A' && (
                <div>
                  <h3 className="font-display text-xl text-cream mb-2">PLOT</h3>
                  <p className="text-smoke leading-relaxed">{omdb.Plot}</p>
                </div>
              )}
              
              {/* Credits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {omdb?.Director && omdb.Director !== 'N/A' && (
                  <div>
                    <h3 className="font-display text-sm text-smoke mb-1">DIRECTOR</h3>
                    <p className="text-cream">{omdb.Director}</p>
                  </div>
                )}
                {omdb?.Writer && omdb.Writer !== 'N/A' && (
                  <div>
                    <h3 className="font-display text-sm text-smoke mb-1">WRITER</h3>
                    <p className="text-cream">{omdb.Writer}</p>
                  </div>
                )}
                {omdb?.Actors && omdb.Actors !== 'N/A' && (
                  <div className="sm:col-span-2">
                    <h3 className="font-display text-sm text-smoke mb-1">CAST</h3>
                    <p className="text-cream">{omdb.Actors}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

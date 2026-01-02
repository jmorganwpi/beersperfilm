'use client'

import Image from 'next/image'
import Link from 'next/link'
import { RatedMovie, TAG_LABELS, MovieTag } from '@/lib/types'
import { DualBeerMeter, BeerBadge } from './BeerMeter'

interface MovieCardProps {
  movie: RatedMovie
  priority?: boolean
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
  const posterUrl = movie.poster && movie.poster !== 'N/A' 
    ? movie.poster 
    : '/poster-placeholder.svg'

  return (
    <Link href={`/movie/${movie.imdb_id}`} className="movie-card group block">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={posterUrl}
          alt={movie.title || 'Movie poster'}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bar-black via-transparent to-transparent" />
        
        {/* Beer badge overlay */}
        <div className="absolute top-3 right-3">
          <BeerBadge confusion={movie.confusion_beers} enhancement={movie.enhancement_beers} />
        </div>
        
        {/* Tags */}
        {movie.tags && movie.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {movie.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 text-xs bg-bar-black/70 text-cream rounded"
              >
                {TAG_LABELS[tag as MovieTag] || tag}
              </span>
            ))}
          </div>
        )}
        
        {/* IMDB Rating */}
        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-sm">
            <span className="text-yellow-400">★</span>
            <span className="font-mono text-cream">{movie.imdbRating}</span>
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-xl text-cream tracking-wide truncate group-hover:text-beer-gold transition-colors">
          {movie.title || 'Unknown Title'}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-sm text-smoke">
          <span>{movie.year || 'Year Unknown'}</span>
          {movie.runtime && movie.runtime !== 'N/A' && (
            <>
              <span>•</span>
              <span>{movie.runtime}</span>
            </>
          )}
        </div>
        
        {/* Rating meters */}
        <div className="mt-3">
          <DualBeerMeter 
            confusion={movie.confusion_beers} 
            enhancement={movie.enhancement_beers} 
            size="sm"
          />
        </div>
        
        {/* Blurb preview */}
        {movie.rating_blurb && (
          <p className="mt-3 text-sm text-smoke line-clamp-2 italic">
            "{movie.rating_blurb}"
          </p>
        )}
      </div>
    </Link>
  )
}

// Skeleton loader for movie cards
export function MovieCardSkeleton() {
  return (
    <div className="movie-card animate-pulse">
      <div className="aspect-[2/3] bg-smoke/20" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-smoke/20 rounded w-3/4" />
        <div className="h-4 bg-smoke/20 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-smoke/20 rounded" />
          <div className="h-3 bg-smoke/20 rounded" />
        </div>
      </div>
    </div>
  )
}

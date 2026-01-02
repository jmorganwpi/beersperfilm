'use client'

import { CONFUSION_LABELS, ENHANCEMENT_LABELS } from '@/lib/types'

interface BeerMeterProps {
  value: number
  type: 'confusion' | 'enhancement'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  animated?: boolean
}

export default function BeerMeter({ 
  value, 
  type, 
  size = 'md', 
  showLabel = true,
  animated = true 
}: BeerMeterProps) {
  const labels = type === 'confusion' ? CONFUSION_LABELS : ENHANCEMENT_LABELS
  const label = labels[value] || ''
  const icon = type === 'confusion' ? '🧠' : '🎉'
  const color = type === 'confusion' ? 'neon-blue' : 'beer-gold'
  
  const sizeClasses = {
    sm: { container: 'gap-1', glass: 'w-3 h-4', text: 'text-xs' },
    md: { container: 'gap-1.5', glass: 'w-4 h-5', text: 'text-sm' },
    lg: { container: 'gap-2', glass: 'w-5 h-6', text: 'text-base' },
  }
  
  const classes = sizeClasses[size]

  return (
    <div className="flex flex-col gap-1">
      <div className={`flex items-center ${classes.container}`}>
        <span className={classes.text}>{icon}</span>
        <div className={`flex ${classes.container}`}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`${classes.glass} rounded-sm transition-all duration-300 ${
                i < value
                  ? type === 'confusion'
                    ? 'bg-neon-blue shadow-[0_0_8px_rgba(0,212,255,0.5)]'
                    : 'bg-beer-gold shadow-[0_0_8px_rgba(244,160,32,0.5)]'
                  : 'bg-smoke/30'
              }`}
              style={animated ? { 
                transitionDelay: `${i * 50}ms`,
              } : undefined}
            />
          ))}
        </div>
        <span className={`${classes.text} font-mono font-bold ${
          type === 'confusion' ? 'text-neon-blue' : 'text-beer-gold'
        }`}>
          {value}
        </span>
      </div>
      {showLabel && (
        <span className={`${classes.text} text-smoke`}>
          {label}
        </span>
      )}
    </div>
  )
}

// Compact version showing both ratings
interface DualBeerMeterProps {
  confusion: number
  enhancement: number
  size?: 'sm' | 'md' | 'lg'
}

export function DualBeerMeter({ confusion, enhancement, size = 'sm' }: DualBeerMeterProps) {
  return (
    <div className="flex flex-col gap-2">
      <BeerMeter value={confusion} type="confusion" size={size} showLabel={false} />
      <BeerMeter value={enhancement} type="enhancement" size={size} showLabel={false} />
    </div>
  )
}

// Simple badge showing total beers
interface BeerBadgeProps {
  confusion: number
  enhancement: number
  showBreakdown?: boolean
}

export function BeerBadge({ confusion, enhancement, showBreakdown = false }: BeerBadgeProps) {
  const total = Math.round((confusion + enhancement) / 2)
  
  return (
    <div className="rating-badge">
      <span className="text-lg">🍺</span>
      <span className="font-display text-xl">{total}</span>
      {showBreakdown && (
        <span className="text-xs text-smoke ml-1">
          (🧠{confusion} 🎉{enhancement})
        </span>
      )}
    </div>
  )
}

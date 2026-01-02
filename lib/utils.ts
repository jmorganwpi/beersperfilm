// Debounce function for search
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Format large numbers with commas
export function formatNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseInt(num.replace(/,/g, ''), 10) : num
  return n.toLocaleString()
}

// Clamp a number between min and max
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

// Calculate average beer rating
export function averageBeers(confusion: number, enhancement: number): number {
  return Math.round((confusion + enhancement) / 2)
}

// Get recommendation text based on ratings
export function getRecommendation(confusion: number, enhancement: number): string {
  const total = confusion + enhancement
  
  if (total <= 4) {
    return "Perfect for sober viewing"
  } else if (total <= 8) {
    return "Light buzz optional"
  } else if (total <= 12) {
    return "A few beers recommended"
  } else if (total <= 16) {
    return "Drinking highly encouraged"
  } else {
    return "Mandatory intoxication"
  }
}

// Slugify a string
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Check if we're on the server
export const isServer = typeof window === 'undefined'

// Truncate text with ellipsis
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

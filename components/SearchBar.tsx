'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  defaultValue?: string
  autoFocus?: boolean
}

export default function SearchBar({ 
  placeholder = 'Search movies...', 
  defaultValue = '',
  autoFocus = false 
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(defaultValue || searchParams.get('q') || '')

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        router.push(`/search?q=${encodeURIComponent(value.trim())}`)
      }
    }, 300),
    [router]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full px-6 py-4 pl-14 bg-bar-dark border-2 border-smoke rounded-full text-cream text-lg placeholder-smoke/50 transition-all focus:border-beer-gold focus:bg-bar-gray focus:outline-none"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-smoke">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              router.push('/search')
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-smoke hover:text-cream transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}

// Compact search for header
export function CompactSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
        className={`px-4 py-2 bg-bar-dark border border-smoke rounded-full text-sm text-cream placeholder-smoke/50 transition-all ${
          isFocused ? 'w-48 border-beer-gold' : 'w-32'
        }`}
      />
    </form>
  )
}

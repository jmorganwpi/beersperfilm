'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bar-black/80 backdrop-blur-md border-b border-smoke">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="text-4xl">🍺</span>
              <span className="absolute -top-1 -right-1 text-xs">🎬</span>
            </div>
            <div>
              <h1 className="font-display text-2xl text-beer-gold tracking-wide group-hover:text-beer-amber transition-colors">
                BEERS PER FILM
              </h1>
              <p className="text-xs text-smoke -mt-1 tracking-widest uppercase">
                Cinema for the buzzed
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-beer-gold' 
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              Browse
            </Link>
            <Link 
              href="/search"
              className={`text-sm font-medium transition-colors ${
                pathname === '/search' 
                  ? 'text-beer-gold' 
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              Search
            </Link>
            <Link 
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === '/about' 
                  ? 'text-beer-gold' 
                  : 'text-cream/70 hover:text-cream'
              }`}
            >
              About
            </Link>
            
            {/* Admin link - subtle */}
            <Link 
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                isAdmin 
                  ? 'text-neon-red' 
                  : 'text-smoke hover:text-cream/50'
              }`}
            >
              {isAdmin ? '⚡ Admin' : '•••'}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

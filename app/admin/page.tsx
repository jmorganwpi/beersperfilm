'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Header from '@/components/Header'
import { RatedMovie, TAG_LABELS, MovieTag } from '@/lib/types'
import Image from 'next/image'

export default function AdminPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const addImdbId = searchParams.get('add')
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<RatedMovie[]>([])
  const [editingMovie, setEditingMovie] = useState<RatedMovie | null>(null)
  const [showAddForm, setShowAddForm] = useState(!!addImdbId)
  
  // Form state
  const [formData, setFormData] = useState({
    imdb_id: addImdbId || '',
    confusion_beers: 5,
    enhancement_beers: 5,
    rating_blurb: '',
    tags: [] as string[],
  })
  const [moviePreview, setMoviePreview] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
    fetchMovies()
  }, [])

  useEffect(() => {
    if (addImdbId) {
      setFormData(prev => ({ ...prev, imdb_id: addImdbId }))
      fetchMoviePreview(addImdbId)
      setShowAddForm(true)
    }
  }, [addImdbId])

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  async function fetchMovies() {
    try {
      const res = await fetch('/api/movies')
      if (res.ok) {
        const data = await res.json()
        setMovies(data)
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    }
  }

  async function fetchMoviePreview(imdbId: string) {
    if (!imdbId) {
      setMoviePreview(null)
      return
    }
    
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${imdbId}`)
      const data = await res.json()
      if (data.Response === 'True') {
        setMoviePreview(data)
      } else {
        setMoviePreview(null)
      }
    } catch (error) {
      setMoviePreview(null)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    
    try {
      const method = editingMovie ? 'PUT' : 'POST'
      const body = editingMovie 
        ? { id: editingMovie.id, ...formData }
        : formData
      
      const res = await fetch('/api/movies', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }
      
      // Reset form and refresh
      setFormData({
        imdb_id: '',
        confusion_beers: 5,
        enhancement_beers: 5,
        rating_blurb: '',
        tags: [],
      })
      setEditingMovie(null)
      setShowAddForm(false)
      setMoviePreview(null)
      fetchMovies()
      router.push('/admin')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this rating?')) return
    
    try {
      const res = await fetch(`/api/movies?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchMovies()
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  function handleEdit(movie: RatedMovie) {
    setEditingMovie(movie)
    setFormData({
      imdb_id: movie.imdb_id,
      confusion_beers: movie.confusion_beers,
      enhancement_beers: movie.enhancement_beers,
      rating_blurb: movie.rating_blurb,
      tags: movie.tags || [],
    })
    setMoviePreview({
      Title: movie.title,
      Year: movie.year,
      Poster: movie.poster,
    })
    setShowAddForm(true)
  }

  function toggleTag(tag: string) {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-beer-gold animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-20 px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="font-display text-4xl text-cream mb-6">ADMIN LOGIN</h1>
            <p className="text-smoke mb-8">
              Sign in to manage movie ratings
            </p>
            <button
              onClick={signInWithGoogle}
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            {error && (
              <p className="mt-4 text-red-500 text-sm">{error}</p>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Admin Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl text-cream">ADMIN DASHBOARD</h1>
              <p className="text-smoke mt-1">
                Logged in as {user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setShowAddForm(true)
                  setEditingMovie(null)
                  setFormData({
                    imdb_id: '',
                    confusion_beers: 5,
                    enhancement_beers: 5,
                    rating_blurb: '',
                    tags: [],
                  })
                  setMoviePreview(null)
                }}
                className="admin-button"
              >
                + Add Movie
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2 text-smoke hover:text-cream transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-8 bg-bar-dark rounded-xl p-6 border border-smoke">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl text-cream">
                  {editingMovie ? 'EDIT RATING' : 'ADD NEW RATING'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingMovie(null)
                    router.push('/admin')
                  }}
                  className="text-smoke hover:text-cream"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Form */}
                  <div className="space-y-4">
                    {/* IMDB ID */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        IMDB ID (e.g., tt1375666)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.imdb_id}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, imdb_id: e.target.value }))
                          }}
                          onBlur={() => fetchMoviePreview(formData.imdb_id)}
                          placeholder="tt1234567"
                          className="admin-input"
                          disabled={!!editingMovie}
                        />
                        <button
                          type="button"
                          onClick={() => fetchMoviePreview(formData.imdb_id)}
                          className="px-4 py-2 bg-smoke text-cream rounded-lg hover:bg-bar-gray transition-colors"
                        >
                          Lookup
                        </button>
                      </div>
                    </div>
                    
                    {/* Confusion Beers */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        🧠 Confusion Beers: {formData.confusion_beers}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.confusion_beers}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          confusion_beers: parseInt(e.target.value) 
                        }))}
                        className="w-full accent-neon-blue"
                      />
                      <div className="flex justify-between text-xs text-smoke mt-1">
                        <span>Crystal Clear</span>
                        <span>Pure Chaos</span>
                      </div>
                    </div>
                    
                    {/* Enhancement Beers */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        🎉 Enhancement Beers: {formData.enhancement_beers}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.enhancement_beers}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          enhancement_beers: parseInt(e.target.value) 
                        }))}
                        className="w-full accent-beer-gold"
                      />
                      <div className="flex justify-between text-xs text-smoke mt-1">
                        <span>Stone Sober</span>
                        <span>Drunk Only</span>
                      </div>
                    </div>
                    
                    {/* Rating Blurb */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        Rating Blurb (one-liner explaining the rating)
                      </label>
                      <textarea
                        value={formData.rating_blurb}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          rating_blurb: e.target.value 
                        }))}
                        placeholder="Dreams within dreams. You'll need help."
                        rows={3}
                        className="admin-input resize-none"
                      />
                    </div>
                    
                    {/* Tags */}
                    <div>
                      <label className="block text-sm text-smoke mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(TAG_LABELS).map(([key, label]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => toggleTag(key)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
                              formData.tags.includes(key)
                                ? 'bg-beer-gold text-bar-black'
                                : 'bg-smoke/20 text-smoke hover:bg-smoke/40'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Preview */}
                  <div className="bg-bar-gray rounded-lg p-4">
                    <h3 className="text-sm text-smoke mb-4">MOVIE PREVIEW</h3>
                    {moviePreview ? (
                      <div className="flex gap-4">
                        <div className="relative w-24 h-36 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={moviePreview.Poster !== 'N/A' ? moviePreview.Poster : '/poster-placeholder.svg'}
                            alt={moviePreview.Title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-display text-xl text-cream">
                            {moviePreview.Title}
                          </h4>
                          <p className="text-smoke">{moviePreview.Year}</p>
                          {moviePreview.Director && (
                            <p className="text-sm text-smoke mt-2">
                              Dir: {moviePreview.Director}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-smoke">
                        Enter an IMDB ID to preview
                      </div>
                    )}
                  </div>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={saving || !moviePreview}
                    className="admin-button"
                  >
                    {saving ? 'Saving...' : (editingMovie ? 'Update Rating' : 'Add Rating')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingMovie(null)
                      router.push('/admin')
                    }}
                    className="px-6 py-3 text-smoke hover:text-cream transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Movie List */}
          <div>
            <h2 className="font-display text-2xl text-cream mb-4">
              ALL RATINGS ({movies.length})
            </h2>
            
            {movies.length > 0 ? (
              <div className="space-y-4">
                {movies.map((movie) => (
                  <div 
                    key={movie.id}
                    className="flex items-center gap-4 bg-bar-dark rounded-lg p-4 border border-smoke hover:border-beer-gold/30 transition-colors"
                  >
                    <div className="relative w-16 h-24 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={movie.poster && movie.poster !== 'N/A' ? movie.poster : '/poster-placeholder.svg'}
                        alt={movie.title || 'Movie'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h3 className="font-display text-xl text-cream truncate">
                        {movie.title || movie.imdb_id}
                      </h3>
                      <p className="text-sm text-smoke">{movie.year}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-neon-blue">🧠 {movie.confusion_beers}</span>
                        <span className="text-beer-gold">🎉 {movie.enhancement_beers}</span>
                      </div>
                      {movie.rating_blurb && (
                        <p className="text-sm text-smoke mt-1 italic truncate">
                          "{movie.rating_blurb}"
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(movie)}
                        className="px-3 py-1 text-sm bg-smoke/20 text-cream rounded hover:bg-smoke/40 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="px-3 py-1 text-sm bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-bar-dark rounded-lg border border-smoke">
                <p className="text-smoke">No movies rated yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

-- Add movie cache table to store OMDB data
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS movie_cache (
  imdb_id TEXT PRIMARY KEY,
  title TEXT,
  year TEXT,
  poster TEXT,
  plot TEXT,
  director TEXT,
  actors TEXT,
  genre TEXT,
  runtime TEXT,
  imdb_rating TEXT,
  rated TEXT,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE movie_cache ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Movie cache is publicly readable" ON movie_cache
  FOR SELECT USING (true);

-- Allow authenticated users to update cache
CREATE POLICY "Authenticated users can update cache" ON movie_cache
  FOR ALL USING (auth.role() = 'authenticated');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_movie_cache_cached_at ON movie_cache(cached_at);

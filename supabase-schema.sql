-- Beers Per Film Database Schema
-- Run this in your Supabase SQL Editor

-- Beer Ratings Table
CREATE TABLE IF NOT EXISTS beer_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  imdb_id VARCHAR(20) UNIQUE NOT NULL,
  confusion_beers INTEGER NOT NULL CHECK (confusion_beers >= 1 AND confusion_beers <= 10),
  enhancement_beers INTEGER NOT NULL CHECK (enhancement_beers >= 1 AND enhancement_beers <= 10),
  rating_blurb TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_beer_ratings_imdb_id ON beer_ratings(imdb_id);
CREATE INDEX IF NOT EXISTS idx_beer_ratings_confusion ON beer_ratings(confusion_beers);
CREATE INDEX IF NOT EXISTS idx_beer_ratings_enhancement ON beer_ratings(enhancement_beers);

-- Enable Row Level Security
ALTER TABLE beer_ratings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read ratings
CREATE POLICY "Anyone can read ratings" ON beer_ratings
  FOR SELECT USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert" ON beer_ratings
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update" ON beer_ratings
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete" ON beer_ratings
  FOR DELETE TO authenticated
  USING (true);

-- Seed data with the curated list
INSERT INTO beer_ratings (imdb_id, confusion_beers, enhancement_beers, rating_blurb, tags) VALUES
  ('tt1375666', 10, 6, 'Dreams within dreams within dreams. You''ll need help.', ARRAY['blockbuster', 'sci_fi']),
  ('tt0390384', 10, 4, 'Engineers made a time travel movie for engineers. Sober you has no chance.', ARRAY['cult_classic', 'sci_fi']),
  ('tt0166924', 10, 7, 'Lynch wants you confused. Embrace it.', ARRAY['cult_classic', 'drama']),
  ('tt6723592', 10, 5, 'Time moves backwards and so will your comprehension.', ARRAY['blockbuster', 'sci_fi']),
  ('tt0368226', 2, 10, 'Oh hi Mark. This is why beer exists.', ARRAY['cult_classic', 'drama']),
  ('tt0106611', 1, 4, 'Feel the rhythm, feel the rhyme. Easy watch, light buzz.', ARRAY['comedy']),
  ('tt2911666', 1, 6, 'Plot is simple. Headshots are satisfying. Drink and enjoy.', ARRAY['action']),
  ('tt0816692', 8, 5, 'Love transcends dimensions, apparently. You''ll need help with the physics.', ARRAY['blockbuster', 'sci_fi']),
  ('tt0118715', 4, 10, 'The Dude abides, and so should your White Russians.', ARRAY['cult_classic', 'comedy']),
  ('tt0120669', 6, 10, 'Being sober while watching this feels wrong.', ARRAY['cult_classic', 'drama']),
  ('tt0246578', 9, 6, 'Time loops and bunny suits. Beer helps.', ARRAY['cult_classic', 'sci_fi']),
  ('tt0062622', 8, 7, 'The last 20 minutes require substances. Kubrick knew.', ARRAY['cult_classic', 'sci_fi']),
  ('tt2724064', 1, 10, 'The only way to watch this is impaired.', ARRAY['cult_classic', 'action', 'comedy']),
  ('tt0209144', 9, 4, 'Backwards narrative. Take notes or drink, not both.', ARRAY['cult_classic', 'drama']),
  ('tt0133093', 5, 6, 'Red pill, blue pill, or beer?', ARRAY['blockbuster', 'sci_fi', 'action']),
  ('tt0383028', 10, 5, 'Kaufman''s fever dream about mortality. Good luck.', ARRAY['cult_classic', 'drama']),
  ('tt0080487', 1, 9, 'Bill Murray and a gopher. Perfect beer movie.', ARRAY['cult_classic', 'comedy']),
  ('tt0093773', 1, 8, 'GET TO THE CHOPPAH. Biceps and beers.', ARRAY['action', 'cult_classic']),
  ('tt1480055', 9, 5, 'Jake Gyllenhaal times two. That ending will haunt you.', ARRAY['drama']),
  ('tt0838283', 1, 9, 'Did we just become best friends? YEP.', ARRAY['comedy']),
  ('tt2543164', 7, 3, 'Linguistics and time perception. Thoughtful watch.', ARRAY['sci_fi', 'drama']),
  ('tt0119396', 2, 9, 'Nic Cage with a mullet saving America. Peak cinema.', ARRAY['action', 'cult_classic']),
  ('tt0082085', 10, 6, 'Lynch''s debut. Industrial nightmare fuel.', ARRAY['cult_classic', 'horror']),
  ('tt0102685', 2, 8, 'Keanu surfs and robs banks. Vaya con dios, bro.', ARRAY['action', 'cult_classic']),
  ('tt1371111', 9, 5, 'Six timelines, same actors, face prosthetics. Ambitious mess.', ARRAY['sci_fi', 'drama']),
  ('tt0097647', 1, 10, 'Swayze rips a throat out. Essential beer viewing.', ARRAY['action', 'cult_classic']),
  ('tt2798920', 8, 5, 'Shimmer makes things weird. So will beer five.', ARRAY['sci_fi', 'horror']),
  ('tt0247745', 1, 10, 'Meow. That''s the whole review.', ARRAY['comedy', 'cult_classic']),
  ('tt2084989', 10, 4, 'Same director as Primer. Even more inscrutable.', ARRAY['sci_fi', 'cult_classic']),
  ('tt0092099', 1, 8, 'Homoerotic volleyball and fighter jets. Drink up, Maverick.', ARRAY['action', 'cult_classic']),
  ('tt1441395', 8, 5, 'Scarlett Johansson as alien predator. Slow, hypnotic, baffling.', ARRAY['sci_fi', 'horror']),
  ('tt0100814', 1, 9, 'Kevin Bacon vs giant worms. Perfect creature feature.', ARRAY['horror', 'comedy', 'cult_classic']),
  ('tt5109784', 7, 4, 'Biblical allegory as home invasion horror. Aronofsky gonna Aronofsky.', ARRAY['horror', 'drama']),
  ('tt0120201', 2, 9, 'Fascist propaganda played for satire. Would you like to know more?', ARRAY['sci_fi', 'action', 'cult_classic']),
  ('tt2866360', 9, 6, 'Dinner party + comet = parallel universe chaos.', ARRAY['sci_fi', 'cult_classic']),
  ('tt0119094', 3, 10, 'Travolta and Cage swap faces. Peak 90s insanity.', ARRAY['action', 'cult_classic']),
  ('tt0470752', 5, 4, 'AI ethics and disco dancing. Clean viewing.', ARRAY['sci_fi', 'drama']),
  ('tt3472226', 3, 10, '30 minutes of pure 80s absurdism. Mandatory beer.', ARRAY['action', 'comedy', 'cult_classic']),
  ('tt0482571', 7, 5, 'Magic tricks and Tesla. Rewatch sober to catch clues.', ARRAY['drama']),
  ('tt0088944', 1, 9, 'Schwarzenegger kills an army. One-liners flow like beer.', ARRAY['action', 'cult_classic']),
  ('tt0485947', 10, 5, 'Every possible life choice visualized. Brain melter.', ARRAY['sci_fi', 'drama']),
  ('tt1663662', 2, 8, 'Giant robots punch giant monsters. Beers enhance.', ARRAY['action', 'sci_fi']),
  ('tt0099871', 8, 5, 'Vietnam vet''s nightmare reality. Disturbing but good.', ARRAY['horror', 'drama']),
  ('tt0415306', 1, 9, 'Shake and bake, baby. Will Ferrell peak.', ARRAY['comedy']),
  ('tt8772262', 6, 4, 'Swedish folk horror in broad daylight. Unsettling sober.', ARRAY['horror']),
  ('tt0096256', 3, 8, 'Rowdy Roddy Piper chews bubblegum and kicks ass.', ARRAY['sci_fi', 'action', 'cult_classic']),
  ('tt0338013', 7, 5, 'Memory erasure romance. Emotionally complex.', ARRAY['drama', 'sci_fi']),
  ('tt0985694', 1, 9, 'Danny Trejo uses intestines as a rope. Beer required.', ARRAY['action', 'cult_classic']),
  ('tt0364569', 6, 4, 'Korean revenge masterpiece. That twist, though.', ARRAY['foreign', 'drama', 'action'])
ON CONFLICT (imdb_id) DO NOTHING;

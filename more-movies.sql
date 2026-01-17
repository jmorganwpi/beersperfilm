-- Additional 100 movies
-- Run this in your Supabase SQL Editor

INSERT INTO beer_ratings (imdb_id, confusion_beers, enhancement_beers, rating_blurb, tags) VALUES
  -- 90s Classics
  ('tt0114709', 3, 8, 'Toy Story. Pixar magic for all ages. Fun with drinks.', ARRAY['animated', 'comedy']),
  ('tt0119217', 3, 5, 'Good Will Hunting. How do you like them apples?', ARRAY['drama']),
  ('tt0118799', 2, 4, 'Life is Beautiful. Italian heartbreaker. Have tissues ready.', ARRAY['foreign', 'drama', 'comedy']),
  ('tt0120382', 3, 6, 'The Truman Show. Reality bends. Carrey''s best dramatic turn.', ARRAY['drama', 'comedy']),
  ('tt0117951', 3, 7, 'Trainspotting. Choose life. Scottish chaos.', ARRAY['drama', 'cult_classic']),
  ('tt0119698', 4, 5, 'Princess Mononoke. Miyazaki epic. Nature vs industry.', ARRAY['animated', 'foreign', 'action']),
  ('tt0120735', 4, 6, 'Lock, Stock and Two Smoking Barrels. British crime caper.', ARRAY['action', 'comedy', 'cult_classic']),
  ('tt0102926', 3, 4, 'Silence of the Lambs. Fava beans and a nice chianti.', ARRAY['horror', 'drama']),
  ('tt0105236', 2, 7, 'Reservoir Dogs. Tarantino debut. Stuck in the middle with beers.', ARRAY['action', 'cult_classic']),
  ('tt0110413', 3, 6, 'Leon The Professional. Hitman with heart.', ARRAY['action', 'drama']),

  -- 2000s Hits
  ('tt0209144', 3, 7, 'Memento. Nolan''s mind-bender. Watch it twice.', ARRAY['drama', 'cult_classic']),
  ('tt0181689', 3, 5, 'Minority Report. Spielberg sci-fi. Pre-crime thriller.', ARRAY['sci_fi', 'action']),
  ('tt0264464', 3, 8, 'Catch Me If You Can. DiCaprio charms his way through.', ARRAY['drama', 'comedy']),
  ('tt0266697', 3, 7, 'Kill Bill Vol. 1. Tarantino revenge. Stylish violence.', ARRAY['action', 'cult_classic']),
  ('tt0378194', 3, 7, 'Kill Bill Vol. 2. The Bride concludes her list.', ARRAY['action', 'cult_classic']),
  ('tt0361748', 4, 6, 'Inglourious Basterds. Nazi-hunting fun. Tarantino history.', ARRAY['action', 'drama']),
  ('tt0407887', 5, 5, 'The Departed. Who''s the rat? Scorsese Boston crime.', ARRAY['drama', 'action']),
  ('tt0482571', 7, 5, 'The Prestige. Dueling magicians. Pay attention.', ARRAY['drama', 'sci_fi']),
  ('tt0477348', 5, 6, 'No Country for Old Men. Coen Brothers darkness. Call it.', ARRAY['drama', 'action']),
  ('tt0405159', 4, 7, 'Million Dollar Baby. Eastwood boxing drama. Emotional gut punch.', ARRAY['drama']),

  -- 2010s Masterpieces
  ('tt1375666', 8, 6, 'Inception. Dreams within dreams. Take notes.', ARRAY['sci_fi', 'action', 'blockbuster']),
  ('tt0816692', 6, 5, 'Interstellar. McConaughey in space. Time is relative.', ARRAY['sci_fi', 'drama', 'blockbuster']),
  ('tt1856101', 4, 6, 'Blade Runner 2049. Stunning visuals. Slow burn sequel.', ARRAY['sci_fi', 'cult_classic']),
  ('tt2582802', 5, 6, 'Whiplash. Not quite my tempo. Intense drumming drama.', ARRAY['drama']),
  ('tt2267998', 5, 5, 'Gone Girl. Marriage is complicated. Fincher thriller.', ARRAY['drama', 'horror']),
  ('tt1392190', 3, 6, 'Mad Max Fury Road. Witness me! Practical effects glory.', ARRAY['action', 'blockbuster']),
  ('tt2015381', 3, 8, 'Guardians of the Galaxy. Marvel''s wild card. Fun party pick.', ARRAY['action', 'comedy', 'blockbuster']),
  ('tt1895587', 4, 7, 'Spotlight. Journalism matters. True story impact.', ARRAY['drama']),
  ('tt3170832', 3, 4, 'Room. Escape and aftermath. Emotionally heavy.', ARRAY['drama']),
  ('tt2562232', 5, 6, 'Birdman. One-take illusion. Keaton comeback.', ARRAY['drama', 'comedy']),

  -- Horror Gems
  ('tt1457767', 4, 7, 'The Conjuring. Classic haunted house scares.', ARRAY['horror']),
  ('tt5052448', 5, 6, 'Get Out. Social horror. Peele''s debut masterpiece.', ARRAY['horror', 'drama']),
  ('tt1591095', 4, 6, 'Insidious. Astral projection terror. Jump scares aplenty.', ARRAY['horror']),
  ('tt1179933', 4, 7, 'It Follows. STD horror metaphor. Creepy atmosphere.', ARRAY['horror', 'cult_classic']),
  ('tt3235888', 3, 5, 'Annihilation. Sci-fi body horror. Natalie Portman explores.', ARRAY['horror', 'sci_fi']),
  ('tt1291584', 5, 5, 'Warrior. MMA family drama. Tom Hardy smashes.', ARRAY['drama', 'action']),
  ('tt2024544', 6, 5, 'Prisoners. Jackman searches. Villeneuve tension.', ARRAY['drama', 'horror']),
  ('tt1392214', 5, 6, 'Hereditary. Family trauma horror. Toni Collette terrifies.', ARRAY['horror']),
  ('tt7784604', 5, 5, 'Midsommar. Swedish cult daylight horror. Disturbing beauty.', ARRAY['horror', 'cult_classic']),
  ('tt1843866', 4, 7, 'Captain America: Winter Soldier. Marvel''s best. Political thriller.', ARRAY['action', 'blockbuster']),

  -- Comedy Classics
  ('tt0118715', 4, 9, 'The Big Lebowski. The Dude abides. White Russians required.', ARRAY['comedy', 'cult_classic']),
  ('tt0119116', 2, 8, 'The Full Monty. British strippers. Feel-good classic.', ARRAY['comedy', 'drama']),
  ('tt0151804', 3, 9, 'Office Space. Mondays am I right? Corporate satire.', ARRAY['comedy', 'cult_classic']),
  ('tt0240772', 3, 8, 'Ocean''s Eleven. Heist coolness. Clooney assembles.', ARRAY['action', 'comedy']),
  ('tt0315327', 3, 9, 'Bruce Almighty. Carrey plays god. Silly fun.', ARRAY['comedy']),
  ('tt0365748', 2, 9, 'Shaun of the Dead. Zombie comedy perfection. Go to the pub.', ARRAY['comedy', 'horror', 'cult_classic']),
  ('tt0425112', 2, 9, 'Hot Fuzz. Action movie parody. Edgar Wright genius.', ARRAY['comedy', 'action', 'cult_classic']),
  ('tt1232829', 2, 10, 'The World''s End. Pub crawl apocalypse. Fitting finale.', ARRAY['comedy', 'sci_fi', 'cult_classic']),
  ('tt0838283', 2, 9, 'Superbad. McLovin era. Teen comedy gold.', ARRAY['comedy']),
  ('tt1013752', 3, 9, 'The Hangover. Vegas blackout. Comedy phenomenon.', ARRAY['comedy']),

  -- Action Packed
  ('tt0190332', 3, 7, 'Crouching Tiger Hidden Dragon. Martial arts poetry.', ARRAY['action', 'foreign', 'drama']),
  ('tt0234215', 4, 8, 'The Bourne Identity. Damon forgets. Action reborn.', ARRAY['action']),
  ('tt1205489', 3, 8, 'Gran Torino. Eastwood''s lawn. Get off it.', ARRAY['drama']),
  ('tt0993846', 4, 8, 'Wolf of Wall Street. DiCaprio excess. Quaaludes and chaos.', ARRAY['drama', 'comedy']),
  ('tt2380307', 4, 7, 'Coco. Pixar makes you cry. Gorgeous animation.', ARRAY['animated', 'drama']),
  ('tt0382932', 3, 8, 'Ratatouille. Anyone can cook. Pixar Paris.', ARRAY['animated', 'comedy']),
  ('tt0910970', 3, 6, 'WALL-E. Robot love story. Environmental message.', ARRAY['animated', 'sci_fi']),
  ('tt1049413', 4, 7, 'Up. First 10 minutes destroy you. Adventure follows.', ARRAY['animated', 'comedy']),
  ('tt2096673', 4, 6, 'Inside Out. Emotions personified. Pixar brilliance.', ARRAY['animated', 'comedy']),
  ('tt0435761', 3, 7, 'Toy Story 3. The toys are back. Incinerator scene tension.', ARRAY['animated', 'comedy']),

  -- International Cinema
  ('tt0338013', 5, 4, 'Eternal Sunshine. Erase memories. Gondry romance.', ARRAY['drama', 'sci_fi', 'cult_classic']),
  ('tt0364569', 5, 5, 'Oldboy. Korean revenge. Twist ending destroys.', ARRAY['action', 'foreign', 'cult_classic']),
  ('tt0469494', 4, 6, 'There Will Be Blood. I drink your milkshake. DDL dominates.', ARRAY['drama']),
  ('tt0986264', 4, 5, 'Like Stars on Earth. Dyslexia drama. Bollywood heart.', ARRAY['foreign', 'drama']),
  ('tt1187043', 4, 5, '3 Idiots. Bollywood comedy. All is well.', ARRAY['foreign', 'comedy', 'drama']),
  ('tt0347149', 3, 6, 'Howl''s Moving Castle. Miyazaki magic. War commentary.', ARRAY['animated', 'foreign']),
  ('tt1305806', 5, 5, 'The Secret in Their Eyes. Argentine mystery. Oscar winner.', ARRAY['foreign', 'drama']),
  ('tt1832382', 5, 5, 'A Separation. Iranian family drama. Morally complex.', ARRAY['foreign', 'drama']),
  ('tt3011894', 6, 5, 'Wild Tales. Argentine anthology. Revenge stories.', ARRAY['foreign', 'comedy', 'drama']),
  ('tt2119532', 5, 5, 'Hacksaw Ridge. Medic hero. Gibson directs violence.', ARRAY['drama', 'action']),

  -- Sci-Fi & Fantasy
  ('tt0816711', 4, 7, 'Hot Tub Time Machine. Stupid fun. 80s nostalgia.', ARRAY['comedy', 'sci_fi']),
  ('tt0499549', 3, 7, 'Avatar. Blue aliens. Cameron''s visual feast.', ARRAY['sci_fi', 'blockbuster', 'action']),
  ('tt1375670', 4, 6, 'Looper. Time travel assassins. JGL becomes Willis.', ARRAY['sci_fi', 'action']),
  ('tt1446714', 3, 6, 'Prometheus. Alien prequel. Questions remain.', ARRAY['sci_fi', 'horror']),
  ('tt1631867', 4, 7, 'Edge of Tomorrow. Live die repeat. Cruise and Blunt.', ARRAY['sci_fi', 'action']),
  ('tt3659388', 5, 5, 'The Martian. Science the sh*t out of it. Damon stranded.', ARRAY['sci_fi', 'drama']),
  ('tt3748528', 7, 5, 'Arrival. Linguistics saves world. Villeneuve sci-fi.', ARRAY['sci_fi', 'drama']),
  ('tt1677720', 3, 7, 'Ready Player One. Spielberg nostalgia. Easter egg hunt.', ARRAY['sci_fi', 'action', 'blockbuster']),
  ('tt4154916', 4, 6, 'Spider-Man Into the Spider-Verse. Animation revolution.', ARRAY['animated', 'action', 'blockbuster']),
  ('tt6751668', 5, 6, 'Parasite. Class warfare. Bong Joon-ho masterpiece.', ARRAY['foreign', 'drama', 'horror']),

  -- Thrillers & Mystery
  ('tt0097576', 3, 6, 'Indiana Jones Last Crusade. Indy and dad. Connery charm.', ARRAY['action', 'blockbuster']),
  ('tt0375679', 4, 5, 'Crash. Intersecting LA stories. Controversial winner.', ARRAY['drama']),
  ('tt0758758', 5, 6, 'Into the Wild. McCandless journey. Nature calls.', ARRAY['drama']),
  ('tt0432283', 4, 7, 'Fantastic Mr. Fox. Wes Anderson animation. Cussing foxes.', ARRAY['animated', 'comedy', 'cult_classic']),
  ('tt1663202', 4, 6, 'The Revenant. Leo suffers. Finally gets Oscar.', ARRAY['drama', 'action']),
  ('tt0460791', 4, 5, 'The History of Violence. Cronenberg thriller. Mortensen hides.', ARRAY['drama', 'action']),
  ('tt0862846', 4, 6, 'Tropic Thunder. Hollywood satire. RDJ controversy.', ARRAY['comedy', 'action']),
  ('tt0770828', 3, 5, 'Man of Steel. Superman rebooted. Snyder destruction.', ARRAY['action', 'blockbuster']),
  ('tt0443706', 4, 6, 'Zodiac. Fincher investigation. Obsession consumes.', ARRAY['drama', 'horror']),
  ('tt0457430', 4, 8, 'Pan''s Labyrinth. Del Toro fantasy. Spanish Civil War.', ARRAY['foreign', 'horror', 'drama']),

  -- Modern Gems
  ('tt1790809', 3, 6, 'Moonlight. Three chapters. Oscar mix-up winner.', ARRAY['drama']),
  ('tt5013056', 5, 5, 'Dunkirk. Nolan war epic. Three timelines.', ARRAY['drama', 'action']),
  ('tt4633694', 3, 6, 'Spider-Man: Homecoming. Holland debuts. MCU Spidey.', ARRAY['action', 'comedy', 'blockbuster']),
  ('tt1825683', 4, 7, 'Black Panther. Wakanda forever. Cultural phenomenon.', ARRAY['action', 'blockbuster']),
  ('tt4972582', 4, 6, 'Split. McAvoy personalities. Shyamalan comeback.', ARRAY['horror', 'drama']),
  ('tt1856010', 4, 6, 'House of Gucci. Family fashion drama. Lady Gaga accent.', ARRAY['drama']),
  ('tt9032400', 3, 5, 'Eternals. MCU cosmic. Zhao directs. Divisive entry.', ARRAY['action', 'blockbuster']),
  ('tt10366206', 3, 7, 'John Wick 4. Keanu kills everyone. Staircase scene.', ARRAY['action']),
  ('tt1160419', 3, 7, 'Dune. Villeneuve sandworms. Epic adaptation.', ARRAY['sci_fi', 'blockbuster']),
  ('tt15398776', 4, 7, 'Oppenheimer. Nolan history. Destroyer of worlds.', ARRAY['drama'])
ON CONFLICT (imdb_id) DO NOTHING;

-- Additional 51 movies to bring total to 100
-- Run this in your Supabase SQL Editor

INSERT INTO beer_ratings (imdb_id, confusion_beers, enhancement_beers, rating_blurb, tags) VALUES
  -- Classic Blockbusters
  ('tt0111161', 3, 2, 'Prison drama perfection. Best enjoyed clear-headed.', ARRAY['drama']),
  ('tt0068646', 4, 3, 'An offer you can''t refuse. Respect the craft.', ARRAY['drama', 'action']),
  ('tt0071562', 5, 3, 'The saga continues. Keep notes on who''s who.', ARRAY['drama', 'action']),
  ('tt0468569', 4, 5, 'Why so serious? Perfect popcorn thriller.', ARRAY['action', 'blockbuster']),
  ('tt0167260', 3, 4, 'Return of the King. Epic conclusion deserves a toast.', ARRAY['blockbuster', 'action']),
  ('tt0110912', 6, 8, 'Non-linear Tarantino. Royale with cheese and beers.', ARRAY['cult_classic', 'action', 'drama']),
  ('tt0137523', 6, 7, 'First rule: drink. Second rule: drink more.', ARRAY['cult_classic', 'drama']),
  ('tt0109830', 2, 4, 'Life is like a box of chocolates. Heartwarming.', ARRAY['drama', 'comedy']),
  ('tt0120737', 3, 4, 'One ring to rule them all. Fellowship drinking game?', ARRAY['blockbuster', 'action']),
  ('tt0167261', 3, 4, 'The Two Towers. Middle chapter momentum.', ARRAY['blockbuster', 'action']),

  -- Mind-Benders
  ('tt0114369', 7, 4, 'Who is Keyser Soze? Stay sharp.', ARRAY['drama', 'cult_classic']),
  ('tt1130884', 8, 6, 'DiCaprio dreams again. Scorsese goes weird.', ARRAY['drama', 'horror']),
  ('tt0180093', 9, 5, 'Crowe sees dead... wait, wrong movie. Still confusing.', ARRAY['drama']),
  ('tt0479884', 8, 5, 'McConaughey finds truth. Deep existential sci-fi.', ARRAY['sci_fi', 'drama']),
  ('tt4154796', 4, 7, 'Avengers assemble for the finale. Crowd pleaser.', ARRAY['blockbuster', 'action']),
  ('tt4154756', 5, 6, 'Thanos did nothing wrong? Debate after beers.', ARRAY['blockbuster', 'action']),

  -- Horror Essentials
  ('tt0081505', 5, 7, 'All work and no play. Kubrick horror masterpiece.', ARRAY['horror', 'cult_classic']),
  ('tt0078748', 4, 6, 'In space, no one can hear you drink.', ARRAY['horror', 'sci_fi', 'cult_classic']),
  ('tt0070047', 6, 5, 'The power of Christ compels you to drink.', ARRAY['horror', 'cult_classic']),
  ('tt0087800', 2, 8, 'Freddy invades dreams. Perfect slasher fun.', ARRAY['horror', 'cult_classic']),
  ('tt0095016', 3, 9, 'Yippee ki-yay. Christmas movie debate fuel.', ARRAY['action', 'blockbuster']),
  ('tt0103064', 3, 7, 'Hasta la vista, baby. Arnold at his best.', ARRAY['action', 'sci_fi', 'blockbuster']),
  ('tt0090605', 4, 8, 'Game over, man! Colonial Marines need beer.', ARRAY['action', 'horror', 'sci_fi']),
  ('tt0056172', 3, 5, 'Birds attack. Hitchcock classic.', ARRAY['horror', 'cult_classic']),
  ('tt0082971', 2, 6, 'Indy belongs in a museum. Adventure fun.', ARRAY['action', 'blockbuster']),

  -- Comedy Gold
  ('tt0091042', 2, 10, 'Bueller? Bueller? Skip school, grab beers.', ARRAY['comedy', 'cult_classic']),
  ('tt0083658', 3, 9, 'Replicants and rain. Sci-fi noir perfection.', ARRAY['sci_fi', 'cult_classic']),
  ('tt0088763', 4, 8, 'Great Scott! Time travel fun.', ARRAY['sci_fi', 'comedy', 'blockbuster']),
  ('tt0087469', 2, 9, 'Who you gonna call? Party movie essential.', ARRAY['comedy', 'cult_classic']),
  ('tt0086190', 3, 7, 'Say hello to my little friend. Scarface excess.', ARRAY['action', 'drama', 'cult_classic']),
  ('tt0076759', 2, 5, 'A long time ago... Original trilogy starter.', ARRAY['sci_fi', 'blockbuster']),
  ('tt0080684', 4, 5, 'I am your father. Empire strikes back.', ARRAY['sci_fi', 'blockbuster']),
  ('tt0086879', 5, 5, 'Ewoks and redemption. Saga finale.', ARRAY['sci_fi', 'blockbuster']),
  ('tt0099685', 2, 9, 'Funny how? Goodfellas perfection.', ARRAY['drama', 'action', 'cult_classic']),
  ('tt0075314', 3, 8, 'You talkin'' to me? De Niro iconic.', ARRAY['drama', 'cult_classic']),

  -- Modern Classics
  ('tt1853728', 4, 7, 'Django unchained. Tarantino western revenge.', ARRAY['action', 'drama']),
  ('tt0405094', 4, 6, 'German lives in East Berlin. Touching drama.', ARRAY['foreign', 'drama']),
  ('tt0211915', 3, 7, 'French Amélie. Whimsical and charming.', ARRAY['foreign', 'comedy', 'drama']),
  ('tt0114814', 6, 4, 'Seven deadly sins. Dark detective thriller.', ARRAY['drama', 'horror']),
  ('tt0112573', 3, 6, 'What''s in the box? Fincher excellence.', ARRAY['drama', 'horror']),
  ('tt0169547', 3, 5, 'Ed Norton fights himself. Wait, what?', ARRAY['drama', 'cult_classic']),
  ('tt0317248', 3, 4, 'Lost in Translation. Quiet Tokyo nights.', ARRAY['drama', 'comedy']),
  ('tt0245429', 5, 4, 'Spirited Away. Miyazaki magic.', ARRAY['animated', 'foreign']),
  ('tt0372784', 3, 6, 'Batman begins again. Nolan''s dark vision.', ARRAY['action', 'blockbuster']),
  ('tt1345836', 4, 5, 'Dark Knight rises. Bane''s voice requires sobriety.', ARRAY['action', 'blockbuster']),

  -- Cult Favorites
  ('tt0081398', 2, 10, 'Airplane! Surely you can''t be serious.', ARRAY['comedy', 'cult_classic']),
  ('tt0084787', 5, 7, 'The Thing. Trust no one. Paranoia fuel.', ARRAY['horror', 'sci_fi', 'cult_classic']),
  ('tt0086567', 3, 9, 'WarGames. Shall we play a game?', ARRAY['sci_fi', 'cult_classic']),
  ('tt0107290', 2, 7, 'Jurassic Park. Dinosaurs and wonder.', ARRAY['sci_fi', 'blockbuster']),
  ('tt0116282', 4, 8, 'Fargo. Wood chipper scene. Oh yah.', ARRAY['comedy', 'drama', 'cult_classic']),
  ('tt0050083', 3, 3, '12 Angry Men. Courtroom tension. Stay focused.', ARRAY['drama', 'cult_classic'])
ON CONFLICT (imdb_id) DO NOTHING;

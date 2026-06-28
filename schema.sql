CREATE TABLE IF NOT EXISTS character_vaults (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  character_name TEXT NOT NULL,
  age INTEGER,
  birth_month TIMESTAMP,
  personality_traits TEXT,
  favorite_things TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_id ON character_vaults(user_id);

CREATE TABLE IF NOT EXISTS vocabulary_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  word TEXT NOT NULL,
  context_sentence TEXT,
  encountered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_vocab_user ON vocabulary_logs(user_id);

CREATE TABLE IF NOT EXISTS story_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  story_text TEXT NOT NULL,
  svg_data TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_story_user ON story_logs(user_id);

CREATE TABLE IF NOT EXISTS public_prompts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL,
  prompt_title TEXT NOT NULL,
  character_data TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_prompt_likes ON public_prompts(likes);

-- Phase 7: Gamification & Educational Schemas
CREATE TABLE IF NOT EXISTS sleep_streaks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_sleep_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_streak_user ON sleep_streaks(user_id);

CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_achievement_user ON achievements(user_id);

-- Phase 8: Data-Driven Insights & Pediatric Calibration
CREATE TABLE IF NOT EXISTS sleep_metrics (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  story_id TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  perceived_sleep_latency INTEGER,
  rating INTEGER
);
CREATE INDEX IF NOT EXISTS idx_sleep_metrics_user ON sleep_metrics(user_id);

-- Phase 9: Cognitive Architecture & Ecosystem Sovereignty
CREATE TABLE IF NOT EXISTS character_evolution (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  character_name TEXT NOT NULL,
  character_experience INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_char_evo_user ON character_evolution(user_id);

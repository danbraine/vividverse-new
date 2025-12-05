-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100),
  is_validator BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scripts table
CREATE TABLE IF NOT EXISTS scripts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  format VARCHAR(20) NOT NULL CHECK (format IN ('PDF', 'Fountain', 'Text')),
  content_hash VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  summary TEXT,
  status VARCHAR(50) DEFAULT 'PendingValidation' CHECK (status IN (
    'PendingValidation', 'Validating', 'Validated', 'Selected', 
    'Generating', 'Completed', 'Rejected'
  )),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Validations table
CREATE TABLE IF NOT EXISTS validations (
  id SERIAL PRIMARY KEY,
  script_id INTEGER REFERENCES scripts(id) ON DELETE CASCADE,
  validator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_score INTEGER CHECK (story_score >= 1 AND story_score <= 10),
  characters_score INTEGER CHECK (characters_score >= 1 AND characters_score <= 10),
  dialogue_score INTEGER CHECK (dialogue_score >= 1 AND dialogue_score <= 10),
  originality_score INTEGER CHECK (originality_score >= 1 AND originality_score <= 10),
  structure_score INTEGER CHECK (structure_score >= 1 AND structure_score <= 10),
  visual_potential_score INTEGER CHECK (visual_potential_score >= 1 AND visual_potential_score <= 10),
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(script_id, validator_id)
);

-- Aggregated scores (computed view or table)
CREATE TABLE IF NOT EXISTS aggregated_scores (
  script_id INTEGER PRIMARY KEY REFERENCES scripts(id) ON DELETE CASCADE,
  story_avg FLOAT,
  characters_avg FLOAT,
  dialogue_avg FLOAT,
  originality_avg FLOAT,
  structure_avg FLOAT,
  visual_potential_avg FLOAT,
  total_score FLOAT,
  validator_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  script_id INTEGER PRIMARY KEY REFERENCES scripts(id) ON DELETE CASCADE,
  movie_file_path VARCHAR(500),
  thumbnail_file_path VARCHAR(500),
  duration INTEGER, -- in seconds
  status VARCHAR(50) DEFAULT 'Generating' CHECK (status IN ('Generating', 'Completed', 'Failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scenes table (for movie generation tracking)
CREATE TABLE IF NOT EXISTS scenes (
  id SERIAL PRIMARY KEY,
  script_id INTEGER REFERENCES scripts(id) ON DELETE CASCADE,
  scene_number INTEGER NOT NULL,
  description TEXT,
  prompt TEXT,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Generating', 'Completed', 'Failed'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scripts_status ON scripts(status);
CREATE INDEX IF NOT EXISTS idx_scripts_author ON scripts(author_id);
CREATE INDEX IF NOT EXISTS idx_validations_script ON validations(script_id);
CREATE INDEX IF NOT EXISTS idx_validations_validator ON validations(validator_id);
CREATE INDEX IF NOT EXISTS idx_scenes_script ON scenes(script_id);


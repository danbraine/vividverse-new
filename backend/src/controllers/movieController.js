import pool from '../config/database.js';
import { saveMovie, getFileUrl } from '../utils/storage.js';

export const startMovieGeneration = async (req, res) => {
  try {
    const { scriptId } = req.params;

    // Check if script exists
    const scriptCheck = await pool.query(
      `SELECT id, status FROM scripts WHERE id = $1`,
      [scriptId]
    );

    if (scriptCheck.rows.length === 0) {
      return res.status(404).json({ err: { NotFound: null } });
    }

    // Update script status
    await pool.query(
      `UPDATE scripts SET status = 'Generating' WHERE id = $1`,
      [scriptId]
    );

    // Create movie record
    await pool.query(
      `INSERT INTO movies (script_id, status) VALUES ($1, 'Generating')
       ON CONFLICT (script_id) DO UPDATE SET status = 'Generating'`,
      [scriptId]
    );

    // Parse script into scenes (simplified - create placeholder scenes)
    // First, delete any existing scenes for this script
    await pool.query(`DELETE FROM scenes WHERE script_id = $1`, [scriptId]);
    
    // Create 5 placeholder scenes
    for (let i = 1; i <= 5; i++) {
      await pool.query(
        `INSERT INTO scenes (script_id, scene_number, description, prompt, status)
         VALUES ($1, $2, $3, $4, 'Pending')`,
        [scriptId, i, `Scene ${i}`, `Generate video for scene ${i}`]
      );
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Error starting movie generation:', error);
    res.status(500).json({ error: 'Failed to start movie generation' });
  }
};

export const getMovie = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const result = await pool.query(
      `SELECT script_id, movie_file_path, thumbnail_file_path, duration, status, created_at
       FROM movies WHERE script_id = $1`,
      [scriptId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ err: { NotFound: null } });
    }

    const movie = result.rows[0];
    res.json({
      ok: {
        scriptId: movie.script_id,
        movieHash: movie.movie_file_path ? getFileUrl(movie.movie_file_path) : '',
        thumbnailHash: movie.thumbnail_file_path ? [getFileUrl(movie.thumbnail_file_path)] : [],
        duration: movie.duration ? [movie.duration] : [],
        status: { [movie.status]: null },
        createdAt: new Date(movie.created_at).getTime() * 1000000,
      }
    });
  } catch (error) {
    console.error('Error getting movie:', error);
    res.status(500).json({ error: 'Failed to get movie' });
  }
};

export const updateMovieProgress = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const { movieHash, thumbnailHash, duration } = req.body;

    // This would be called by the AI orchestrator
    // movieHash would be the file path or URL
    await pool.query(
      `UPDATE movies SET 
        movie_file_path = $1,
        thumbnail_file_path = $2,
        duration = $3,
        status = 'Completed',
        updated_at = CURRENT_TIMESTAMP
       WHERE script_id = $4`,
      [movieHash, thumbnailHash || null, duration || null, scriptId]
    );

    // Update script status
    await pool.query(
      `UPDATE scripts SET status = 'Completed' WHERE id = $1`,
      [scriptId]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error('Error updating movie progress:', error);
    res.status(500).json({ error: 'Failed to update movie progress' });
  }
};

export const uploadMovie = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Movie file is required' });
    }

    const { saveMovie, getFileUrl } = await import('../utils/storage.js');
    const filename = `movie_${Date.now()}_${file.originalname || 'movie.mp4'}`;
    const filePath = await saveMovie(file.buffer, filename);
    const url = getFileUrl(filePath);

    res.json({ url, filePath });
  } catch (error) {
    console.error('Error uploading movie:', error);
    res.status(500).json({ error: 'Failed to upload movie' });
  }
};


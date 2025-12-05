import pool from '../config/database.js';
import { saveFile, calculateHash, getFileUrl } from '../utils/storage.js';

export const submitScript = async (req, res) => {
  try {
    const { title, format, summary } = req.body;
    const file = req.file;
    const userId = req.user.userId;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    // Calculate hash
    const contentHash = calculateHash(file.buffer);

    // Save file
    const filename = `script_${Date.now()}_${file.originalname}`;
    const filePath = await saveFile(file.buffer, filename);

    // Insert into database
    const result = await pool.query(
      `INSERT INTO scripts (title, author_id, format, content_hash, file_path, summary, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'PendingValidation')
       RETURNING id, title, author_id, format, content_hash, uploaded_at, status, summary`,
      [title, userId, format, contentHash, filePath, summary || null]
    );

    const script = result.rows[0];
    res.status(201).json({
      ok: script.id,
      script: {
        id: script.id,
        title: script.title,
        author: script.author_id.toString(),
        format: script.format,
        contentHash: script.content_hash,
        uploadedAt: new Date(script.uploaded_at).getTime() * 1000000, // Convert to nanoseconds for compatibility
        status: { [script.status]: null },
        summary: script.summary,
      }
    });
  } catch (error) {
    console.error('Error submitting script:', error);
    res.status(500).json({ error: 'Failed to submit script' });
  }
};

export const getScript = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const result = await pool.query(
      `SELECT id, title, author_id, format, content_hash, uploaded_at, status, summary
       FROM scripts WHERE id = $1`,
      [scriptId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ err: { NotFound: null } });
    }

    const script = result.rows[0];
    res.json({
      ok: {
        id: script.id,
        title: script.title,
        author: script.author_id.toString(),
        format: script.format,
        contentHash: script.content_hash,
        uploadedAt: new Date(script.uploaded_at).getTime() * 1000000,
        status: { [script.status]: null },
        summary: script.summary,
      }
    });
  } catch (error) {
    console.error('Error getting script:', error);
    res.status(500).json({ error: 'Failed to get script' });
  }
};

export const getScriptContent = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const result = await pool.query(
      `SELECT file_path FROM scripts WHERE id = $1`,
      [scriptId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Script not found' });
    }

    const { getFile } = await import('../utils/storage.js');
    const fileBuffer = await getFile(result.rows[0].file_path);
    
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileBuffer);
  } catch (error) {
    console.error('Error getting script content:', error);
    res.status(500).json({ error: 'Failed to get script content' });
  }
};

export const getPendingScripts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, author_id, format, content_hash, uploaded_at, status, summary
       FROM scripts WHERE status = 'PendingValidation'
       ORDER BY uploaded_at DESC`
    );

    const scripts = result.rows.map(script => ({
      id: script.id,
      title: script.title,
      author: script.author_id.toString(),
      format: script.format,
      contentHash: script.content_hash,
      uploadedAt: new Date(script.uploaded_at).getTime() * 1000000,
      status: { [script.status]: null },
      summary: script.summary,
    }));

    res.json(scripts);
  } catch (error) {
    console.error('Error getting pending scripts:', error);
    res.status(500).json({ error: 'Failed to get pending scripts' });
  }
};

export const getAllScripts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, author_id, format, content_hash, uploaded_at, status, summary
       FROM scripts ORDER BY uploaded_at DESC`
    );

    const scripts = result.rows.map(script => ({
      id: script.id,
      title: script.title,
      author: script.author_id.toString(),
      format: script.format,
      contentHash: script.content_hash,
      uploadedAt: new Date(script.uploaded_at).getTime() * 1000000,
      status: { [script.status]: null },
      summary: script.summary,
    }));

    res.json(scripts);
  } catch (error) {
    console.error('Error getting all scripts:', error);
    res.status(500).json({ error: 'Failed to get scripts' });
  }
};


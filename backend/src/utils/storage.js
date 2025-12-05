import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../../uploads');
const MOVIES_DIR = path.join(__dirname, '../../movies');

// Ensure directories exist on first import
(async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(MOVIES_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
})();

export const saveFile = async (fileBuffer, filename) => {
  const filePath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filePath, fileBuffer);
  return filePath;
};

export const saveMovie = async (fileBuffer, filename) => {
  const filePath = path.join(MOVIES_DIR, filename);
  await fs.writeFile(filePath, fileBuffer);
  return filePath;
};

export const getFile = async (filePath) => {
  return await fs.readFile(filePath);
};

export const calculateHash = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest('hex');
};

export const getFileUrl = (filePath) => {
  // Return relative path or full URL depending on your setup
  if (filePath && filePath.includes('uploads')) {
    return `/api/files/${path.basename(filePath)}`;
  }
  if (filePath && filePath.includes('movies')) {
    return `/api/movies/${path.basename(filePath)}`;
  }
  return filePath;
};


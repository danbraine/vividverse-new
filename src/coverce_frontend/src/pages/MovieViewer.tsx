import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovie, getScript } from '../services/coverceService';
import './MovieViewer.css';

interface Movie {
  scriptId: number;
  movieHash: string;
  thumbnailHash?: string;
  duration?: number;
  status: any;
  createdAt: bigint;
}

interface Script {
  id: number;
  title: string;
  summary?: string;
}

const MovieViewer = () => {
  const { scriptId } = useParams<{ scriptId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scriptId) {
      loadMovie(parseInt(scriptId));
    }
  }, [scriptId]);

  const loadMovie = async (id: number) => {
    try {
      const movieData = await getMovie(id);
      setMovie(movieData as any);
      
      const scriptData = await getScript(id);
      setScript(scriptData as any);
    } catch (err: any) {
      setError(err.message || 'Movie not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: any): string => {
    if (typeof status === 'object' && status !== null) {
      const keys = Object.keys(status);
      if (keys.length > 0) {
        return keys[0];
      }
    }
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="movie-viewer">
        <div className="loading">Loading movie...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-viewer">
        <div className="error-state">
          <h2>Movie Not Found</h2>
          <p>{error || 'The requested movie could not be found.'}</p>
          <Link to="/scripts" className="btn-back">
            Back to Scripts
          </Link>
        </div>
      </div>
    );
  }

  const statusLabel = getStatusLabel(movie.status);
  const isCompleted = statusLabel === 'Completed';

  return (
    <div className="movie-viewer">
      <div className="viewer-container">
        <Link to="/scripts" className="back-link">← Back to Scripts</Link>
        
        {script && (
          <div className="movie-header">
            <h1>{script.title}</h1>
            {script.summary && (
              <p className="movie-summary">{script.summary}</p>
            )}
          </div>
        )}

        <div className="movie-player">
          {isCompleted ? (
            <>
              {movie.thumbnailHash && (
                <div className="thumbnail">
                  <img 
                    src={`https://${process.env.CANISTER_ID_COVERCE_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai'}.ic0.app/api/movie/${movie.movieHash}/thumbnail`}
                    alt="Movie thumbnail"
                  />
                </div>
              )}
              
              <div className="video-container">
                <video 
                  controls 
                  className="movie-video"
                  poster={movie.thumbnailHash ? `https://${process.env.CANISTER_ID_COVERCE_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai'}.ic0.app/api/movie/${movie.movieHash}/thumbnail` : undefined}
                >
                  <source 
                    src={`https://${process.env.CANISTER_ID_COVERCE_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai'}.ic0.app/api/movie/${movie.movieHash}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {movie.duration && (
                <p className="movie-duration">
                  Duration: {Math.floor(movie.duration / 60)}:{(movie.duration % 60).toString().padStart(2, '0')}
                </p>
              )}
            </>
          ) : (
            <div className="generating-state">
              <div className="spinner"></div>
              <h2>Movie Generation in Progress</h2>
              <p>The AI is currently creating your movie. This may take several minutes.</p>
              <p className="status-info">Status: {statusLabel}</p>
            </div>
          )}
        </div>

        <div className="movie-info">
          <div className="info-item">
            <span className="info-label">Script ID:</span>
            <span>{movie.scriptId}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`status-badge ${statusLabel.toLowerCase()}`}>
              {statusLabel}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Created:</span>
            <span>
              {new Date(Number(movie.createdAt) / 1_000_000).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieViewer;




import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllScripts, getAggregatedScore, getTopScript, startMovieGeneration } from '../services/coverceService';
import './ScriptList.css';

interface Script {
  id: number;
  title: string;
  author: string;
  uploadedAt: bigint;
  status: any;
  summary?: string;
}

interface AggregatedScore {
  scriptId: number;
  totalScore: number;
  validatorCount: number;
}

const ScriptList = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [scores, setScores] = useState<Record<number, AggregatedScore>>({});
  const [topScriptId, setTopScriptId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<number | null>(null);

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = async () => {
    try {
      const allScripts = await getAllScripts();
      setScripts(allScripts as any);
      
      // Load scores for all scripts
      const scoresMap: Record<number, AggregatedScore> = {};
      for (const script of allScripts as any) {
        try {
          const score = await getAggregatedScore(script.id);
          scoresMap[script.id] = score as any;
        } catch (err) {
          // Script might not have scores yet
        }
      }
      setScores(scoresMap);
      
      // Get top script
      const top = await getTopScript();
      setTopScriptId(top ? Number(top) : null);
    } catch (err) {
      console.error('Error loading scripts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMovie = async (scriptId: number) => {
    setGenerating(scriptId);
    try {
      await startMovieGeneration(scriptId);
      await loadScripts(); // Refresh to update status
    } catch (err) {
      console.error('Error starting movie generation:', err);
      alert('Failed to start movie generation');
    } finally {
      setGenerating(null);
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

  const getStatusColor = (status: any): string => {
    const statusStr = getStatusLabel(status);
    switch (statusStr) {
      case 'PendingValidation':
        return '#ffa500';
      case 'Validating':
        return '#4a90e2';
      case 'Validated':
        return '#50c878';
      case 'Selected':
        return '#9b59b6';
      case 'Generating':
        return '#e74c3c';
      case 'Completed':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  if (loading) {
    return (
      <div className="script-list">
        <div className="loading">Loading scripts...</div>
      </div>
    );
  }

  return (
    <div className="script-list">
      <div className="list-container">
        <h1>All Scripts</h1>
        <p className="subtitle">Browse all submitted scripts and their validation scores</p>

        {scripts.length === 0 ? (
          <div className="empty-state">
            <p>No scripts submitted yet. Be the first to submit one!</p>
            <Link to="/submit" className="btn-primary">
              Submit Script
            </Link>
          </div>
        ) : (
          <div className="scripts-grid">
            {scripts.map((script) => {
              const score = scores[script.id];
              const isTop = topScriptId === script.id;
              const statusLabel = getStatusLabel(script.status);
              
              return (
                <div key={script.id} className={`script-card ${isTop ? 'top-script' : ''}`}>
                  {isTop && (
                    <div className="top-badge">🏆 Top Script</div>
                  )}
                  
                  <h3>{script.title}</h3>
                  
                  {script.summary && (
                    <p className="script-summary">{script.summary}</p>
                  )}
                  
                  <div className="script-meta">
                    <div className="meta-item">
                      <span className="meta-label">ID:</span>
                      <span>{script.id}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Status:</span>
                      <span 
                        className="status-badge"
                        style={{ color: getStatusColor(script.status) }}
                      >
                        {statusLabel}
                      </span>
                    </div>
                    {score && (
                      <>
                        <div className="meta-item">
                          <span className="meta-label">Score:</span>
                          <span className="score-value">
                            {score.totalScore.toFixed(2)}/10
                          </span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Validators:</span>
                          <span>{score.validatorCount}</span>
                        </div>
                      </>
                    )}
                    <div className="meta-item">
                      <span className="meta-label">Uploaded:</span>
                      <span>
                        {new Date(Number(script.uploadedAt) / 1_000_000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="script-actions">
                    {statusLabel === 'Selected' && (
                      <button
                        onClick={() => handleGenerateMovie(script.id)}
                        className="btn-generate"
                        disabled={generating === script.id}
                      >
                        {generating === script.id ? 'Starting...' : 'Generate Movie'}
                      </button>
                    )}
                    {statusLabel === 'Completed' && (
                      <Link 
                        to={`/movie/${script.id}`} 
                        className="btn-watch"
                      >
                        Watch Movie
                      </Link>
                    )}
                    {statusLabel === 'Generating' && (
                      <div className="generating-indicator">
                        Movie generation in progress...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptList;




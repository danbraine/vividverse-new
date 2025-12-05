import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getPendingScripts, 
  registerValidator, 
  isValidator, 
  submitValidation,
  getValidations 
} from '../services/api';
import './ValidatorDashboard.css';

interface Script {
  id: number;
  title: string;
  author: string;
  uploadedAt: bigint;
  status: any;
  summary?: string;
}

const CATEGORIES = [
  { key: 'Story', label: 'Story' },
  { key: 'Characters', label: 'Characters' },
  { key: 'Dialogue', label: 'Dialogue' },
  { key: 'Originality', label: 'Originality' },
  { key: 'Structure', label: 'Structure' },
  { key: 'VisualPotential', label: 'Visual Potential' },
];

const ValidatorDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidatorUser, setIsValidatorUser] = useState(false);
  const [checkingValidator, setCheckingValidator] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkValidatorStatus();
      loadScripts();
    }
  }, [isAuthenticated, user]);

  const checkValidatorStatus = async () => {
    if (!user) return;
    
    try {
      const validator = await isValidator(user.id.toString());
      setIsValidatorUser(validator);
    } catch (err) {
      console.error('Error checking validator status:', err);
    } finally {
      setCheckingValidator(false);
    }
  };

  const loadScripts = async () => {
    try {
      const pending = await getPendingScripts();
      setScripts(pending as any);
    } catch (err) {
      console.error('Error loading scripts:', err);
    }
  };

  const handleRegisterValidator = async () => {
    setLoading(true);
    try {
      await registerValidator();
      setIsValidatorUser(true);
    } catch (err: any) {
      setError(err.message || 'Failed to register as validator');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (category: string, value: number) => {
    setScores({ ...scores, [category]: value });
  };

  const handleSubmitValidation = async () => {
    if (!selectedScript) return;

    // Validate all scores are provided
    const missingScores = CATEGORIES.filter(cat => !scores[cat.key] || scores[cat.key] < 1 || scores[cat.key] > 10);
    if (missingScores.length > 0) {
      setError('Please provide scores (1-10) for all categories');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const scoreArray = CATEGORIES.map(cat => ({
        category: cat.key,
        score: scores[cat.key],
      }));

      await submitValidation(
        selectedScript.id,
        scoreArray,
        comments || undefined
      );

      setSuccess(true);
      setSelectedScript(null);
      setScores({});
      setComments('');
      await loadScripts();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit validation');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="validator-dashboard">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please login to access the validator dashboard.</p>
        </div>
      </div>
    );
  }

  if (checkingValidator) {
    return (
      <div className="validator-dashboard">
        <div className="loading">Checking validator status...</div>
      </div>
    );
  }

  if (!isValidatorUser) {
    return (
      <div className="validator-dashboard">
        <div className="register-validator">
          <h2>Become a Validator</h2>
          <p>Validators score scripts on quality metrics. Register to start validating submissions.</p>
          <button 
            onClick={handleRegisterValidator} 
            className="btn-register"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register as Validator'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="validator-dashboard">
      <div className="dashboard-container">
        <h1>Validator Dashboard</h1>
        <p className="subtitle">Score scripts waiting for validation</p>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {success && (
          <div className="alert alert-success">Validation submitted successfully!</div>
        )}

        <div className="dashboard-content">
          <div className="scripts-list">
            <h2>Pending Scripts ({scripts.length})</h2>
            {scripts.length === 0 ? (
              <p className="empty-state">No scripts pending validation</p>
            ) : (
              <div className="script-cards">
                {scripts.map((script) => (
                  <div
                    key={script.id}
                    className={`script-card ${selectedScript?.id === script.id ? 'selected' : ''}`}
                    onClick={() => setSelectedScript(script)}
                  >
                    <h3>{script.title}</h3>
                    {script.summary && (
                      <p className="script-summary">{script.summary}</p>
                    )}
                    <p className="script-meta">
                      ID: {script.id} • Uploaded: {new Date(Number(script.uploadedAt) / 1_000_000).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedScript && (
            <div className="validation-panel">
              <h2>Score: {selectedScript.title}</h2>
              
              <div className="scoring-form">
                {CATEGORIES.map((category) => (
                  <div key={category.key} className="score-input">
                    <label>
                      {category.label}
                      <span className="score-value">
                        {scores[category.key] || 0}/10
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores[category.key] || 5}
                      onChange={(e) => handleScoreChange(category.key, parseInt(e.target.value))}
                      className="score-slider"
                    />
                    <div className="score-labels">
                      <span>Poor</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                ))}

                <div className="comments-section">
                  <label htmlFor="comments">Comments (Optional)</label>
                  <textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide feedback on this script..."
                    rows={4}
                  />
                </div>

                <button
                  onClick={handleSubmitValidation}
                  className="btn-submit-validation"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Validation'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidatorDashboard;




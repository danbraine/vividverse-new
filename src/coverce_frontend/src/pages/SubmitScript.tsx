import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { submitScript } from '../services/coverceService';
import './SubmitScript.css';

const SubmitScript = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<'PDF' | 'Fountain' | 'Text'>('Fountain');
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="submit-script">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please login with Internet Identity to submit a script.</p>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title.trim()) {
      setError('Please enter a script title');
      return;
    }

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);

    try {
      // Read file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Submit script
      const scriptId = await submitScript(title, format, uint8Array, summary || undefined);
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/scripts`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit script. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-script">
      <div className="submit-container">
        <h1>Submit Your Script</h1>
        <p className="subtitle">Upload your screenplay and join the competition</p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            Script submitted successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="submit-form">
          <div className="form-group">
            <label htmlFor="title">Script Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your script title"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="format">Script Format *</label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'PDF' | 'Fountain' | 'Text')}
              disabled={loading}
            >
              <option value="Fountain">Fountain (.fountain)</option>
              <option value="PDF">PDF (.pdf)</option>
              <option value="Text">Plain Text (.txt)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="file">Script File *</label>
            <input
              type="file"
              id="file"
              accept=".fountain,.pdf,.txt"
              onChange={handleFileChange}
              required
              disabled={loading}
            />
            {file && (
              <p className="file-info">
                Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="summary">Summary (Optional)</label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief description of your script..."
              rows={4}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Script'}
          </button>
        </form>

        <div className="info-box">
          <h3>📋 Submission Guidelines</h3>
          <ul>
            <li>Scripts must be in Fountain, PDF, or plain text format</li>
            <li>Maximum file size: 10MB</li>
            <li>Your script will be reviewed by validators</li>
            <li>Top-scoring scripts will be automatically turned into AI-generated films</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmitScript;




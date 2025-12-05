import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-tagline">Harnessing Human Imagination</h1>
        <p className="hero-subtitle">
          The world's first decentralised studio where creators and critics get paid to power a global imagination flywheel.
        </p>
        <p className="hero-description">
          {/* Vividverse, a canvas of human imagination. A studio owned by the world, authored by the world. Stories told by the world. */}
        </p>
        
        <div className="hero-actions">
          {isAuthenticated ? (
            <>
              <Link to="/submit" className="btn btn-primary">
                Submit Your Script
              </Link>
              <Link to="/validate" className="btn btn-secondary">
                Become a Validator
              </Link>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login to Get Started
            </Link>
          )}
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Submit Scripts</h3>
          <p>Upload your screenplay in PDF or Fountain format. No crypto needed for MVP.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚖️</div>
          <h3>Get Validated</h3>
          <p>Validators score your script on Story, Characters, Dialogue, Originality, and more.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Generates Film</h3>
          <p>Top-scoring scripts automatically become AI-generated movies using cutting-edge video AI.</p>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Submit</h3>
            <p>Writers upload scripts through the submission portal</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Validate</h3>
            <p>Validators score scripts using our comprehensive rubric</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Generate</h3>
            <p>AI orchestrator creates the movie from the winning script</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Watch</h3>
            <p>Final film is stored and available for viewing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, principal, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎬 Coverce.ai
        </Link>
        
        <div className="navbar-links">
          <Link to="/scripts" className="nav-link">Scripts</Link>
          {isAuthenticated && (
            <>
              <Link to="/submit" className="nav-link">Submit Script</Link>
              <Link to="/validate" className="nav-link">Validate</Link>
            </>
          )}
        </div>
        
        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="auth-info">
              <span className="principal">
                {principal?.toText().slice(0, 8)}...
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={login} className="btn-login">
              Login with Internet Identity
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




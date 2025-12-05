import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import vividverseLogo from '../vividverse_logo.svg';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={vividverseLogo} alt="VividVerse" className="navbar-logo" />
          <span className="navbar-brand-text">VividVerse</span>
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
              <span className="user-info">
                {user?.username || user?.email}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




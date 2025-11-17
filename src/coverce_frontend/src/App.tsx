import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubmitScript from './pages/SubmitScript';
import ValidatorDashboard from './pages/ValidatorDashboard';
import ScriptList from './pages/ScriptList';
import MovieViewer from './pages/MovieViewer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitScript />} />
            <Route path="/validate" element={<ValidatorDashboard />} />
            <Route path="/scripts" element={<ScriptList />} />
            <Route path="/movie/:scriptId" element={<MovieViewer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;




import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../Images/logo.png';
import hero from '../Images/hero.jpg';
import { FaEnvelope, FaLinkedin, FaTwitter, FaGamepad } from 'react-icons/fa';
import { useClickContext } from '../contexts/ClickContext';
import GameScoreDialog from './GameScoreDialog';

const Layout = ({ children }) => {
  const [isGameScoreDialogOpen, setIsGameScoreDialogOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const players = JSON.parse(localStorage.getItem('players') || '[]');
      if (players.some(player => player.scores.some(score => score !== 0))) {
        e.preventDefault();
        e.returnValue = '';
        setShowWarning(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleConfirmRefresh = () => {
    localStorage.removeItem('players');
    localStorage.removeItem('rounds');
    setShowWarning(false);
    window.location.reload();
  };

  const handleCancelRefresh = () => {
    setShowWarning(false);
  };

  // If we're on the hidden page, don't render the normal layout
  const location = useLocation();
  if (location.pathname === '/hidden') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 z-[-1]" style={{ 
        backgroundImage: `url(${hero})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center 20%', // This crops ~20% from the top
        backgroundAttachment: 'fixed' // This makes the background fixed
      }}></div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-800 text-white flex items-center justify-between p-2 h-10">
        <img src={logo} alt="Logo" className="h-9" />
        <div className="flex space-x-4">
          <button
            onClick={() => setIsGameScoreDialogOpen(true)}
            className="flex items-center justify-center w-8 h-8 bg-white text-blue-800 rounded-full hover:bg-orange-500 hover:text-white"
          >
            <FaGamepad />
          </button>
          <a href="mailto:arjunspaudel@outlook.com" className="flex items-center justify-center w-8 h-8 bg-white text-blue-800 rounded-full hover:bg-orange-500 hover:text-white">
            <FaEnvelope />
          </a>
          <a href="https://linkedin.com/in/apaudel" className="flex items-center justify-center w-8 h-8 bg-white text-blue-800 rounded-full hover:bg-orange-500 hover:text-white">
            <FaLinkedin />
          </a>
          <a href="https://x.com/apaudel" className="flex items-center justify-center w-8 h-8 bg-white text-blue-800 rounded-full hover:bg-orange-500 hover:text-white">
            <FaTwitter />
          </a>
        </div>
      </header>
      <nav className="fixed top-10 left-0 right-0 z-50 bg-transparent text-white text-center p-1 h-5">
        <div className="flex flex-wrap justify-center space-x-4 text-sm md:text-base">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Home</NavLink>
          <NavLink to="/education" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Education</NavLink>
          <NavLink to="/experiences" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Experiences</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Projects</NavLink>
          <NavLink to="/interests" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Interests</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>About</NavLink>
        </div>
      </nav>
      <main className="flex-grow p-4 mt-20"> {/* Increased top margin to accommodate fixed header and nav */}
        {children}
      </main>
      <footer className="text-center text-white p-4">
        © {new Date().getFullYear()} Arjun
      </footer>
      <GameScoreDialog
        isOpen={isGameScoreDialogOpen}
        onClose={() => setIsGameScoreDialogOpen(false)}
      />
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Warning</h2>
            <p className="text-red-500 mb-4">You will lose the current scorecard if you refresh. Are you sure?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCancelRefresh} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleConfirmRefresh} className="bg-red-500 text-white px-4 py-2 rounded">Yes, Refresh</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;

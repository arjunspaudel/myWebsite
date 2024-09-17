import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../Images/logo.png';
import hero from '../Images/hero.jpg';
import { FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useClickContext } from '../contexts/ClickContext';

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // If we're on the hidden page, don't render the normal layout
  if (location.pathname === '/hidden') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="bg-blue-800 text-white flex items-center justify-between p-2 h-10">
        <img src={logo} alt="Logo" className="h-9" /> {/* Adjusted height to make the logo larger */}
        <div className="flex space-x-4">
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
      <nav className="bg-transparent text-white text-center p-1 h-5">
        <div className="flex flex-wrap justify-center space-x-4 text-sm md:text-base">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Home</NavLink>
          <NavLink to="/education" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Education</NavLink>
          <NavLink to="/experiences" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Experiences</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Projects</NavLink>
          <NavLink to="/interests" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>Interests</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-500" : "hover:text-orange-500"}>About</NavLink>
        </div>
      </nav>
      <main className="flex-grow p-4 mt-5">
        {children}
      </main>
      <footer className="text-center text-white">
        © {currentYear} Arjun
      </footer>
    </div>
  );
};

export default Layout;

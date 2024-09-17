import React from 'react';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Education from './pages/Education';
import Experiences from './pages/Experiences';
import Projects from './pages/Projects';
import Interests from './pages/Interests';
import About from './pages/About';
import HiddenPage from './pages/HiddenPage';
import './index.css';
import { ClickProvider, useClickContext } from './contexts/ClickContext';
import { HelmetProvider } from 'react-helmet-async';

function AppContent() {
  const navigate = useNavigate();
  const { handleClick } = useClickContext();

  const handleHiddenPageActivation = () => {
    navigate('/hidden');
  };

  return (
    <div onClick={() => handleClick(handleHiddenPageActivation)}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/about" element={<About />} />
          <Route path="/hidden" element={<HiddenPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ClickProvider>
          <AppContent />
        </ClickProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

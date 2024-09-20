import React, { useState, useEffect } from 'react';
import { useClickContext } from '../contexts/ClickContext';
import { Navigate } from 'react-router-dom';
import { getCurrentlyWatching, setCurrentlyWatching, addMovie } from '../Services/movieService';
import { getCurrentlyReading, setCurrentlyReading, addBook } from '../Services/bookService';
import PDFSignature from '../components/PDFSignature';

const HiddenPage = () => {
  const { showHiddenPage } = useClickContext();
  const [newItem, setNewItem] = useState({ title: '', author: '', year: '', pageCount: '', wiki: '' });
  const [isAddingCurrent, setIsAddingCurrent] = useState(false);
  const [isAddingToAll, setIsAddingToAll] = useState(false);
  const [itemType, setItemType] = useState('');
  const [stars, setStars] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showPDFSignature, setShowPDFSignature] = useState(false);

  useEffect(() => {
    const generateStars = () => {
      const starCount = 200;
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 2}s`,
        });
      }
      setStars(newStars);
    };

    generateStars();
    
    // Delay before showing the black screen
    const blackScreenTimer = setTimeout(() => setShowBlackScreen(true), 300);
    
    // Delay before showing the content
    const contentTimer = setTimeout(() => setIsVisible(true), 800);
    
    return () => {
      clearTimeout(blackScreenTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddingCurrent) {
      if (itemType === 'movie') {
        setCurrentlyWatching(newItem);
        alert('Currently watching movie updated!');
      } else if (itemType === 'book') {
        setCurrentlyReading(newItem);
        alert('Currently reading book updated!');
      }
    } else {
      if (itemType === 'movie') {
        addMovie(newItem);
        alert('New movie added to the list!');
      } else if (itemType === 'book') {
        addBook(newItem);
        alert('New book added to the list!');
      }
    }
    setNewItem({ title: '', author: '', year: '', pageCount: '', wiki: '' });
    setIsAddingCurrent(false);
    setIsAddingToAll(false);
    setItemType('');
  };

  const startAdding = (isCurrent, type) => {
    setIsAddingCurrent(isCurrent);
    setIsAddingToAll(!isCurrent);
    setItemType(type);
  };

  if (!showHiddenPage) {
    return <Navigate to="/" />;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-colors duration-500 ${showBlackScreen ? 'bg-black' : 'bg-transparent'}`}>
      {showBlackScreen && stars.map((star, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-orange-500 rounded-full animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        ></div>
      ))}
      <div className={`p-8 rounded-lg max-w-md w-full bg-transparent relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Welcome, Master</h1>
        
        <div className="space-y-4 mb-6">
          <button
            onClick={() => startAdding(true, 'movie')}
            className="w-full py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            Update Current Movie
          </button>
          <button
            onClick={() => startAdding(true, 'book')}
            className="w-full py-2 rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
          >
            Update Current Book
          </button>
          <button
            onClick={() => startAdding(false, 'movie')}
            className="w-full py-2 rounded border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white transition-colors"
          >
            Add to All Movies
          </button>
          <button
            onClick={() => startAdding(false, 'book')}
            className="w-full py-2 rounded border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
          >
            Add to All Books
          </button>
          <button
            onClick={() => setShowPDFSignature(true)}
            className="w-full py-2 rounded border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
          >
            PDF Signature Tool
          </button>
        </div>

        {(isAddingCurrent || isAddingToAll) && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              placeholder="Title"
              className="w-full px-4 py-2 rounded border bg-transparent text-white placeholder-gray-400"
              required
            />
            {itemType === 'book' && (
              <>
                <input
                  type="text"
                  value={newItem.author}
                  onChange={(e) => setNewItem({...newItem, author: e.target.value})}
                  placeholder="Author"
                  className="w-full px-4 py-2 rounded border bg-transparent text-white placeholder-gray-400"
                  required
                />
                <input
                  type="number"
                  value={newItem.pageCount}
                  onChange={(e) => setNewItem({...newItem, pageCount: e.target.value})}
                  placeholder="Page Count"
                  className="w-full px-4 py-2 rounded border bg-transparent text-white placeholder-gray-400"
                  required
                />
              </>
            )}
            <input
              type="number"
              value={newItem.year}
              onChange={(e) => setNewItem({...newItem, year: e.target.value})}
              placeholder="Year"
              className="w-full px-4 py-2 rounded border bg-transparent text-white placeholder-gray-400"
              required
            />
            <input
              type="url"
              value={newItem.wiki}
              onChange={(e) => setNewItem({...newItem, wiki: e.target.value})}
              placeholder="Wikipedia URL"
              className="w-full px-4 py-2 rounded border bg-transparent text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
            >
              {isAddingCurrent ? `Update Current ${itemType}` : `Add to All ${itemType}s`}
            </button>
          </form>
        )}

        {(isAddingCurrent || isAddingToAll) && (
          <button
            onClick={() => {
              setIsAddingCurrent(false);
              setIsAddingToAll(false);
              setItemType('');
              setNewItem({ title: '', author: '', year: '', pageCount: '', wiki: '' });
            }}
            className="mt-4 w-full py-2 rounded border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        )}

        <PDFSignature isOpen={showPDFSignature} onClose={() => setShowPDFSignature(false)} />
      </div>
    </div>
  );
};

export default HiddenPage;

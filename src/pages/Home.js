import React, { useEffect, useState } from 'react';
import motivationalQuotes from '../data/quotes';

const Home = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="flex items-start justify-center h-screen p-4 overflow-hidden">
      <div className="text-center text-lg md:text-2xl lg:text-3xl xl:text-4xl text-white mt-16">
        {quote}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import motivationalQuotes from '../data/quotes';

const Home = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      return motivationalQuotes[randomIndex];
    };

    // Set initial quote
    setQuote(getRandomQuote());

    // Set up interval to change quote every 8 seconds
    const intervalId = setInterval(() => {
      setQuote(getRandomQuote());
    }, 8000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Helmet>
        <title>Arjun</title>
      </Helmet>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex flex-col justify-center h-full -mt-96">
          <div className="text-center text-lg md:text-2xl lg:text-3xl xl:text-4xl text-white max-w-4xl">
            {quote}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import motivationalQuotes from '../data/quotes';

const Home = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <>
      <Helmet>
        <title>Arjun</title>
      </Helmet>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex flex-col justify-center h-full -mt-96"> {/* Added this wrapper div */}
          <div className="text-center text-lg md:text-2xl lg:text-3xl xl:text-4xl text-white max-w-4xl">
            {quote}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

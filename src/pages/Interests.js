import React, { useState } from 'react';
import { getBooks, getCurrentlyReading } from '../Services/bookService';
import { getMovies, getCurrentlyWatching } from '../Services/movieService';
import BookListDialog from '../components/BookListDialog';
import MovieListDialog from '../components/MovieListDialog';
import { Helmet } from 'react-helmet-async';

const interests = [
  {
    title: "Spicy Food Enthusiast",
    description: "I’m on a constant quest to explore the world through its most intense and flavorful dishes. Whether it’s the fiery kick of a new hot sauce or the complexity of a spice blend from across the globe, I embrace the heat. For me, every meal is an adventure!"
  },
  {
    title: "Summer Camping Explorer",
    description: "There’s something magical about the great outdoors during the summer. Camping is my way of disconnecting from the everyday and reconnecting with nature. I find joy in hiking under the sun, sleeping beneath the stars, and sharing stories around a crackling campfire."
  },
  {
    title: "Grill Master in the Making",
    description: "Nothing says summer quite like the smell of something sizzling on the grill. Whether I’m grilling up some juicy steaks or trying out new barbecue recipes, grilling is my go-to for combining flavors, fun, and a bit of fire. The perfect companion to this? A cold beer, of course."
  },
  {
    title: "Cold Beer Connoisseur",
    description: "On a hot day (or really, any day), there’s little I enjoy more than a perfectly chilled beer. Whether it’s discovering a new craft brew or sipping a classic lager by the grill, I love pairing this refreshing beverage with good company and good times."
  },
  {
    title: "Hot, Strong, Black Coffee Lover",
    description: "My mornings (and often, my afternoons) start with a cup of hot, strong, black coffee. No sugar, no cream—just the bold and rich flavor of coffee at its finest. It’s my fuel for creativity, focus, and diving into whatever the day brings."
  },
  {
    title: "Aspiring Investor",
    description: "I’ve recently begun learning the intricacies of investing in the stock market. The mix of strategy, risk, and reward is captivating, and I’m excited to build my knowledge in this space. Whether it’s analyzing market trends or researching new opportunities, I’m eager to see where this new interest takes me."
  },
  
  
];

const InterestsPage = () => {
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isMovieDialogOpen, setIsMovieDialogOpen] = useState(false);
  const books = getBooks();
  const currentlyReading = getCurrentlyReading();
  const movies = getMovies();
  const currentlyWatching = getCurrentlyWatching();

  return (
    <>
      <Helmet>
        <title>AP - Interests</title>
      </Helmet>     
    <div className="p-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">My Interests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {interests.map((interest, index) => (
          <div key={index} className="bg-lightOrange p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{interest.title}</h2>
            <p className="text-base md:text-lg lg:text-xl text-justify">{interest.description}</p>
          </div>
        ))}
        <div className="bg-lightOrange p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">
            Books | | currently reading: {currentlyReading.title} |{' '}
            <button
              className="text-blue-500 underline"
              onClick={() => setIsBookDialogOpen(true)}
            >
              All lists
            </button>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-justify">
            Books are my constant companions, whether I’m exploring new worlds through fiction or broadening my horizons with non-fiction. I believe learning never stops, and I’m always diving into new topics that pique my curiosity. Recently, I’ve been diving into the fascinating world of finance and investing, with a special focus on the stock market.
          </p>
        </div>

        <div className="bg-lightOrange p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">
            Movie & TV Series | | currently watching: {currentlyWatching.title} |{' '}
            <button
              className="text-blue-500 underline"
              onClick={() => setIsMovieDialogOpen(true)}
            >
              All lists
            </button>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-justify">
            From mind-bending thrillers to feel-good comedies, I have a deep appreciation for all things cinema and TV. Whether it’s dissecting the plot twists of a great series or getting lost in the visual storytelling of a film, I’m always on the lookout for the next binge-worthy show or movie.
          </p>
        </div>
      </div>
      {isBookDialogOpen && (
        <BookListDialog books={books} onClose={() => setIsBookDialogOpen(false)} />
      )}
      {isMovieDialogOpen && (
        <MovieListDialog movies={movies} onClose={() => setIsMovieDialogOpen(false)} />
      )}
    </div>
    </>
  );
};

export default InterestsPage;


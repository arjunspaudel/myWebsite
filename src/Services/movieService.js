import { getAllMovies as initialMovies, currentlyWatching as initialCurrentlyWatching, updateCurrentlyWatching as updateCurrentlyWatchingInMemory } from '../data/movies';

const MOVIES_KEY = 'movies';
const CURRENTLY_WATCHING_KEY = 'currentlyWatching';

const getMovies = () => {
  const movies = localStorage.getItem(MOVIES_KEY);
  return movies ? JSON.parse(movies) : initialMovies();
};

const getCurrentlyWatching = () => {
  const currentlyWatching = localStorage.getItem(CURRENTLY_WATCHING_KEY);
  return currentlyWatching ? JSON.parse(currentlyWatching) : initialCurrentlyWatching;
};

const addMovie = (movie) => {
  const movies = getMovies();
  const isAlreadyInList = movies.some(m => m.title === movie.title && m.year === movie.year);
  if (!isAlreadyInList) {
    movies.push(movie);
    localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
  }
};

const setCurrentlyWatching = (movie) => {
  const currentMovie = getCurrentlyWatching();
  if (currentMovie) {
    addMovie(currentMovie);
  }
  localStorage.setItem(CURRENTLY_WATCHING_KEY, JSON.stringify(movie));
  updateCurrentlyWatchingInMemory(movie);
};

const syncWithLocalStorage = () => {
  const storedMovies = localStorage.getItem(MOVIES_KEY);
  const storedCurrentlyWatching = localStorage.getItem(CURRENTLY_WATCHING_KEY);

  if (storedMovies) {
    // Update the in-memory movies list
    const movies = JSON.parse(storedMovies);
    movies.forEach(movie => addMovie(movie));
  } else {
    // Initialize localStorage with the current in-memory data
    localStorage.setItem(MOVIES_KEY, JSON.stringify(initialMovies()));
  }

  if (storedCurrentlyWatching) {
    // Update the in-memory currently watching
    updateCurrentlyWatchingInMemory(JSON.parse(storedCurrentlyWatching));
  } else {
    // Initialize localStorage with the current in-memory data
    localStorage.setItem(CURRENTLY_WATCHING_KEY, JSON.stringify(initialCurrentlyWatching));
  }
};

export { getMovies, getCurrentlyWatching, addMovie, setCurrentlyWatching, syncWithLocalStorage };

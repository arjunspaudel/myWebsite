import { movies as initialMovies, currentlyWatching as initialCurrentlyWatching } from '../data/movies';

const MOVIES_KEY = 'movies';
const CURRENTLY_WATCHING_KEY = 'currentlyWatching';

const getMovies = () => {
  const movies = localStorage.getItem(MOVIES_KEY);
  return movies ? JSON.parse(movies) : initialMovies;
};

const getCurrentlyWatching = () => {
  const currentlyWatching = localStorage.getItem(CURRENTLY_WATCHING_KEY);
  return currentlyWatching ? JSON.parse(currentlyWatching) : initialCurrentlyWatching;
};

const addMovie = (movie) => {
  const movies = getMovies();
  movies.push(movie);
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
};

const setCurrentlyWatching = (movie) => {
  const currentMovie = getCurrentlyWatching();
  if (currentMovie) {
    addMovie(currentMovie);
  }
  localStorage.setItem(CURRENTLY_WATCHING_KEY, JSON.stringify(movie));
};

export { getMovies, getCurrentlyWatching, addMovie, setCurrentlyWatching };

let movies = [
    { title: "Inception", year: 2010, wiki: "https://en.wikipedia.org/wiki/Inception" },
    { title: "The Matrix", year: 1999, wiki: "https://en.wikipedia.org/wiki/The_Matrix" },
    // Add more movies here
  ];

let currentlyWatching = { title: "Interstellar", year: 2014, wiki: "https://en.wikipedia.org/wiki/Interstellar_(film)" };

const updateCurrentlyWatching = (newMovie) => {
    // Add the current "currently watching" movie to the movies list
    if (currentlyWatching) {
        // Check if the movie is already in the list to avoid duplicates
        const isAlreadyInList = movies.some(movie => 
            movie.title === currentlyWatching.title && movie.year === currentlyWatching.year
        );
        
        if (!isAlreadyInList) {
            movies.push(currentlyWatching);
        }
    }
    
    // Update the currently watching movie
    currentlyWatching = newMovie;
};

const getAllMovies = () => {
    return movies;
};

export { getAllMovies, currentlyWatching, updateCurrentlyWatching };

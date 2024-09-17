import { books as initialBooks, currentlyReading as initialCurrentlyReading } from '../data/books';

const BOOKS_KEY = 'books';
const CURRENTLY_READING_KEY = 'currentlyReading';

const getBooks = () => {
  const books = localStorage.getItem(BOOKS_KEY);
  return books ? JSON.parse(books) : initialBooks;
};

const getCurrentlyReading = () => {
  const currentlyReading = localStorage.getItem(CURRENTLY_READING_KEY);
  return currentlyReading ? JSON.parse(currentlyReading) : initialCurrentlyReading;
};

const addBook = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

const setCurrentlyReading = (book) => {
  const currentBook = getCurrentlyReading();
  if (currentBook) {
    addBook(currentBook);
  }
  localStorage.setItem(CURRENTLY_READING_KEY, JSON.stringify(book));
};

export { getBooks, getCurrentlyReading, addBook, setCurrentlyReading };

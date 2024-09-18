import { getAllBooks as initialBooks, currentlyReading as initialCurrentlyReading, updateCurrentlyReading as updateCurrentlyReadingInMemory } from '../data/books';

const BOOKS_KEY = 'books';
const CURRENTLY_READING_KEY = 'currentlyReading';

const getBooks = () => {
  const books = localStorage.getItem(BOOKS_KEY);
  return books ? JSON.parse(books) : initialBooks();
};

const getCurrentlyReading = () => {
  const currentlyReading = localStorage.getItem(CURRENTLY_READING_KEY);
  return currentlyReading ? JSON.parse(currentlyReading) : initialCurrentlyReading;
};

const addBook = (book) => {
  const books = getBooks();
  const isAlreadyInList = books.some(b => b.title === book.title && b.author === book.author);
  if (!isAlreadyInList) {
    books.push({...book, pageCount: parseInt(book.pageCount) || 0});
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }
};

const setCurrentlyReading = (book) => {
  const currentBook = getCurrentlyReading();
  if (currentBook) {
    addBook(currentBook);
  }
  localStorage.setItem(CURRENTLY_READING_KEY, JSON.stringify(book));
  updateCurrentlyReadingInMemory(book);
};

const syncWithLocalStorage = () => {
  const storedBooks = localStorage.getItem(BOOKS_KEY);
  const storedCurrentlyReading = localStorage.getItem(CURRENTLY_READING_KEY);

  if (storedBooks) {
    const books = JSON.parse(storedBooks);
    books.forEach(book => addBook(book));
  } else {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks()));
  }

  if (storedCurrentlyReading) {
    updateCurrentlyReadingInMemory(JSON.parse(storedCurrentlyReading));
  } else {
    localStorage.setItem(CURRENTLY_READING_KEY, JSON.stringify(initialCurrentlyReading));
  }
};

export { getBooks, getCurrentlyReading, addBook, setCurrentlyReading, syncWithLocalStorage };

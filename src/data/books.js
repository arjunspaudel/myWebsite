let books = [
  { title: "1984", author: "George Orwell", year: 1949, pageCount: 328, wiki: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, pageCount: 285, wiki: "https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird" },
  // Add more books here
];

let currentlyReading = { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, pageCount: 180, wiki: "https://en.wikipedia.org/wiki/The_Great_Gatsby" };

const updateCurrentlyReading = (newBook) => {
  if (currentlyReading) {
    const isAlreadyInList = books.some(book => 
      book.title === currentlyReading.title && book.author === currentlyReading.author
    );
    
    if (!isAlreadyInList) {
      books.push(currentlyReading);
    }
  }
  
  currentlyReading = {...newBook, pageCount: parseInt(newBook.pageCount) || 0};
};

const getAllBooks = () => {
  return books;
};

export { getAllBooks, currentlyReading, updateCurrentlyReading };

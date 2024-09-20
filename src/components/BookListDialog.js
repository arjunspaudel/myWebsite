import React, { useState } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { getAllBooks, currentlyReading } from '../data/books';

const BookListDialog = ({ onClose }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const books = getAllBooks();

  const sortedBooks = React.useMemo(() => {
    let sortableBooks = [...books];
    if (sortConfig.key !== null) {
      sortableBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBooks;
  }, [books, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    return (
      <div className="flex flex-col">
        <FaSortUp className={sortConfig.key === key && sortConfig.direction === 'ascending' ? "text-orange-500" : "text-black"} />
        <FaSortDown className={sortConfig.key === key && sortConfig.direction === 'descending' ? "text-orange-500" : "text-black"} />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b">
          <h2 className="text-xl font-semibold mb-2">All Books</h2>
          
          {currentlyReading && (
            <div className="mb-2 p-2 bg-yellow-100 rounded text-sm">
              <h3 className="font-semibold">Currently Reading:</h3>
              <a 
                href={currentlyReading.wiki} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {currentlyReading.title} by {currentlyReading.author} ({currentlyReading.year}) - {currentlyReading.pageCount} pages
              </a>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="py-2 px-4 border-b cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Title</span>
                    {getSortIcon('title')}
                  </div>
                </th>
                <th className="py-2 px-4 border-b cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Author</span>
                    {getSortIcon('author')}
                  </div>
                </th>
                <th className="py-2 px-4 border-b cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Year</span>
                    {getSortIcon('year')}
                  </div>
                </th>
                <th className="py-2 px-4 border-b cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span>Pages</span>
                    {getSortIcon('pageCount')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book, index) => (
                <tr key={index}>
                  <td className="py-1 px-2 border-b">
                    <a 
                      href={book.wiki} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {book.title}
                    </a>
                  </td>
                  <td className="py-1 px-2 border-b">{book.author}</td>
                  <td className="py-1 px-2 border-b">{book.year}</td>
                  <td className="py-1 px-2 border-b">{book.pageCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookListDialog;

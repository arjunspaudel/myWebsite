import React, { useState } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const BookListDialog = ({ books, onClose }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">All Books</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('title')}
              >
                <div className="flex items-center justify-between">
                  <span>Title</span>
                  {getSortIcon('title')}
                </div>
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('author')}
              >
                <div className="flex items-center justify-between">
                  <span>Author</span>
                  {getSortIcon('author')}
                </div>
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('year')}
              >
                <div className="flex items-center justify-between">
                  <span>Year</span>
                  {getSortIcon('year')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book, index) => (
              <tr key={index}>
                <td className="py-1 px-2 border-b">{book.title}</td>
                <td className="py-1 px-2 border-b">{book.author}</td>
                <td className="py-1 px-2 border-b">{book.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookListDialog;

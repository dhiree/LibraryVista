import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdClose } from 'react-icons/md';
import BookModal from '../home/ BookModal'; // Import the BookModal component

function BookCard({ books }) {
    const [selectedBook, setSelectedBook] = useState(null);

    const handleOpenModal = (book) => {
        setSelectedBook(book);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book._id} className='relative border border-slate-600 rounded-md p-4'>
                            {/* Eye symbol at the top-right */}
                            <div className='absolute top-2 right-2 flex gap-2'>
                                <button onClick={() => handleOpenModal(book)}>
                                    <AiOutlineEye className='text-2xl text-blue-600' aria-label="View Details" />
                                </button>

                            </div>

                            <h2 className='text-xl font-semibold'>{book.title}</h2>
                            <p className='text-gray-600'>{book.author}</p>
                            <p className='text-gray-500'>{book.publishYear}</p>

                            {/* Operation buttons */}
                            <div className='flex justify-start gap-x-4 mt-4'>
                                <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center col-span-full'>No books available</p>
                )}
            </div>

            {/* Render the modal if a book is selected */}
            {selectedBook && (
                <BookModal book={selectedBook} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default BookCard;

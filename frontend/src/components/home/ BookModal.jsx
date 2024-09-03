// BookModal.js
import React from 'react';

function BookModal({ book, onClose }) {
    if (!book) return null;

    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg p-6 max-w-md w-full'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold'>{book.title}</h2>
                    <button onClick={onClose} className='text-red-600 text-2xl'>
                        &times;
                    </button>
                </div>
                <p className='text-gray-600'>{book.author}</p>
                <p className='text-gray-500'>{book.publishYear}</p>
                <p className='mt-4'>{book.description}</p>
            </div>
        </div>
    );
}

export default BookModal;

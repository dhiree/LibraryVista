import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


function DeleteBook() {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar()


    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to load the book details.");
                setLoading(false);
            });
    }, [id]);

    const handleDeleteBook = () => {
        if (window.confirm(`Are you sure you want to delete the book titled "${book.title}"?`)) {
            setLoading(true);
            setError(null);

            axios.delete(`http://localhost:3000/books/${id}`)
                .then(() => {
                    setLoading(false);
                    enqueueSnackbar('Book Deleted successfully', { variant: 'success' })

                    navigate('/home');
                })
                .catch((error) => {
                    console.log(error);
                    setError("Failed to delete the book.");
                    setLoading(false);
                });
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    {error && <p className='text-red-600 mb-4'>{error}</p>}
                    {book && (
                        <>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Title:</span>
                                <span>{book.title}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Author:</span>
                                <span>{book.author}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
                                <span>{book.publishYear}</span>
                            </div>
                            <button
                                onClick={handleDeleteBook}
                                className='bg-red-600 text-white px-4 py-2 rounded-md'
                            >
                                Delete Book
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default DeleteBook;

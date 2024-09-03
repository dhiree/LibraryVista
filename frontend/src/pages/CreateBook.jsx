import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


function CreateBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSaveBook = () => {
        const data = { title, author, publishYear };

        setLoading(true);
        setError(null); // Reset any previous error

        axios.post('http://localhost:3000/books', data)
            .then((response) => {
                setLoading(false);
                enqueueSnackbar('Book Created successfully', { variant: 'success' })
                navigate('/home');
            })
            .catch((error) => {
                enqueueSnackbar('Error', { variant: 'error' })

                console.log(error);
                setLoading(false);
            });
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create New Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
                    {error && <p className='text-red-600 mb-4'>{error}</p>}
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Title</label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Author</label>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                        <input
                            type='text'
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className='border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <button
                        onClick={handleSaveBook}
                        className='bg-blue-600 text-white px-4 py-2 rounded-md'
                    >
                        Save Book
                    </button>
                </div>
            )}
        </div>
    )
}

export default CreateBook;

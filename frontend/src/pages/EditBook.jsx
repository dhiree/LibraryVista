import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


function EditBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar()


    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3000/books/${id}`)
            .then((response) => {
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setTitle(response.data.title);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                setError("Failed to load the book data.");
            });
    }, [id]);

    const handleEditBook = () => {
        if (!title || !author || !publishYear) {
            setError("All fields are required.");
            return;
        }

        const data = { title, author, publishYear };
        setLoading(true);
        setError(null);

        axios.put(`http://localhost:3000/books/${id}`, data)
            .then((response) => {
                setLoading(false);
                enqueueSnackbar('Book Edited successfully', { variant: 'success' })

                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to save the book.");
                setLoading(false);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
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
                        onClick={handleEditBook}
                        className='bg-blue-600 text-white px-4 py-2 rounded-md'
                    >
                        Save Book
                    </button>
                </div>
            )}
        </div>
    );
}

export default EditBook;

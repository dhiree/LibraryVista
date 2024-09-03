import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../components/home/BookTable';
import BookCard from '../components/home/BookCard';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [view, setView] = useState('table'); // New state to manage the view
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/books')
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching books:", error);
                setError("Failed to fetch books.");
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('authToken');
        // Redirect to login page
        navigate('/user/login');
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Book List</h1>
                <div>
                    <button
                        onClick={handleLogout}
                        className='px-4 py-2 bg-red-600 text-white rounded-md'
                    >
                        Logout
                    </button>
                </div>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' aria-label="Add Book" />
                </Link>
            </div>
            {/* Centered Button Container */}
            <div className='flex justify-center mb-4'>
                <button
                    onClick={() => setView('table')}
                    className={`px-4 py-2 mr-2 rounded-md ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                >
                    Table View
                </button>
                <button
                    onClick={() => setView('card')}
                    className={`px-4 py-2 rounded-md ${view === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                >
                    Card View
                </button>
            </div>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p className='text-red-600'>{error}</p>
            ) : (
                view === 'table' ? (
                    <BookTable books={books} />
                ) : (
                    <BookCard books={books} />
                )
            )}
        </div>
    );
}

export default Home;

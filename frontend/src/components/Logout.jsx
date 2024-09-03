// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem('authToken');
        // Redirect to login page
        navigate('/user/login');
    };

    return (
        <button onClick={handleLogout} className='px-4 py-2 bg-red-600 text-white rounded-md'>
            Logout
        </button>
    );
};

export default Logout;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout'; // Import the Logout component

const App = () => {
  return (
    <Routes>
      {/* Redirect root path to the registration page */}
      <Route path="/" element={<Navigate to="/user/register" />} />

      {/* User routes */}
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/logout" element={<Logout />} /> {/* Add the logout route */}

      {/* Book-related routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
};

export default App;

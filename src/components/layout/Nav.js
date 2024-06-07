// src/components/layout/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between">
      <div className="text-white">
        <Link to="/">Home</Link>
        <Link to="/about" className="ml-4">About</Link>
        <Link to="/profile" className="ml-4">Profile</Link>
        <Link to="/contact" className="ml-4">Contact</Link>
      </div>
    </div>
  </nav>
);

export default Nav;

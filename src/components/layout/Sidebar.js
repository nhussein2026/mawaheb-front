// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/student-report', label: 'Student Report' },
    { to: '/courses', label: 'Courses' },
    { to: '/events', label: 'Events' },
    { to: '/tickets', label: 'Tickets' },
    { to: '/notes', label: 'Notes' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/certificates', label: 'Certificates' },
  ];

  return (
    <aside className={`w-64 bg-lightGray p-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
      <button
        className="md:hidden p-2 bg-darkGray text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <ul>
        {links.map((link) => (
          <li key={link.to} className="mb-4">
            <Link to={link.to} className="text-darkGray hover:text-gold">{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

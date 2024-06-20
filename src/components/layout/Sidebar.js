// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/student/report', label: 'Student Report' },
    { to: '/student/courses', label: 'Courses' },
    { to: '/student/events', label: 'Events' },
    { to: '/student/tickets', label: 'Tickets' },
    { to: '/notes', label: 'Notes' },
    { to: '/student/achievements', label: 'Achievements' },
    { to: '/student/certificates', label: 'Certificates' },
    { to: '/student/difficulties', label: 'difficulties' },
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

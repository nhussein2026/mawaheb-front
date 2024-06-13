import React from 'react';

const Footer = () => (
  <footer style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#791313' }} className="p-4 text-center text-white">
    <p>Developed by <a href="http://nhussein.io" target="_blank" rel="noopener noreferrer" style={{ color: '#D49129', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#EAB860'} onMouseOut={(e) => e.currentTarget.style.color = '#D49129'}>nhussein.io</a></p>
  </footer>
);

export default Footer;

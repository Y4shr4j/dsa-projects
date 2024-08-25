import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header w-full bg-blue-600 text-white flex justify-between items-center px-6">
      <div className="header-logo text-3xl font-bold">
        <Link to="/" className="text-white no-underline">yashra4j</Link>
      </div>
      <nav className="header-nav text-lg">
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-white hover:underline">Home</Link></li>
          <li><Link to="/about" className="text-white hover:underline">About</Link></li>
          <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

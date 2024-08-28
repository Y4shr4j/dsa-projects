import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Header />
      <div className="home-buttons grid grid-cols-4 gap-4 p-8 flex-grow">
        <Link to="/pathfinding" className="tile">Pathfinding Visualizer</Link>
        <Link to="/sudoku" className="tile">Sudoku Solver</Link>
        <Link to="/visualizer" className="tile">N Queen Visualizer</Link>
        <Link to="/tree" className="tile">Tree Visualizer</Link>
        <Link to="/tic-tac-toe" className="tile">Tic Tac Toe</Link>
        <Link to="/sort" className="tile">Sorting Visualizer</Link>
      </div>
    </div>
  );
}

export default HomePage;

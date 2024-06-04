// src/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
// import SudokuSolver from './sudokuSolver/App';

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>yashra4j</h1>
        <h3>Welcome to the Visualizer</h3>
        <p>Select a visualizer to start</p>
        <div className="home-buttons">
          <Link to="/pathfinding" className="home-button m-3">Pathfinding Visualizer</Link>
        </div>
        <div className="home-buttons">
          <Link to="/sudoku" className="home-button m-3">Sudoku Solver</Link>
        </div>
        <div className="home-buttons">
          <Link to="/visualizer" className="home-button m-3">N Queen Visualizer</Link>
        </div>
        <div className="home-buttons">
          <Link to="/tree" className="home-button m-3">Tree Visualizer</Link>
        </div>

        
      </header>
    </div>
  );
}

export default HomePage;

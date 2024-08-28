// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';
import NQueenVisualizer from './components/NQueensVisualizer/App.js';
import HomePage from './components/HomePage';
import TreeVisualizer from './components/TreeVisualizer/App.jsx';
import SudokuSolver from './components/sudokuSolver/App';
import TicTacToe from './components/tictactoe/tictactoe.jsx';
import SortingVisualizer from './components/sorting/App.js';
import Contact from './components/contact.jsx';
import About from './components/about.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          <Route path="/visualizer" element={<NQueenVisualizer />} />
          <Route path="/sudoku" element={<SudokuSolver />} />
          <Route path="/Tree" element={<TreeVisualizer />} />
          <Route path="/sort" element={<SortingVisualizer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

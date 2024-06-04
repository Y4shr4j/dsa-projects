// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';
import NQueenVisualizer from './components/NQueensVisualizer/App.jsx';
import HomePage from './components/HomePage';
import TreeVisualizer from './components/TreeVisualizer/App.jsx';
import SudokuSolver from './components/sudokuSolver/App';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          <Route path="/visualizer" element={<NQueenVisualizer />} />
          <Route path="/sudoku" element={<SudokuSolver />} />
          <Route path="/Tree" element={<TreeVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import SudokuBoard from './SudokuBoard';
import './App.css';

const App = () => {
  return (
    <div id="container">
      <h1>Sudoku Solver</h1>
      <SudokuBoard />
    </div>
  );
}

export default App;

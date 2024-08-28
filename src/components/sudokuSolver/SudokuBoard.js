import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SudokuSolver from './SudokuSolver';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array(81).fill(''));
  const [userInputs, setUserInputs] = useState(Array(81).fill(false));

  const handleInputChange = (index, value) => {
    const validNum = /^[1-9]$/;
    if (value === '' || validNum.test(value)) {
      const newBoard = [...board];
      const newUserInputs = [...userInputs];
      newBoard[index] = value;
      newUserInputs[index] = value !== '';
      setBoard(newBoard);
      setUserInputs(newUserInputs);
    }
  };

  const handleSolve = () => {
    const boardString = board.map(cell => cell || '-').join('');
    const solution = SudokuSolver.solve(boardString);
    if (solution) {
      const newBoard = solution.split('');
      setBoard(newBoard);
    } else {
      alert('Invalid board!');
    }
  };

  const handleClear = () => {
    setBoard(Array(81).fill(''));
    setUserInputs(Array(81).fill(false));
  };

  return (
    <div>
      <table id="sudoku-board">
        <tbody>
          {[...Array(9)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(9)].map((_, colIndex) => {
                const cellIndex = rowIndex * 9 + colIndex;
                return (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={board[cellIndex]}
                      onChange={(e) => handleInputChange(cellIndex, e.target.value)}
                      maxLength="1"
                      className={userInputs[cellIndex] ? 'user-input' : ''}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleSolve}>Solve!</button>
      </div>
      <div>
        <button onClick={handleClear}>Clear board</button>
      </div>
        <h1>

          <Link 
              to="/" 
              className="inline-block mt-6 text-blue-500 text-lg font-bold hover:underline"
            >
              Back to Home
            </Link>
        </h1>
    </div>
  );
};

export default SudokuBoard;

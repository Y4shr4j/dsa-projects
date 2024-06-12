import React, { useState, useEffect } from 'react';
import './tictactoe.css';

const COMPUTER = 'O';
const HUMAN = 'X';
const SIDE = 3;

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  return (
    <div>
      <div className="board-row">
        {squares.slice(0, 3).map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((square, i) => (
          <Square key={i + 3} value={square} onClick={() => onClick(i + 3)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(6, 9).map((square, i) => (
          <Square key={i + 6} value={square} onClick={() => onClick(i + 6)} />
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function minimax(squares, depth, isMaximizing) {
  const winner = calculateWinner(squares);
  if (winner === COMPUTER) return { score: 10 - depth };
  if (winner === HUMAN) return { score: depth - 10 };
  if (!squares.includes(null)) return { score: 0 };

  if (isMaximizing) {
    let bestScore = -Infinity;
    let move = -1;
    squares.forEach((square, i) => {
      if (!square) {
        squares[i] = COMPUTER;
        const { score } = minimax(squares, depth + 1, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });
    return { score: bestScore, move };
  } else {
    let bestScore = Infinity;
    let move = -1;
    squares.forEach((square, i) => {
      if (!square) {
        squares[i] = HUMAN;
        const { score } = minimax(squares, depth + 1, true);
        squares[i] = null;
        if (score < bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });
    return { score: bestScore, move };
  }
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = HUMAN;
    setSquares(nextSquares);
    setIsNext(false);
  };

  useEffect(() => {
    if (!isNext && !calculateWinner(squares) && squares.includes(null)) {
      const { move } = minimax(squares.slice(), 0, true);
      if (move !== -1) {
        const nextSquares = squares.slice();
        nextSquares[move] = COMPUTER;
        setSquares(nextSquares);
        setIsNext(true);
      }
    }
  }, [isNext, squares]);

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsNext(true);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (isNext ? HUMAN : COMPUTER);
  }

  return (
    <div className="game">
      <div className="game-info">
        <div className="status">{status}</div>
        <div className="separator"></div>
      </div>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <button className="reset-button" onClick={handleReset}>Clear Board</button>
    </div>
  );
}

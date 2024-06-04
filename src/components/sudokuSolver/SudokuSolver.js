const SudokuSolver = (function() {
    function solve(boardString) {
      const boardArray = boardString.split('');
      if (boardIsInvalid(boardArray)) {
        return false;
      }
      return recursiveSolve(boardString);
    }
  
    function recursiveSolve(boardString) {
      const boardArray = boardString.split('');
      if (boardIsSolved(boardArray)) {
        return boardArray.join('');
      }
      const { index, choices } = getNextCellAndPossibilities(boardArray);
      for (const choice of choices) {
        boardArray[index] = choice;
        const solvedBoard = recursiveSolve(boardArray.join(''));
        if (solvedBoard) {
          return solvedBoard;
        }
      }
      return false;
    }
  
    function boardIsInvalid(boardArray) {
      return !boardIsValid(boardArray);
    }
  
    function boardIsValid(boardArray) {
      return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
    }
  
    function boardIsSolved(boardArray) {
      return boardArray.every(cell => cell !== '-');
    }
  
    function getNextCellAndPossibilities(boardArray) {
      for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === '-') {
          const existingValues = getAllIntersections(boardArray, i);
          const choices = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].filter(num => !existingValues.includes(num));
          return { index: i, choices };
        }
      }
      return {};
    }
  
    function getAllIntersections(boardArray, i) {
      return [...getRow(boardArray, i), ...getColumn(boardArray, i), ...getBox(boardArray, i)];
    }
  
    function allRowsValid(boardArray) {
      return [0, 9, 18, 27, 36, 45, 54, 63, 72].every(i => collectionIsValid(getRow(boardArray, i)));
    }
  
    function getRow(boardArray, i) {
      const start = Math.floor(i / 9) * 9;
      return boardArray.slice(start, start + 9);
    }
  
    function allColumnsValid(boardArray) {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(i => collectionIsValid(getColumn(boardArray, i)));
    }
  
    function getColumn(boardArray, i) {
      const start = i % 9;
      return Array.from({ length: 9 }, (_, j) => boardArray[start + j * 9]);
    }
  
    function allBoxesValid(boardArray) {
      return [0, 3, 6, 27, 30, 33, 54, 57, 60].every(i => collectionIsValid(getBox(boardArray, i)));
    }
  
    function getBox(boardArray, i) {
      const boxCol = Math.floor(i / 3) % 3;
      const boxRow = Math.floor(i / 27);
      const start = boxCol * 3 + boxRow * 27;
      return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(num => boardArray[start + num]);
    }
  
    function collectionIsValid(collection) {
      const numCounts = {};
      for (const num of collection) {
        if (num !== '-' && numCounts[num]) {
          return false;
        }
        numCounts[num] = true;
      }
      return true;
    }
  
    return { solve };
  })();
  
  export default SudokuSolver;
  
import React, { useState } from 'react';
import './style.css'; // Assuming you have the CSS file in the same directory

function NQueenVisualiser() {
  const [totalQueens, setTotalQueens] = useState('');
  const [sliderValue, setSliderValue] = useState(60);

  const handleInputChange = (e) => {
    setTotalQueens(e.target.value);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handlePlayButtonClick = async () => {
    const numberbox = document.getElementById("numberbox");
    const n = parseInt(numberbox.value, 10);

    if (n > 8) {
        numberbox.value = "";
        alert("Queen value is too large");
        return;
    } else if (n < 1) {
        numberbox.value = "";
        alert("Queen value is too small");
        return;
    }

    let { speed, tempSpeed, q, Board, array, pos } = initializeVariables();

    // Check if q object is properly initialized
    if (!q) {
        console.error("Error: 'q' object is not properly initialized");
        return;
    }

    // Check if q object has the uuid property
    if (!q.uuid) {
        console.error("Error: 'uuid' property is not found in 'q' object");
        return;
    }
    speed = (100 - sliderValue) * 10;
    tempSpeed = speed;

    const chessBoard = document.getElementById("n-queen-board");
    const arrangement = document.getElementById("queen-arrangement");

    while (chessBoard.hasChildNodes()) {
        chessBoard.removeChild(chessBoard.firstChild);
    }
    if (arrangement.hasChildNodes()) {
        arrangement.removeChild(arrangement.lastChild);
    }

    const para = document.createElement("p");
    para.setAttribute("class", "queen-info");
    para.innerHTML = `For ${n}x${n} board, ${array[n] - 1} arrangements are possible.`;
    arrangement.appendChild(para);

    if (chessBoard.childElementCount === 0) {
        for (let i = 0; i < array[n]; ++i) {
            q.uuid.push(Math.random());
            let div = document.createElement('div');
            let table = document.createElement('table');
            let header = document.createElement('h4');
            header.innerHTML = `Board ${i + 1}`;
            table.setAttribute("id", `table-${q.uuid[i]}`);
            header.setAttribute("id", `paragraph-${i}`);
            chessBoard.appendChild(div);
            div.appendChild(header);
            div.appendChild(table);
        }
    }

    for (let k = 0; k < array[n]; ++k) {
        let table = document.getElementById(`table-${q.uuid[k]}`);
        for (let i = 0; i < n; ++i) {
            const row = table.insertRow(i);
            row.setAttribute("id", `Row${i}`);
            for (let j = 0; j < n; ++j) {
                const col = row.insertCell(j);
                (i + j) & 1
                    ? (col.style.backgroundColor = "#FF9F1C")
                    : (col.style.backgroundColor = "#FCCD90");
                col.innerHTML = "-";
                col.style.border = "0.3px solid #373f51";
            }
        }
        await q.clearColor(k);
    }
    await q.nQueen();
  };

  const initializeVariables = () => {
    const numberbox = document.getElementById("numberbox");
    const slider = document.getElementById("slider");
    const progressBar = document.getElementById("progress-bar");
    const playButton = document.getElementById('play-button');

    const queen = '<i class="fas fa-chess-queen" style="color:#000"></i>';

    let n, speed, tempSpeed, q, Board = 0;
    let array = [0, 2, 1, 1, 3, 11, 5, 41, 93];
    let pos = {};

    speed = (100 - slider.value) * 10;
    tempSpeed = speed;

    slider.oninput = function () {
        progressBar.style.width = this.value + "%";
        speed = (100 - slider.value) * 10;
    };

    class Queen {
        constructor() {
            this.position = { ...pos };
            this.uuid = [];
        }

        nQueen = async () => {
            Board = 0;
            this.position[`${Board}`] = {};
            numberbox.disabled = true;
            await this.solveQueen(Board, 0, n);
            await this.clearColor(Board);
            numberbox.disabled = false;
        };

        isValid = async (board, r, col, n) => {
            const table = document.getElementById(`table-${this.uuid[board]}`);
            const currentRow = table.firstChild.childNodes[r];
            const currentColumn = currentRow.getElementsByTagName("td")[col];
            currentColumn.innerHTML = queen;
            await this.delay();

            for (let i = r - 1; i >= 0; --i) {
                const row = table.firstChild.childNodes[i];
                const column = row.getElementsByTagName("td")[col];
                const value = column.innerHTML;
                if (value === queen) {
                    column.style.backgroundColor = "#FB5607";
                    currentColumn.innerHTML = "-";
                    return false;
                }
                column.style.backgroundColor = "#ffca3a";
                await this.delay();
            }

            for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
                const row = table.firstChild.childNodes[i];
                const column = row.getElementsByTagName("td")[j];
                const value = column.innerHTML;
                if (value === queen) {
                    column.style.backgroundColor = "#fb5607";
                    currentColumn.innerHTML = "-";
                    return false;
                }
                column.style.backgroundColor = "#ffca3a";
                await this.delay();
            }

            for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
                const row = table.firstChild.childNodes[i];
                const column = row.getElementsByTagName("td")[j];
                const value = column.innerHTML;
                if (value === queen) {
                    column.style.backgroundColor = "#FB5607";
                    currentColumn.innerHTML = "-";
                    return false;
                }
                column.style.backgroundColor = "#ffca3a";
                await this.delay();
            }

            return true;
        };

        clearColor = async (board) => {
            for (let j = 0; j < n; ++j) {
                const table = document.getElementById(`table-${this.uuid[board]}`);
                const row = table.firstChild.childNodes[j];
                for (let k = 0; k < n; ++k) {
                    (j + k) & 1
                        ? (row.getElementsByTagName("td")[k].style.backgroundColor = "#FF9F1C")
                        : (row.getElementsByTagName("td")[k].style.backgroundColor = "#FCCD90");
                }
            }
        };

        delay = async () => {
            await new Promise((done) => setTimeout(() => done(), speed));
        };

        solveQueen = async (board, r, n) => {
            if (r === n) {
                ++Board;
                let table = document.getElementById(`table-${this.uuid[Board]}`);
                for (let k = 0; k < n; ++k) {
                    let row = table.firstChild.childNodes[k];
                    row.getElementsByTagName("td")[this.position[board][k]].innerHTML = queen;
                }
                this.position[Board] = this.position[board];
                return;
            }

            for (let i = 0; i < n; ++i) {
                await this.delay();
                await this.clearColor(board);
                if (await this.isValid(board, r, i, n)) {
                    await this.delay();
                    await this.clearColor(board);
                    let table = document.getElementById(`table-${this.uuid[board]}`);
                    let row = table.firstChild.childNodes[r];
                    row.getElementsByTagName("td")[i].innerHTML = queen;
                    this.position[board][r] = i;

                    if (await this.solveQueen(board, r + 1, n))
                        await this.clearColor(board);

                    await this.delay();
                    board = Board;
                    table = document.getElementById(`table-${this.uuid[board]}`);
                    row = table.firstChild.childNodes[r];
                    row.getElementsByTagName("td")[i].innerHTML = "-";
                    delete this.position[`${board}`][`${r}`];
                }
            }
        };
    }

    q = new Queen();

    // Return all necessary variables
    return { speed, tempSpeed, q, Board, array, pos };
};

  return (
    <div>
      <header className="header">
        <h2>
          N-Queens Visualiser{' '}
          <i className="fas fa-crown" style={{ color: '#fdfffc' }}></i>
        </h2>
      </header>
      <div className="n-queen">
        <div className="inputbox">
          <input
            type="number"
            className="numberbox"
            id="numberbox"
            value={totalQueens}
            onChange={handleInputChange}
            required
          />
          <label>Enter total Queens</label>
        </div>

        <div className="slider-container">
          <input
            className="slider"
            id="slider"
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <div id="progress-bar"></div>
        </div>
        <button className="play-button" onClick={handlePlayButtonClick}>
          <i className="fa fa-play" aria-hidden="true"></i> Play
        </button>
      </div>

      <div className="queen-arrangement" id="queen-arrangement"></div>
      <div id="n-queen-board"></div>
    </div>
  );
}

export default NQueenVisualiser;

import React, { useState } from "react";
import "./App.css";

/**
 * Tic-Tac-Toe square component.
 * @param {object} props
 * @returns {JSX.Element}
 */
// PUBLIC_INTERFACE
function Square({ value, onClick }) {
  /** This is a public square render function. */
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      aria-label={value ? `Cell: ${value}` : "Empty cell"}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

/**
 * 3x3 Tic-Tac-Toe board component.
 * @param {object} props
 * @returns {JSX.Element}
 */
// PUBLIC_INTERFACE
function Board({ squares, onSquareClick }) {
  /** This renders a 3x3 tic tac toe grid */
  return (
    <div className="ttt-board">
      {squares.map((row, rowIdx) => (
        <div key={rowIdx} className="ttt-board-row">
          {row.map((cell, colIdx) => (
            <Square
              key={`${rowIdx}-${colIdx}`}
              value={cell}
              onClick={() => onSquareClick(rowIdx, colIdx)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Determines the winner of the Tic-Tac-Toe game, or checks for draw.
 * @param {Array<Array<string|null>>} squares
 * @returns {'X'|'O'|'draw'|null}
 */
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /**
   * This function checks rows, columns and diagonals for a win.
   * Returns 'X' or 'O' if there's a winner, 'draw' if full and no winner, or null.
   */
  const lines = [
    // rows
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    // cols
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    // diagonals
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    const v = squares[a[0]][a[1]];
    if (v && v === squares[b[0]][b[1]] && v === squares[c[0]][c[1]]) {
      return v;
    }
  }
  const isFull = squares.every(row => row.every(cell => cell));
  if (isFull) return "draw";
  return null;
}

/**
 * Hook provides initial empty 3x3 matrix.
 */
function getInitialBoard() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

/**
 * Main App component for Tic-Tac-Toe game.
 * @returns {JSX.Element}
 */
// PUBLIC_INTERFACE
export default function App() {
  /** This is the entry point for the Tic-Tac-Toe frontend React application. */
  const [squares, setSquares] = useState(getInitialBoard());
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(squares);

  /**
   * Handles a user click on the board cell.
   * @param {number} row 
   * @param {number} col 
   */
  // PUBLIC_INTERFACE
  function handleSquareClick(row, col) {
    if (winner || squares[row][col]) {
      // Do nothing if game over or cell already filled
      return;
    }
    // Clone current board
    const nextSquares = squares.map(r => r.slice());
    nextSquares[row][col] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXisNext(!xIsNext);
  }

  /**
   * Reset the game to the initial empty state.
   */
  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(getInitialBoard());
    setXisNext(true);
  }

  // Determine game status message
  let status;
  if (winner === "draw") {
    status = "Draw! No winner.";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next turn: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="tic-tac-toe-app">
      <h1 className="ttt-title" aria-label="Tic Tac Toe Game">Tic Tac Toe</h1>
      <div className="ttt-status" aria-live="polite">{status}</div>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <button
        className="ttt-reset-btn"
        onClick={handleReset}
        aria-label="Reset game"
        type="button"
      >
        {winner ? "Replay" : "Reset"}
      </button>
      <footer className="ttt-footer">
        <span>
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="ttt-footer-link">
            Built with React
          </a>
        </span>
      </footer>
    </div>
  );
}

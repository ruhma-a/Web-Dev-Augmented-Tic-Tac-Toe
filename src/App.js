import { useState } from 'react';

// Added isWinningSquare prop to highlight winning cells
function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button 
            className={`square ${isWinningSquare ? 'winning-square' : ''}`} 
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) { 
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        // Pass the index `i` along with nextSquares so we can track the row/col location
        onPlay(nextSquares, i);
    }

    const winInfo = calculateWinner(squares);
    const winner = winInfo?.winner;
    const winningLine = winInfo?.line || [];

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (!squares.includes(null)) {
        status = "Draw!"; // Draw condition
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }

    // Rewrite Board to use two loops to make the squares
    const boardSize = 3;
    let boardRows = [];
    for (let row = 0; row < boardSize; row++) {
        let rowSquares = [];
        for (let col = 0; col < boardSize; col++) {
            const index = row * boardSize + col;
            rowSquares.push(
                <Square 
                    key={index}
                    value={squares[index]} 
                    onSquareClick={() => handleClick(index)} 
                    isWinningSquare={winningLine.includes(index)}
                />
            );
        }
        boardRows.push(<div key={row} className="board-row">{rowSquares}</div>);
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardRows}
        </>
    );
}

export default function Game() {
    // History now stores an object containing the board array AND the location of the move
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true); // Toggle sort state

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares, moveLocation) {
        // Immutability: Using spread and slice to copy arrays instead of mutating
        const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location: moveLocation }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((step, move) => {
        let description;
        if (move > 0) {
            // Calculate row and col (1-indexed for better readability)
            const row = Math.floor(step.location / 3) + 1;
            const col = (step.location % 3) + 1;
            description = `Go to move #${move} (row: ${row}, col: ${col})`;
        } else {
            description = 'Go to game start';
        }

        // Show text instead of button for the current move
        if (move === currentMove) {
            return <li key={move}>You are at move #{move}</li>;
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    // Create a copy of the array before reversing it to maintain immutability 
    const displayedMoves = isAscending ? moves : [...moves].reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={() => setIsAscending(!isAscending)}>
                    Sort: {isAscending ? "Ascending" : "Descending"}
                </button>
                <ol>{displayedMoves}</ol>
            </div>
        </div>
    );
}

// Updated to return an object with both the winner and the winning line array
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}
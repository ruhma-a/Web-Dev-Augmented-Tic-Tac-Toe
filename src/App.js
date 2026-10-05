import { useState } from 'react';

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
        onPlay(nextSquares, i);
    }

    const winInfo = calculateWinner(squares);
    const winner = winInfo?.winner;
    const winningLine = winInfo?.line || [];

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (!squares.includes(null)) {
        status = "Draw!"; 
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }

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
            <div className="board-container">
                {boardRows}
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isAscending, setIsAscending] = useState(true);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove].squares;

    function handlePlay(nextSquares, moveLocation) {
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
            const row = Math.floor(step.location / 3) + 1;
            const col = (step.location % 3) + 1;
            description = `Go to move #${move} (row: ${row}, col: ${col})`;
        } else {
            description = 'Go to game start';
        }

        if (move === currentMove) {
            return <li key={move} className="current-move">You are at move #{move}</li>;
        }

        return (
            <li key={move}>
                <button className="history-btn" onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    const displayedMoves = isAscending ? moves : [...moves].reverse();

    return (
        <div className="page-container">
            <div className="pretty-sidebar left">
                <img src="https://i.pinimg.com/736x/df/e1/fe/dfe1fe83a796c6d056b2976ba9c48d75.jpg" alt="Floral purple" className="cute-photo" />
            </div>

            <div className="game-wrapper">
                <h1 className="site-title">✨ Relax with Tic Tac Toe ✨</h1>
                    
                <div className="cute-audio-player">
                    <p className="audio-label">🌿 Relaxing Garden Sounds 🌿</p>
                    <iframe 
                        width="250" 
                        height="140" 
                        src="https://www.youtube.com/embed/UZ9uyQI3pF0" 
                        title="Relaxing Sounds" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{ border: "2px dashed #937b9e", borderRadius: "10px" }}>
                    </iframe>
                </div>

                <div className="game">
                    <div className="game-board">
                        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    </div>
                    <div className="game-info">
                        <button className="toggle-btn" onClick={() => setIsAscending(!isAscending)}>
                            Sort: {isAscending ? "Ascending 🌿" : "Descending 🍂"}
                        </button>
                        <ol>{displayedMoves}</ol>
                    </div>
                </div>
            </div>

            <div className="pretty-sidebar right">
                <img src="https://i.pinimg.com/originals/30/49/c6/3049c6010a2f4178a4e91428996aa870.png" alt="cutie lilac bows" className="cute-photo" />
                <img src="https://i.pinimg.com/736x/1d/e7/57/1de75741f259810db2f3a051dd12e6f4.jpg" alt="Purple kitty" className="cute-photo" />
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

const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const winningMessage = () => "Player 1 has won!";
const drawMessage = () => "Gamae Ended in a Draw !";
const currentPlayerTurn = () => "It's Player 2's turn";

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
   /*
   Horizontal
   */
   [0, 1, 2, 3],
   [4, 5, 6, 7],
   [8, 9, 10, 11],
   [12, 13, 14, 15],
   /*
   Vertical
   */
   [0, 4, 8, 12],
   [1, 5, 9, 13],
   [2, 6, 10, 14],
   [3, 7, 11, 15],
   /*
   Diagonal Vertical
   */
   [0, 5, 10, 15],
   [3, 6, 9, 12],
   [12, 9, 6, 3],
   [15, 10, 5, 0],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 8; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        let d = gameState[winCondition[3]];
        if (a === '' || b === '' || c === '' || d == '') {
            continue;
        }
        if (a === b && b === c && c === d) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
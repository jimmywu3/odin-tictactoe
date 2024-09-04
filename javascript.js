//Gameboard object will store an array
const board = (function(){
    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]
    const getBoard = () => board;

    const modifyBoard = (row, col, symbol) => {
        board[row][col] = symbol;
    }

    const clearBoard = () => {
        for(let i = 0; i < board.length; ++i){
            for(let j = 0; j < board[i].length; ++j){
                board[i][j] = 0;
            }
        }
    };

    const printBoard = () => {
        let rtnMsg = "";
        for(let i = 0; i < board.length; ++i){
            for(let j = 0; j < board[i].length; ++j){
                rtnMsg += board[i][j];
            }
            rtnMsg += "\n";
        }
        console.log(rtnMsg);
    }

    const checkBoard = (symbol) => {
        if(board[0][0] == symbol && board[1][0] == symbol && board[2][0] == symbol ||
           board[0][1] == symbol && board[1][1] == symbol && board[2][1] == symbol ||
           board[0][2] == symbol && board[1][2] == symbol && board[2][2] == symbol ||
           board[0][0] == symbol && board[0][1] == symbol && board[0][2] == symbol ||
           board[1][0] == symbol && board[1][1] == symbol && board[1][2] == symbol ||
           board[2][0] == symbol && board[2][1] == symbol && board[2][2] == symbol ||
           board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol ||
           board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol)
           {
            return true;
        }  
        return false;
    }

    return{getBoard, modifyBoard, clearBoard, printBoard, checkBoard};
})();

//players will have a name and symbol
const Player = function(name, symbol){
    return {name, symbol}
}

//gameController
// No need to check if row / col is within array length since on html they wont see
// focus on getting a win con

const GameController = (function(){
    const players = [
        Player("player1", "1"), 
        Player("player2", "2")
    ]

    let currentPlayer = players[0];

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === players[0])? players[1] : players[0];
    }

    const getCurrentPlayer = () => currentPlayer;

    const status = document.querySelector(".status");
    const history = document.querySelector(".moveHistory");

    const printNewRound = () => {
        board.printBoard();
        console.log(`Currently ${getCurrentPlayer().name}'s turn...`);
        status.textContent = `Currently ${getCurrentPlayer().name}'s turn...`;
    }

    const playRound = (row, col) => {
        if(board.getBoard()[row][col] == 0){
            console.log(`${getCurrentPlayer().name} places symbol at row: ${row} and col: ${col}.`);
            history.textContent = `${getCurrentPlayer().name} places symbol at row: ${row} and col: ${col}.`;
            board.modifyBoard(row, col, getCurrentPlayer().symbol);
            //do check here for win con
            if(board.checkBoard(getCurrentPlayer().symbol)){
                board.printBoard();
                console.log(`Congrats ${getCurrentPlayer().name}, You Won!`); 
                status.textContent = `Congrats ${getCurrentPlayer().name}, You Won!`;
            }else{
                switchPlayer();
                printNewRound();
            }
        } else {
            console.log(`Row: ${row} and Col: ${col} is already filled please pick again`)
            history.textContent = `Row: ${row} and Col: ${col} is already filled please pick again`;
        }
    }

    printNewRound();

    return {playRound, getCurrentPlayer};
})();

const DisplayController = (function(){
    const assignButtons = () => {
        const buttons = document.querySelectorAll(".board button");
        const status = document.querySelector(".status");
        buttons.forEach((button) => {
            const position = button.className.split(",");
            button.addEventListener("click", () => {
                if(board.getBoard()[position[0]][position[1]] == 0 && !(board.checkBoard(GameController.getCurrentPlayer().symbol))){
                    button.textContent = GameController.getCurrentPlayer().symbol;
                    GameController.playRound(position[0], position[1]);
                }
            })
        });
    }
    assignButtons();

})();


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
        return true;
    }

    return{getBoard, modifyBoard, clearBoard, printBoard, checkBoard};
})();

//players will have a name and symbol
const Player = function(name, symbol){
    return {name, symbol}
}

//gameController
// No need to check if row / col is within array lenght since on html they wont see
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

    const printNewRound = () => {
        board.printBoard();
        console.log(`Currently ${getCurrentPlayer().name}'s turn...`);
    }

    const playRound = (row, col) => {
        console.log(`${getCurrentPlayer().name} places symbol at row: ${row} and col: ${col}.`);

        board.modifyBoard(row, col, getCurrentPlayer().symbol);

        //do check here for win con
        if(board.checkBoard(getCurrentPlayer().symbol)){
            board.printBoard();
            console.log(`Congrats ${getCurrentPlayer.name}, You Won!`);
        }else{
            switchPlayer();
            printNewRound();
        }
    }

    printNewRound();

    return {playRound, getCurrentPlayer};
})();




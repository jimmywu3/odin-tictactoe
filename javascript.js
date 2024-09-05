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
        Player("player1", "X"), 
        Player("player2", "O")
    ]

    const getPlayers = () => players;

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

    return {playRound, switchPlayer, getCurrentPlayer, getPlayers};
})();

const DisplayController = (function(){
    const buttons = document.querySelectorAll(".board button");

    buttons.forEach((button) => {
        const position = button.className.split(",");
        button.addEventListener("click", () => {
            if(board.getBoard()[position[0]][position[1]] == 0 && !(board.checkBoard(GameController.getCurrentPlayer().symbol))){
                button.textContent = GameController.getCurrentPlayer().symbol;
                GameController.playRound(position[0], position[1]);
                button.style["color"] = "black";
            }
        })

        button.addEventListener("mouseover", () => {
            console.log("hi")
            if(board.getBoard()[position[0]][position[1]] == 0 && !(board.checkBoard(GameController.getCurrentPlayer().symbol))){
                button.textContent = GameController.getCurrentPlayer().symbol;
                button.style["color"] = "rgba(0,0,0, 0.5)";
            }
        })

        button.addEventListener("mouseout", () => {
            console.log("bye")
            if(board.getBoard()[position[0]][position[1]] == 0 && !(board.checkBoard(GameController.getCurrentPlayer().symbol))){
            button.textContent = "";
            button.style["color"] = "black";
            }
        })
    });

    const status = document.querySelector(".status");
    const clearButton = document.querySelector(".reset");
    const history = document.querySelector(".moveHistory");
    clearButton.addEventListener("click", () => {
        //set things back to default:
        //set currentplayer back to player 1
        if(GameController.getCurrentPlayer().symbol != "X"){
            GameController.switchPlayer();
        }
        status.textContent = `Currently ${GameController.getCurrentPlayer().name}'s turn...`;

        //set moveHistory back to default
        history.textContent = "Last Turn:"
        //set board back to 3x3 0
        board.clearBoard();
        buttons.forEach((button) => {
            button.textContent = "";
        })
    });

    const openModal = document.querySelector(".rename .openModal");
    const closeModal = document.querySelector(".rename .closeModal");
    const dialog = document.querySelector("dialog");
    const submit = document.querySelector(".submit");
    openModal.addEventListener("click", () => {
        dialog.showModal();
    });

    closeModal.addEventListener("click", () => {
        dialog.close();
    });


    
    submit.addEventListener("click", () => {
        // get what is in input and assign it to Gamecontorller.plyayers[index]
        const inputs = document.querySelectorAll(".prompts input");
        inputs.forEach((input) => {
            if(input.value){ // have value
                GameController.getPlayers()[input.className].name = input.value;
            }
        })
        displayNames();
        dialog.close();
    });
   
    const names = document.querySelectorAll(".name") 
    const displayNames = () => {
        names.forEach((name) => {
            const temp = name.className.split(" ");
            const index = temp[1];
            name.textContent = `${GameController.getPlayers()[index].name}: ${GameController.getPlayers()[index].symbol}`
        });
    }

    displayNames();


    



})();


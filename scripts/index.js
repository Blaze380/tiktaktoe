class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
        this.wins = 0;
        this.loses = 0;
        this.draws = 0;
        this.gamesPlayed = 0;
    }
     getName() {
         return this.name;
     }
     setName(name) {
         this.name = name;
     }
 }
 var player = [];
 for (let i = 0;i<2; i++){
     player[i] = new Player("Joãozinh123");
}
const container = document.getElementById("container");
const screen = document.getElementsByClassName("array_table");
screen[0].addEventListener("click", function (event) {
    //This condition was made to avoid to cause an exeption because of the table array doesn't have an ID!
    if(event.target.id !==""){
        addDice(event.target.id);
    }
});
var playerBar = null;
var playerDetails = [];
var positions = []; //This matrix is for the game table
var isOcuppied = []; //This matrix is do declare if the positions are ocuppied or not.
var rows = 2; var columns = 2; ///I think that those are useless LOL
const table = []; //This array is to make the display flex and organize the table(I'll remove cause useless)
var quit = false; //Variable used for the while loop
var currentPlayerDice = "X"; //This variable is to store the current player dice to verify the winner

/**
 * This Loop Creates a basic matrix  3x3 for gaming
 * "#Don't ask me why you have to suffer to declare  a matrix beacuse idk LOL."
*/
for (let i = 0; i <= rows; i++){
    positions[i] = [];
    isOcuppied[i] = [];
    for (let j = 0; j <= columns; j++){
        positions[i][j] = null;
        isOcuppied[i][j] = false;
    }
}
createTable();

//This method removes the table and put a newer
function resetTable() {
    for (let i = 0; i < positions.length; i++){
        screen[0].removeChild(table[i]);
        isOcuppied[i].fill(false);
    }
    createTable();
}



/**
 * This method gets the position of the div receveing the ID(event.target.id) of the div.
 * And verifies if the current div is ocuppied with a dice. If isn't ocuppied, will add a dice.
 * @param {row/column} arrayData
 */
function addDice(arrayData) {
    let row = arrayData.charAt(0);
    let column = arrayData.charAt(2);
    let won = false;
    if (!isOcuppied[row][column]) {
        positions[row][column].innerText = currentPlayerDice;
        isOcuppied[row][column] = true;
        won = verifyWinner();
        if (won) {
            alert("I won!");
            resetTable();
        } else {
            verifyDraw();
        }
        changePlayer();
    } else {
        console.log("This position is already ocuppied!!");
    }
}

/**
 * This method verifies if all the positions has been put a dice and
 * declare draw!
 */
function verifyDraw() {
    let cont = 0;
    for (let i = 0; i < isOcuppied.length; i++){
        for (let j = 0; j < isOcuppied[0].length; j++){
            if (isOcuppied[i][j]) {
                cont++;
            }
        }
    }
    if (cont === 9) {
        alert("WithDraw");
    }
}


//This method changes the player dice
function changePlayer() {
    switch (currentPlayerDice) {
        case "X":
            currentPlayerDice = "O";
            break;
        case "O":
            currentPlayerDice = "X";
    }
}

/**
 * 
 * @returns 
 */
function verifyWinner() {
    let counter = 0;
    let hasWinner = false;
    counter = firstPhase();
    hasWinner = hasWon(counter);
    if (!hasWinner) {
        counter = secondPhase();
        hasWinner = hasWon(counter);
        if (!hasWinner) {
            counter = thirdPhase();
            hasWinner = hasWon(counter);
        }
    }
    return hasWinner;
}

function secondPhase() {
    let row = 0;
    let column = 0;
    let cont = 0;
    while (!quit) {
        cont = 0;
        row++;
        for (let j = 0; j < positions[0].length; j++){
            if (positions[row][j].innerText === currentPlayerDice) {
            cont++;
            }
        }
        if (cont === positions.length ) {
            break; //Breaks the loop "while"
        } else {
            cont = 0;
            column++;
        }
        for (let i = 0; i < positions.length; i++){
           if (positions[i][column].innerText === currentPlayerDice ) {
            cont++;
            }
        }
        if (cont === positions.length ) {
            break;
        }else if (row<=positions.length-1 || column<=positions.length-1){
            break;
        }
    }
    return cont;
}

/**
 * This Method verifies if numbers of dices that he put on the table are the number
 * of rows or columns.
 * @param {number if moves} counter
 * @param {false} hasWinner
 * @returns {true/false} @author 
*/
function hasWon(counter) {
    let hasWinner = false;
    if ((counter === positions.length) || (counter === positions[0].length)) {
        hasWinner = !hasWinner;
    }
    return hasWinner;
}

function thirdPhase() {
    let cont = 0;
    let row = positions.length - 1;
    let column = 0;
    for (let i = 0; i < positions.length; i++){
        if (positions[row][column].innerText === currentPlayerDice) {
            cont++;
        }
        row--;
        column++;
    }
    return cont;
}
function firstPhase() {
    let cont = 0;
    let row = 0;
    let column = 0;
    for (let i = 0; i < positions.length; i++){
         if (positions[row][column].innerText === currentPlayerDice) {
            cont++;
        }
        row++;
        column++;
    }
    if ((cont !== positions.length)) {
        cont = 0;
        row = 0;
            for (let j = 0; j < positions[0].length; j++){
                if (positions[row][j].innerText === currentPlayerDice) {
                cont++;
                }
            }
        if (cont !== positions.length) {
            cont = 0;
            column = 0;
            for (let i = 0; i < positions.length; i++){
               if (positions[i][column].innerText === currentPlayerDice ) {
                cont++;
                }
            }
        }
    }
    return cont;
}

//This function Creates a div's.
function createTable() {
    // playerBar = document.createElement("div");
    // playerBar.className = "player_bar";
    // for (let i = 0; i < 3; i++){
    //     playerDetails[i] = document.createElement("div");
    //     playerDetails[i].id = "player" + (i + 1);
    //     switch (i) {
    //         case 0:
    //             playerDetails[i].innerText = "X";
    //             break;
    //         case 1:
    //             playerDetails[i].innerText = "O";
    //             break;
    //     }
    //     playerBar.appendChild(playerDetails[i]);
    // }
    // container.appendChild(playerBar);

    /**
     * This div represents a number of rows in the table.
     * and receives a class name "table" to receive the estilization in the CSS.
     */
    for (let i = 0; i < positions.length; i++){
        table[i] = document.createElement("div");
        table[i].className = "table";


        /**
         * This div represents the spaces that the dices will gonna be placed
         * and receive the class name "array" to receive the estilization in the CSS.
         */
        for (let j = 0; j < positions[0].length; j++){
            positions[i][j] = document.createElement("div");
            positions[i][j].className = "array";
            positions[i][j].id = i + "/" + j; //The id of the current div will receive it's position on the array
            table[i].appendChild(positions[i][j]);//The "array" div's will be appended in the  "table" div's 
        }
        screen[0].appendChild(table[i]);//Therefore the "table" div's will be appended in the "container" div to be shown in the screen.
    }

}

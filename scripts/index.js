//Player class
class Player{
    constructor(){
        this._name = "";
        this._score = 0;
        this._wins = 0;
        this._loses = 0;
        this._draws = 0;
        this._gamesPlayed = 0;
    }
    set name(name) {
        this._name = name;
    }
    set score(score) {
        this._score =score;
    }
    set wins(wins) {
        this._wins =wins;
    }
    set loses(loses) {
        this._loses =loses;
    }
    set draws(draws) {
        this._draws =draws;
    }
    set gamesPlayed(gamesPlayed) {
        this._gamesPlayed =gamesPlayed;
    }
    get name() {
        return this._name;
    }
    get score() {
        return this._score;
    }
    get wins() {
        return this._wins;
    }
    get loses() {
        return this._loses;
    }
    get draws() {
        return this._draws;   
    }
    get gamesPlayed() {
        return this._gamesPlayed 
    }
}
 
 /**
  * VARIABLES AND CONSTANTS:
  */
 var player = [];
 for (let i = 0;i<2; i++){
     player[i] = new Player();
    }
const mainMenu = document.getElementById("main-menu");
const insertName = document.getElementById("insert-name");
const container = document.getElementById("container");
const playerName1 = document.getElementById("player1-name");
const playerName2 = document.getElementById("player2-name");
const selectPlayer = document.getElementById("select-player");
const arrayTable = document.getElementById("array_table");
const playerBar = document.getElementById("player_bar");
var isPlayerVsPlayer = false;
const playerName = [document.getElementById("player1name"), document.getElementById("player2name")];
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



/**
 * EVENTS LISTENERS:
 */
mainMenu.addEventListener("click", function (e) {
    switch (e.target.id) {
        case "btn-start":
            console.log(playerName[0].id)
            console.log(playerName[0].innerText);
            mainMenu.classList.add = "animation";
            toggleMenu(mainMenu,"none");
            toggleMenu(selectPlayer, "block");
            break;
        case "btn-score":
            break;
        case "btn-setting":
            break;
        case "btn-about":
            break;
    }
});
insertName.addEventListener("click", (event) => {
    if (event.target.id === "start-game") {
    addName();
    toggleMenu(insertName, "none");
    toggleMenu(container, "block");
    }
})
container.addEventListener("click", function (event) {
    //This condition was made to avoid to cause an exeption because of the table array doesn't have an ID!
    if(event.target.id !==""){
        addDice(event.target.id);
    }
});
selectPlayer.addEventListener("click", function (event) {
    switch (event.target.id) {
        case "1-vs-1":
            isPlayerVsPlayer = true;
            toggleMenu(selectPlayer, "none");
            toggleMenu(insertName, "block");
            break;
        case "1-vs-computer":
            isPlayerVsPlayer = false;
            toggleMenu(playerName2, "none");
            toggleMenu(selectPlayer, "none");
            toggleMenu(insertName, "block");
            break;
    }
});

/**
 * This method receives an element to set the display,usually being 
 * display block and none.
 * @param {The object element} menu 
 * @param {type of display} displayType 
 */
function toggleMenu(menu,displayType) {menu.style.display = displayType;}

function addName() {
    console.log(playerName[0].innerText)
    if (playerName1.value === "") {
        player[0].name = "Player1";
    } else {
        player[0].name = playerName1.value;
    }
    playerName[0].innerText = player[0].name;
    /**
     * Verifies if the current user will play versus player or computer
     */
    if (isPlayerVsPlayer) {
        if (playerName2.value === "") {
            player[1].name = "Player2";
        } else {
            player[1].name = playerName2.value;
        }
        playerName[1].innerText = player[1].name;
    } else {
        player[1].name = "Computer";
        playerName[1].innerText = player[1];
        }
}


//This method removes the table and put a newer
function resetTable() {
    for (let i = 0; i < positions.length; i++){
        arrayTable.removeChild(table[i]);
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
            switch (currentPlayerDice) {
                case "X":
                    player[0].wins++;
                    player[1].loses++;
                    break;
                case "O":
                    player[1].wins++;
                    player[0].loses++;
                    break;
            }
            for (let i = 0; i < 2; i++){
                player[i].gamesPlayed++;
            }
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
        for (let i = 0; i < 2; i++){
                player[i].gamesPlayed++;
            }
        player[0].draws++;
        player[1].draws++;
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
    // for (let i = 0; i <= 2; i++){
    //     playerName[i] = document.createElement("div");
    //     playerName[i].id = "player" + (i + 1);
    //     switch (i) {
    //         case 0:
    //             playerName[i].innerText = "X";
    //             break;
    //         case 1:
    //             playerName[i].innerText = "O";
    //             break;
    //     }
    //     playerBar.appendChild(playerName[i]);
    // }
    // container.appendChild(playerBar);
    // arrayTable = document.createElement("div");
    // arrayTable.className = "array_table";
    // container.appendChild(arrayTable);

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
        arrayTable.appendChild(table[i]);//Therefore the "table" div's will be appended in the "container" div to be shown in the screAen.
    }

}

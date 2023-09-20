// import Player from "./Player";
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
var screen = document.getElementsByClassName("array_table");
screen[0].addEventListener("click", function (event) {
    addDice(event.target.id);
});
var positions = [];
var isOcuppied = [];
var rows = 2; var columns = 2;
var table = [];
var quit = false;
var currentPlayerDice = "X";
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
        console.log("entrei")
        if (won) {
            alert("I won!");
            createTable();
        } else {
            verifyDraw();
        }
        changePlayer();
    } else {
        //#REMOVE THIS!!!!!!
        console.log("Error!");
    }
}
function verifyDraw() {
    console.log("sd")
    let cont = 0;
    for (let i = 0; i < isOcuppied.length; i++){
        for (let j = 0; j < isOcuppied[0].length; i++){
            if (isOcuppied[i][j]) {
                cont++;
                console.log("vaaaaaaa")
            }
        }
    }
    if (cont === 9) {
        alert("Deixa like aí viado kkkk");
    }
}

function changePlayer() {
    switch (currentPlayerDice) {
        case "X":
            currentPlayerDice = "O";
            break;
        case "O":
            currentPlayerDice = "X";
    }
}
function verifyWinner() {
    let counter = 0;
    let hasWinner = false;
    counter = firstPhase();
    hasWinner = hasWon(counter);
    if (!hasWinner) {
        counter = secondPhase();
        hasWinner = hasWon(counter);
        if (!hasWinner) {
          alert("sf")
            counter = thirdPhase();
            hasWinner = hasWon(counter);
        }
    }
    console.log(hasWinner)
    console.log(hasWinner +"sdfsf")
    return hasWinner;
}

function secondPhase() {
    let row = 0;
    let column = 0;
    let cont = 0;
    while (!quit) {
        console.log("2 fase")
        cont = 0;
        row++;
        for (let j = 0; j < positions[0].length; j++){
            if (positions[row][j].innerText === currentPlayerDice) {
            cont++;
            }
        }
        if (cont === positions.length ) {
            break;
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
    console.log("3a fase")
    for (let i = positions.length - 1; i >= 0;i--){
        for (let j = 0; j <= positions[0].length - 1; j++){
           /**REMOVE THIS!!!! */ console.log(i + "\n" + j)
            if (positions[i][j].innerText === currentPlayerDice) {
                cont++;
            }
        }
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
      /**REMOVE THIS!!! */  console.log("1a fase");
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
    screen[0].innerHtml = "";

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

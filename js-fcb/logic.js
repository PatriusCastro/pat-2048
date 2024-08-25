// console.log("Hello World!");

// Declare our variable for our 2D array, score, row, and columns.
let board;
let score = 0;
let rows = 4;
let columns = 4;
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

// Create a function to set the game
// Start of setGame()
function setGame(){
    // Initialize the 4x4 game board with all tiles set to 0.
    board =[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Create the gameboard on the HTML document.
    for(let r=0; r < rows; r++){
        for(let c=0; c < columns; c++){
            // console.log(`[r${r}-c${c}]`);

            // create a div element representing a tile
            let tile = document.createElement("div");

            // set a unique id for each tile based on its coordinate.
            tile.id = r.toString() + "-" + c.toString();

            // get the number from the 
            // wherein the board is currently set to 0
            let num = board[r][c];

            // update the tile's appearance based on the value.
            updateTile(tile, num);

            // Place the tile inside the board, in the right row and column
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();
}

// setGame();
// End of setGame()

// Start of updateTile()
function updateTile(tile, num){
    // clear the tile text
    tile.innerText = "";

    // clear the classList to avoid multiple classes
    tile.classList.value = "";

    // add the class named "tile" to the classList of the tile, for the styling 
    tile.classList.add("tile");

    // to check if the current num is not zero
    if(num > 0){
        // set the tile's text to the num based on the num value
        tile.innerText = num.toString();
       
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }

        else{
            tile.classList.add("x8192");
        }
    }
}

// End of updateTile()

// Start of window.onload
window.onload = function(){
    setGame();
}

// End of window.onload

// Start of handleSlide()
function handleSlide(e){
    console.log(e.code);

    if(["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"].includes(e.code)){
        e.preventDefault();

        if(e.code == "ArrowLeft"){
            slideLeft();
            setTwo();
        }
        else if(e.code == "ArrowRight"){
            slideRight();
            setTwo();
        }
        else if(e.code == "ArrowDown"){
            slideDown();
            setTwo();
        }
        else if(e.code == "ArrowUp"){
            slideUp();
            setTwo();
        }

        document.getElementById("score").innerText = score;

        setTimeout(()=>{
            if(hasLost()){
                alert("Game Over! GGs! Game will restart.");
                restartGame();
                alert("Press any arrow key to restart.");
            }
            else{
                checkWin();
            }
        }, 100);
    }
}

// When any key is pressed, the handleSlide() is called to handle the key press
document.addEventListener("keydown", handleSlide);

// End of handleSlide()

// start of filterZero(tiles)
function filterZero(tiles){
    return tiles.filter(num => num != 0);
}

// end of filterZero(tiles)

// Start of slide(tiles)
function slide(tiles){
    tiles = filterZero(tiles);

    for(let i=0; i < tiles.length; i++){
        // check if 2 adjacent numbers are equal
        if(tiles[i] == tiles[i+1]){
            tiles[i] *= 2;
            tiles[i+1] = 0;
            score += tiles[i];
        }
    }

    tiles = filterZero(tiles);

    while(tiles.length < 4){
        tiles.push(0);
    }

    return tiles;
}
// End of slide(tiles)

// Start of slideLeft()
function slideLeft(){
    for(let r=0; r < rows; r++){

        let row = board[r]; // 0; [0, 2, 2, 2]

        let originalRow = row.slice();

        // slide() will return a new value for a specific row
        row = slide(row);

        // updated value in the board
        board[r] = row;

        for(let c=0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalRow[c] !== num && num !== 0){
                tile.style.animation = "slide-from-right 0.3s";
                
                // remove animation
                setTimeout(() => {
                    tile.style.animation = "";
                }, 300);
            }

            updateTile(tile, num);
        }
    }
}
// End of slideLeft()

// Start of slideRight()
function slideRight(){
    for(let r=0; r < rows; r++){

        let row = board[r]; // 0; [0, 2, 2, 2]
        row.reverse();
        let originalRow = row.slice();

        // slide() will return a new value for a specific row
        row = slide(row);
        row.reverse();

        // updated value in the board
        board[r] = row;

        for(let c=0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalRow[c] !== num && num !== 0){
                tile.style.animation = "slide-from-left 0.3s";
                
                // remove animation
                setTimeout(() => {
                    tile.style.animation = "";
                }, 300);
            }

            updateTile(tile, num);
        }
    }
}
// End of slideRight()

// Start of slideUp()
function slideUp(){
    for(let c=0; c < columns; c++){

        // create a temporary array col that represents the column

        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let originalCol = col.slice();

        col = slide(col);

        for(let r=0; r < rows; r++){
            board[r][c] = col[r];

            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalCol[r] !== num && num !== 0){
                tile.style.animation = "slide-from-bottom 0.3s";
                
                // remove animation
                setTimeout(() => {
                    tile.style.animation = "";
                }, 300);
            }

            updateTile(tile, num);
        }
    }
}
// End of slideUp()

// Start of slideDown()
function slideDown(){
    for(let c=0; c < columns; c++){

        // create a temporary array col that represents the column

        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let originalCol = col.slice();

        col.reverse();
        col = slide(col);
        col.reverse();

        for(let r=0; r < rows; r++){
            board[r][c] = col[r];

            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalCol[r] !== num && num !== 0){
                tile.style.animation = "slide-from-top 0.3s";
                
                // remove animation
                setTimeout(() => {
                    tile.style.animation = "";
                }, 300);
            }

            updateTile(tile, num);
        }
    }
}
// End of slideDown()

// start of hasEmptyTile()
function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}
// end of hasEmptyTile()

// start of setTwo()
function setTwo(){
    if(!hasEmptyTile()){
        return;
    }

    let found = false;

    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");

            found = true;
        }
    }
}
// end of setTwo()

// start of checkWin()
function checkWin(){
    for(let r=0; r < rows; r++){
        for(let c=0; c < columns; c++){
            if(board[r][c] == 2048 && is2048Exist == false){
                alert("You Win! You got 2048! Solid!");
                is2048Exist = true;
            }
            else if(board[r][c] == 4096 && is4096Exist == false){
                alert("You are Unstoppable at 2048! Super Solid!");
                is4096Exist = true;
            }
            if(board[r][c] == 8192 && is8192Exist == false){
                alert("Victory! You have reached 8192! Ultra Solid!");
                is8192Exist = true;
            }
        }
    }
}
// end of checkWin()

// start of hasLost()
function hasLost(){
    for(let r=0; r < rows; r++){
        for(let c=0; c < columns; c++){
            if(board[r][c] == 0){
                return false;
            }

            const currentTile = board[r][c];

            if(
                (r > 0 && board[r-1][c] === currentTile) ||
                (r < rows-1 && board[r+1][c] === currentTile) ||
                (c > 0 && board[r][c-1] === currentTile) ||
                (c < columns-1 && board[r][c+1] === currentTile)
            ){
                return false;    
            }
        }
    }
    return true;
}
// end of hasLost()

// start of restartGame()
function restartGame(){
    board =[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    setTwo();
    score = 0;
}
// end of restartGame()

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) =>{
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchmove", (e) =>{
    if(!e.target.className.includes("tile")){
        return;
    }

    e.preventDefault();
}, {passive: false});

document.addEventListener("touchend", (e) =>{

    if(!e.target.className.includes("tile")){
        return;
    }

    let diffX = startX - e.changedTouches[0].clientX;
    let diffY = startY - e.changedTouches[0].clientY;

    if(Math.abs(diffX > Math.abs(diffY))){
        if(diffX > 0){
            slideLeft();
            setTwo();
        }
        else{
            slideRight();
            setTwo();
        }
    }
    else{
        if(diffY > 0){
            slideUp();
            setTwo();
        }
        else{
            slideDown();
            setTwo();
        }
    }
    document.getElementById("score").innerText = score;

    setTimeout(()=>{
        if(hasLost()){
            alert("Game Over! GGs! Game will restart.");
            restartGame();
            alert("Press any arrow key to restart.");
        }
        else{
            checkWin();
        }
    }, 100);
});
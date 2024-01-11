var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
let score = 0;
var currTile;
var otherTile;
var startX, startY, endX, endY;
window.onload = function() {
    startGame();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    document.getElementById("score").innerText = score;
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;    
        }
    }
}

function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
function resetScore() {
    score = 0;
    document.getElementById("score").innerText = score;
}

window.onload = function() {
    startGame();
    showPopup();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function showPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";

    setTimeout(function() {
        popup.style.display = "none";
    }, 2000); 
}


function touchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}

function touchMove(e) {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
}

function touchEnd() {
    let xDiff = endX - startX;
    let yDiff = endY - startY;

    let moveLeft = xDiff < 0 && Math.abs(xDiff) > Math.abs(yDiff);
    let moveRight = xDiff > 0 && Math.abs(xDiff) > Math.abs(yDiff);
    let moveUp = yDiff < 0 && Math.abs(yDiff) > Math.abs(xDiff);
    let moveDown = yDiff > 0 && Math.abs(yDiff) > Math.abs(xDiff);

    if (moveLeft) {
        moveTiles("left");
    } else if (moveRight) {
        moveTiles("right");
    } else if (moveUp) {
        moveTiles("up");
    } else if (moveDown) {
        moveTiles("down");
    }
}

function moveTiles(direction) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (direction === "left") {
                swapTiles(board[r][c], board[r][c + 1]);
            } else if (direction === "right") {
                swapTiles(board[r][c], board[r][c + 1]);
            } else if (direction === "up") {
                swapTiles(board[r][c], board[r + 1][c]);
            } else if (direction === "down") {
                swapTiles(board[r][c], board[r + 1][c]);
            }
        }
    }

    crushCandy();
    slideCandy();
    generateCandy();
}




function moveLeft() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            swapTiles(board[r][c], board[r][c + 1]);
        }
    }
}

function moveRight() {
    for (let r = 0; r < rows; r++) {
        for (let c = columns - 1; c > 0; c--) {
            swapTiles(board[r][c], board[r][c - 1]);
        }
    }
}

function moveUp() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            swapTiles(board[r][c], board[r + 1][c]);
        }
    }
}

function moveDown() {
    for (let c = 0; c < columns; c++) {
        for (let r = rows - 1; r > 0; r--) {
            swapTiles(board[r][c], board[r - 1][c]);
        }
    }
}

function swapTiles(tile1, tile2) {
    let tempSrc = tile1.src;
    tile1.src = tile2.src;
    tile2.src = tempSrc;
}





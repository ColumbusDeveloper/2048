'use strict'

let board;
let score = 0;
const rows = 4;
const columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            if (board[r][c] === 0) {
                return true;
            }
        }

    }
    return false;
}



function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] === 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = 2;
            tile.classList.add('x2');
            found = true;
        }

    }
}



function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if(num > 0) {
        tile.innerText = num;
        if(num <= 4096) {
            tile.classList.add("x" + num.toString());
        }else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if(e.code === 'ArrowLeft') {
        slideLeft();
        setTwo();
    }
    if(e.code === 'ArrowRight') {
        slideRight();
        setTwo();
    }
    if(e.code === 'ArrowUp') {
        slideUp();
        setTwo();
    }
    if(e.code === 'ArrowDown') {
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText = score;
})

function filterZero(row) {
    row = row.filter(item => item !== 0);
    return row;
}


function slide(row) {
    row = filterZero(row);

    for (let r = 0; r < row.length - 1; r++) {
        if (row[r] === row[r + 1]) {
            row[r]*=2;
            row[r + 1] = 0;
            score += (row[r]) / 2;
        }
    }

    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}


function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}


function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for (let r = 0; r < columns; r++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];
        for (let r = 0; r < columns; r++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

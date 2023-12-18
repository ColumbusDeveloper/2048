'use strict'
let board = [];

let score = 0;
const rows = 4;
const columns = 4;
const btn = document.querySelector('.button');

btn.addEventListener('click' , () => {
    setGame();
        if (!btn.classList.value.includes("restart")) {
            btn.classList.add("restart");
            btn.innerHTML = 'Restart';
        } else {
            btn.classList.remove("restart");
            btn.innerHTML = 'Start';
        }
    },
);

function setGame() {

    setBoard();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            tile.id = `${r}-${c}`;
            let num = tile.innerText;
            updateTile(tile, num);
        }
    }



    setTwo();
    setTwo();

}

function setBoard() {

    let arrBoard = document.getElementsByClassName('field-cell');

    board[0] = [arrBoard[0], arrBoard[1], arrBoard[2], arrBoard[3]];
    board[1] = [arrBoard[4], arrBoard[5], arrBoard[6], arrBoard[7]];
    board[2] = [arrBoard[8], arrBoard[9], arrBoard[10], arrBoard[11]];
    board[3] = [arrBoard[12], arrBoard[13], arrBoard[14], arrBoard[15]];


}

function hasEmptyTile() {

    setBoard();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            if (Number(board[r][c].innerText) === 0) {
                return true;
            }
        }

    }
    return false;

}


function setRandomNum2or4() {
    if (!hasEmptyTile()) {
        return;
    }

    let stopWhile = false;
    while (!stopWhile) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(Number(board[r][c].innerText) === 0) {
            let tile = document.getElementById(`${r}-${c}`);
            let num = Math.random() * 1000 <= 900 ? 2 : 4;
            tile.innerText = num;
            tile.classList.add("field-cell--" + num.toString());
            stopWhile = true;
        }

    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(Number(board[r][c].innerText) === 0) {
            let tile = document.getElementById(`${r}-${c}`);
            let num = 2;
            tile.innerText = num;
            tile.classList.add("field-cell--" + num.toString());
            found = true;
        }

    }
}


function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("field-cell");

    if(num > 0) {
        tile.innerText = num;
        if(num <= 2048) {
            tile.classList.add("field-cell--" + num.toString());
        }else {
            tile.classList.add("field-cell--8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if(e.code === 'ArrowLeft') {
        slideLeft();
        setRandomNum2or4();
    }
    if(e.code === 'ArrowRight') {
        slideRight();
        setRandomNum2or4();
    }
    if(e.code === 'ArrowUp') {
        slideUp();
        setRandomNum2or4();
    }
    if(e.code === 'ArrowDown') {
        slideDown();
        setRandomNum2or4();
    }
    const scoreTotal = document.querySelector('.game-score');
    scoreTotal.innerText = score;
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
            score += row[r];
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
        let rowLeftRight = [Number(board[r][0].innerText), Number(board[r][1].innerText), Number(board[r][2].innerText), Number(board[r][3].innerText)];
        let row = rowLeftRight;
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
        let rowLeftRight = [Number(board[r][0].innerText),
        Number(board[r][1].innerText),
        Number(board[r][2].innerText),
        Number(board[r][3].innerText)];
        let row = rowLeftRight;
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
        let rowUpDown = [Number(board[0][c].innerText),
        Number(board[1][c].innerText),
        Number(board[2][c].innerText),
        Number(board[3][c].innerText)];
        let row = rowUpDown;
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
        let rowUpDown = [Number(board[0][c].innerText),
        Number(board[1][c].innerText),
        Number(board[2][c].innerText),
        Number(board[3][c].innerText)];
        let row = rowUpDown;
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

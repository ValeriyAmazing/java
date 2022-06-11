let main = document.querySelector('.tetris');
let btn = document.querySelector('button');

let speed = 1000;
let mainfieldE = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
let mainfield = [

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
btn.addEventListener('click', function (e) {


    start();

})

activeFigure = {
    x: 0,
    y: 0,
    shape: [
        [0, 1, 1,],
        [1, 1, 0,],
        [0, 0, 0,],
    ]
}
console.log(activeFigure);

function rotate() {
    let r = activeFigure.shape.map(
        (val1, index1) => activeFigure.shape.map(((val2, index2) => val2[index1])).reverse()

    );

    activeFigure.shape = r;
}

//отрисовываем  поле
function draw() {
    let innerHTML = "";
    for (let y = 3; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            switch (mainfield[y][x]) {
                case 0: innerHTML += '<div class="cell"></div>'; break;
                case 1: innerHTML += '<div class="cellmovable"></div>'; break;
                case 2: innerHTML += '<div class="cellfixed"></div>'; break;
                default: console.log('alert'); break;
            }
        }
    }
    main.innerHTML = innerHTML;
}


//отрисовка фигуры на поле
function updateFigurePosition() {
    removePrevPos()
    for (let y = 0; y < activeFigure.shape.length; y++) {
        for (let x = 0; x < activeFigure.shape[y].length; x++) {
            if (activeFigure.shape[y][x]) {
                mainfield[activeFigure.y + y][activeFigure.x + x] = activeFigure.shape[y][x];
            }
        }
    }
}
//Удаление предыдущего положения фигуры
function removePrevPos() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                mainfield[y][x] = 0;
            }
        }
    }
}
//определение касания
function detectColision() {
    for (let y = 0; y < activeFigure.shape.length; y++) {
        for (let x = 0; x < activeFigure.shape[y].length; x++) {
            if (activeFigure.shape[y][x] === 1 && (mainfield[activeFigure.y + y] === undefined || mainfield[activeFigure.y + y][activeFigure.x + x] === undefined || mainfield[activeFigure.y + y][activeFigure.x + x] === 2)) {
                return true;

            }
        }
    }
    return false;
}


//убираем заполненые линии
function removeLine() {
    for (let y = 0; y < mainfield.length; y++) {
        let canRemove = true;
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] !== 2) {
                canRemove = false;
                break;
            }
        }
        if (canRemove) {
            mainfield.splice(y, 1,);
            mainfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
    }

}


//фиксируем позицию фигуры
function fix() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                mainfield[y][x] = 2;

            }
        }
    }
    gameOver()
    removeLine();
    createNew();
    activeFigure.y = 0;
    activeFigure.x = 4;


}
//конец игры(тестовый)
function gameOver() {
    for (let x = 0; x < mainfield[0].length; x++) {
        if (mainfield[2][x] === 2) {


            return true;

        }

    }
    return false;
}

//слуайное число (не включительно)
function random(max) {
    return Math.floor(Math.random() * max);
}


//генерация случайной фигуры
function createNew() {
    let num;
    num = random(5);

    let square = [
        [0, 0, 0,],
        [1, 1, 0,],
        [1, 1, 0,],
    ];

    let squareBig = [
        [1, 1, 1,],
        [1, 1, 1,],
        [1, 1, 1,],
    ];


    let figureL = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ];

    let figureT = [
        [1, 1, 1,],
        [0, 1, 0,],
        [0, 0, 0,]
    ];

    let figureZ = [
        [0, 0, 0,],
        [1, 1, 1,],
        [0, 0, 1,]
    ];

    switch (num) {
        case 0: activeFigure.shape = square; break;
        case 1: activeFigure.shape = squareBig; break;
        case 2: activeFigure.shape = figureL; break;
        case 3: activeFigure.shape = figureT; break;
        case 4: activeFigure.shape = figureZ; break;


    }
}


//элементы управления
document.onkeydown = function (e) {
    if (e.key === 'ArrowRight') {
        activeFigure.x += 1;
        if (detectColision()) {
            activeFigure.x -= 1
        }
    }
    else if (e.key === 'ArrowLeft') {
        activeFigure.x -= 1;
        if (detectColision()) {
            activeFigure.x += 1
        }
    }
    else if (e.key === 'ArrowDown') {
        activeFigure.y += 1;
        if (detectColision()) {
            activeFigure.y -= 1;
            fix()
        }
    }
    else if (e.key === 'ArrowUp') {
        rotate()
    }
    updateFigurePosition()
    draw()
}
function clearField() {
    let arr = mainfield.map(() => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])
    mainfield = arr;
    console.log(mainfield)
}
//старт игры
function start() {
    if (!gameOver()) {
        activeFigure.y += 1;
        if (detectColision()) {
            activeFigure.y -= 1;
            fix()
        }
        updateFigurePosition()
        draw()
        setTimeout(start, speed)
    }
    else {
        clearField()
        draw()
        alert('Game Over!');

    }



}


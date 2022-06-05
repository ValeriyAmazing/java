let main = document.querySelector('.tetris');
let btn = document.querySelector('button');

let speed = 1000;
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
];
btn.addEventListener('click', function (e) {
    createNew();
    start();
})

activeFigure = {
    x: 0,
    y: 0,
    shape: [
        [1, 1, 1,],
        [0, 1, 0,],
        [0, 0, 0,],
    ]
}
console.log(activeFigure);


//отрисовываем  поле
function draw() {
    let innerHTML = "";
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {

            // if (mainfield[y][x] === 0) { innerHTML += '<div class="cell"></div>'; }
            // else if (mainfield[y][x] === 1) { innerHTML += '<div class="cellmovable"></div>'; }
            // else if (mainfield[y][x] === 2) { innerHTML += '<div class="cellfixed"></div>'; };

            // innerHTML += '<div class="cell"></div>';
            switch (mainfield[y][x]) {
                case 0: innerHTML += '<div class="cell"></div>'; break;
                case 1: innerHTML += '<div class="cellmovable"></div>'; break;
                case 2: innerHTML += '<div class="cellfixed"></div>'; break;
                default: console.log('alert'); break;
            }
        }
    }
    // console.log(innerHTML)
    main.innerHTML = innerHTML;
}


//отрисовка фигуры на поле
function updateFigurePosition() {
    for (let y = 0; y < activeFigure.shape.length; y++){
        for (let x = 0; x < activeFigure.shape[y].length; x++){
            if (activeFigure.shape[y][x] & canMove()) {
                mainfield[activeFigure.y+y][activeFigure.x+x] = activeFigure.shape[y][x];
            }
        }
    }
}
//реализация движения вниз
//проверяем возможносьть перемещения вниз
function canMove() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                if (y + 1 === mainfield.length || mainfield[y + 1][x] === 2) {
                    return false;
                }

            }

        }

    }
    return true;
}
//перемещаем вниз
function moveDown() {
    if (canMove()) {
        for (let y = mainfield.length - 1; y >= 0; y--) {
            for (let x = 0; x < mainfield[y].length; x++) {
                if (mainfield[y][x] === 1) {
                    
                    mainfield[y + 1][x] = 1;
                    mainfield[y][x] = 0;


                }
            }
        }
        activeFigure.y += 1;
        updateFigurePosition()
    }

    else fix();

    draw()
}


//проверяем возможносьть перемещения влево
function canMoveLeft() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                if (x === 0 || mainfield[y][x - 1] === 2) {
                    return false;
                }

            }

        }

    }
    return true;
}
//перемещаем влево
function moveLeft() {
    if (canMoveLeft()) {
        for (let y = 0; y < mainfield.length; y++) {
            for (let x = 0; x < mainfield[y].length; x++) {
                if (mainfield[y][x] === 1) {
                    mainfield[y][x - 1] = 1;
                    mainfield[y][x] = 0;


                }
            }
        }
        activeFigure.x -= 1;
        updateFigurePosition()
    }

    
    draw()
}



//перемещение вправо
//проверяем возможносьть перемещения вправо
function canMoveRight() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                if (x + 1 === mainfield[y].length || mainfield[y][x + 1] === 2) {
                    return false;
                }

            }

        }

    }
    return true;
}
//перемещаем вправо
function moveRight() {
    if (canMoveRight()) {
        for (let y = 0; y < mainfield.length; y++) {
            for (let x = mainfield[y].length - 1; x >= 0; x--) {
                if (mainfield[y][x] === 1) {
                    mainfield[y][x + 1] = 1;
                    mainfield[y][x] = 0;
                }
            }
        }
        activeFigure.x += 1;
        updateFigurePosition()
    }

    draw()
}
function rotate() {
    for (let y = 0; y < activeFigure.shape.length; y--) {
        for (let x = 0; x < activeFigure.shape[y].length; x++) {
            activeFigure.shape[y][x] = activeFigure.shape[x][y];
        }
    } updateFigurePosition()
    console.log(activeFigure.shape)
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
    activeFigure.x = 0;
    activeFigure.y = 0
    removeLine();
    createNew();
}



//слуайное число (не включительно)
function random(max) {
    return Math.floor(Math.random() * max);
}


//генерация случайной фигуры
function createNew() {
    let num;
    num = random(5);

    let figure = [];
    let square = [
        [1, 1,],
        [1, 1,],
    ];

    let squareBig = [
        [1, 1, 1,],
        [1, 1, 1,],
        [1, 1, 1,],
    ];


    let figureL = [
        [1, 1,],
        [0, 1,],
        [0, 1,],
    ];

    let figureT = [
        [1, 1, 1,],
        [0, 1, 0,],
    ];

    let figureZ = [
        [1, 1, 0,],
        [0, 1, 1,],
    ];

    switch (num) {
        case 0: figure = square; break;
        case 1: figure = squareBig; break;
        case 2: figure = figureL; break;
        case 3: figure = figureT; break;
        case 4: figure = figureZ; break;


    }

    // for (let y = 0; y < figure.length; y++) {
    //     for (let x = 0; x < figure[y].length; x++)
    //         mainfield[y][x + 4] = figure[y][x];

    // }
    activeFigure.shape=figure
}

//элементы управления
document.onkeydown = function (e) {
    if (e.key === 'ArrowRight') { moveRight() }

    else if (e.key === 'ArrowLeft') { moveLeft() }
    else if (e.key === 'ArrowDown') { moveDown() }
    else if (e.key === 'ArrowUp') { rotate() }
}

//старт игры
function start() {
    moveDown();
    draw();
    setTimeout(start, speed)
}

updateFigurePosition()
draw()
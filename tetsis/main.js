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
// btn.addEventListener('click', function (e) {
//     createNew();
//     start();
// })

activeFigure = {
    x: 0,
    y: 0,
    shape: [
        [1, 2, 3,],
        [4, 5, 6,], 
        [7, 8, 9,], 
    ]
}
console.log(activeFigure);

function rotate() {
    let r = activeFigure.shape.map(
        (val1, index1) => activeFigure.shape.map(((val2, index2) => val2[index1]))

    );
    console.log(r);
    activeFigure.shape = r;
}

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
    removePrevPos()
    for (let y = 0; y < activeFigure.shape.length; y++) {
        for (let x = 0; x < activeFigure.shape[y].length; x++) {
            if (activeFigure.shape[y][x]) {
                mainfield[activeFigure.y + y][activeFigure.x + x] = activeFigure.shape[y][x];
            }
        }
    }
}
function removePrevPos() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                mainfield[y][x] = 0;
            }
        }
    }
}
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


// //убираем заполненые линии
// function removeLine() {
//     for (let y = 0; y < mainfield.length; y++) {
//         let canRemove = true;
//         for (let x = 0; x < mainfield[y].length; x++) {
//             if (mainfield[y][x] !== 2) {
//                 canRemove = false;
//                 break;
//             }
//         }
//         if (canRemove) {
//             mainfield.splice(y, 1,);
//             mainfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
//         }
//     }

// }


//фиксируем позицию фигуры
function fix() {
    for (let y = 0; y < mainfield.length; y++) {
        for (let x = 0; x < mainfield[y].length; x++) {
            if (mainfield[y][x] === 1) {
                mainfield[y][x] = 2;

            }
        }
    }
    activeFigure.y = 0;
    activeFigure.x = 0;
    // removeLine();
    // createNew();
}



//слуайное число (не включительно)
// function random(max) {
//     return Math.floor(Math.random() * max);
// }


// //генерация случайной фигуры
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
        [1, 1, 0,],
        [0, 1, 1,],
        [0, 0, 0,]
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
    return activeFigure.shape;
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

// //старт игры
// function start() {
//     moveDown();
//     draw();
//     setTimeout(start, speed)
// }

updateFigurePosition()
draw()
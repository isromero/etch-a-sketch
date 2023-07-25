const etchASketch = document.querySelector('#etch-a-sketch');
let isDrawing = false;
let isErasing = false;
let currentColor = 'black';

const   createGrid = (x, y) => {
    let totalCells = x * y;

    const etchASketchSize = 400 / y;
    for( ; totalCells > 0; totalCells--) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('brush-cursor');
        cell.style.width = `${etchASketchSize}px`;
        cell.style.height = `${etchASketchSize}px`;
        etchASketch.appendChild(cell);
    }
}

const   changeGrid = () => {
    const inputRange = document.querySelector('#grid');
    const label = document.querySelector('label[for="grid"]')

    inputRange.addEventListener('input', () => {
        const selectedValue = inputRange.value;
        label.textContent = `Grid: ${selectedValue}x${selectedValue}`;
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.remove();
        });
        createGrid(selectedValue, selectedValue);
        clear();
        erase();
        rainbowPaint();
        currentColor = changeColor();
        paint();
    });
}

const   changeColor = () => {
    const inputColor = document.querySelector('#color-picker');
    currentColor = inputColor.value || 'black';
    return (currentColor);
}

const   paint = () => {
    const cells = document.querySelectorAll('.cell');
    const body = document.querySelector('body');
    etchASketch.style.cursor = 'url("./cursors/paint-brush.cur"), auto'
    cells.forEach(cell => {
        body.addEventListener('mousedown', () => {
            isDrawing = true;
        });
        body.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        cell.addEventListener('mouseover', () => {
            if(isDrawing) {
                cell.style.backgroundColor = changeColor();
            }
        });
    });
}

const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const   rainbowPaint = () => {
    const cells = document.querySelectorAll('.cell');
    const body = document.querySelector('body');
    etchASketch.style.cursor = 'url("./cursors/paint-brush.cur"), auto'
    cells.forEach(cell => {
        body.addEventListener('mousedown', () => {
            isDrawing = true;
        });
        body.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        cell.addEventListener('mouseover', () => {
            if(isDrawing) {
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);
                const rgb = `rgb(${r},${g},${b})`;
                cell.style.backgroundColor = rgb;
            }
        });
    });
}

const   clear = () => {
    const button = document.querySelector('#clear-btn');
    const cells = document.querySelectorAll('.cell');
    button.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = 'white';
        })
    })
}

const   erase = () => {
    const cells = document.querySelectorAll('.cell');
    const body = document.querySelector('body');
    isDrawing = false;
    etchASketch.style.cursor = 'url("./cursors/eraser.cur"), auto'
    cells.forEach(cell => {
        body.addEventListener('mousedown', () => {
            isErasing = true;
        });
        body.addEventListener('mouseup', () => {
            isErasing = false;
        });
        cell.addEventListener('mouseover', () => {
            if(isErasing) {
                cell.style.backgroundColor = 'white';
            }
        });
    });
}

createGrid(16, 16);
paint();
const paintButton = document.querySelector('#paint-btn');
const eraseButton = document.querySelector('#erase-btn');
const rainbowButton = document.querySelector('#rainbow-btn');

paintButton.addEventListener('click', paint);
clear();
eraseButton.addEventListener('click', erase);
rainbowButton.addEventListener('click', rainbowPaint);
changeGrid();
const etchASketch = document.querySelector('#etch-a-sketch');
let isDrawing = false;
let isErasing = false;

const   createGrid = (x, y) => {
    let totalCells = x * y;

    const etchASketchSize = 400 / y;
    while(totalCells > 0) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('brush-cursor');
        cell.style.width = `${etchASketchSize}px`;
        cell.style.height = `${etchASketchSize}px`;
        etchASketch.appendChild(cell);
        totalCells--;
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
        paint();
        clear();
        erase();
    });
    
}

const   paint = () => {
    const cells = document.querySelectorAll('.cell');
    const body = document.querySelector('body');
    const button = document.querySelector('#paint-btn');
    cells.forEach(cell => {
        body.addEventListener('mousedown', () => {
            isDrawing = true;
        });
        body.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        cell.addEventListener('mouseover', () => {
            if(isDrawing) {
                cell.style.backgroundColor = 'black';
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
    const button = document.querySelector('#erase-btn');
    const cells = document.querySelectorAll('.cell');
    const body = document.querySelector('body');
    button.addEventListener('click', () => {
        isDrawing = false;
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
    });
}

createGrid(16, 16);
const paintButton = document.querySelector('#paint-btn');

document.addEventListener('DOMContentLoaded', () => {
    paint();
    paintButton.addEventListener('click', paint);
});
clear();
erase();
changeGrid();
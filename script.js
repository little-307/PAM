// select global html elements
const mainContainer = document.querySelector('.main-container');
// for grid
const gridContainer = document.querySelector('.grid-container');
const customGrid = document.querySelector('.grid-custom');
const inputHeight = document.querySelector('.input-height');
const inputWidth = document.querySelector('.input-width');
let customHeight = document.querySelector('.input-height').value;
let customWidth = document.querySelector('.input-width').value;

const colorCustom = document.querySelector('#color-picker');

const paletteContainer = document.querySelector('.palette-container');
const buttonContainer = document.querySelector('.button-container');
const imagesContainer = document.querySelector('.images-container');
const fillButton = document.querySelector('.fill-button');
const loadImageButton = document.querySelector('.load-image-button');
const saveButton = document.querySelector('.save-button');
const undoButton = document.querySelector('.undo-button');

//       Creation of Color Palette colors
const paletteColors = ['blue', 'green', 'yellow', 'orange', 'red'];
//       Creation of gameArr
const gameArr = [
    'url(assets/1.jpg',
    'url(assets/2.jpg',
    'url(assets/3.jpg',
    'url(assets/4.jpg',
    'url(assets/5.jpg',
    'url(assets/6.jpg',
    'url(assets/7.jpg',
    'url(assets/8.jpg',
    'url(assets/9.jpg',
];

const allSquares = [];

let paintColor = '#272727';

//Objective: create a image element and append to class="images-container" '' imagesContainer
// const newImage = document.createElement('img');
// imagesContainer.appendChild(newImage);

//Objective: add event listener to load image button
loadImageButton.addEventListener('click', (e) => {
    e.preventDefault();
    // getImageFromApi();
    showImage();
});

//         making the grid
function makeGrid(customHeight, customWidth) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    for ( let i = 0; i < customHeight; i++ ) {
        const row = makeRow();
        gridContainer.appendChild(row);
            for ( let j = 0; j < customWidth; j++ ) {
                const square = makeSquare();
                row.appendChild(square);
               
                square.addEventListener('click', () => {
                    square.style.backgroundColor = paintColor;
                });
            }
    }
}

//      Custom Grid Function
function changeGridSize() {
    
    // inputHeight.addEventListener('change', (e) => {
    //     customHeight = e.target.value;
    // });
    // inputWidth.addEventListener('change', (e) => {
    //     customWidth = e.target.value;
    // });
    customGrid.addEventListener('submit', (e) => {
        e.preventDefault();
        customHeight = inputHeight.value;
        customWidth = inputWidth.value;
        makeGrid(customHeight, customWidth);
    });
}

//      making the rows
function makeRow() {
    const row = document.createElement('div');
    row.classList.add('row');

    return row;
}
//      making the square
function makeSquare() {
    const square = document.createElement('div');
    square.classList.add('square');
    allSquares.push(square)
    return square;
}
//      FILL squares this function fills all squares with click of fill button.
            
function fillSquares() {
    fillButton.addEventListener('click', () => {
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => (square.style.backgroundColor = paintColor));
    });
}
//    Create a color circle and append to palette container
function createColorCircleAndAppend(colorHex) {
    const colorCircle = document.createElement('div');
    colorCircle.classList.add('circle');
    colorCircle.style.backgroundColor = colorHex;

    paletteContainer.appendChild(colorCircle);
    // add event for grabbing color from color circles
    colorCircle.addEventListener('click', () => {
        paintColor = colorCircle.style.backgroundColor;
    });
}

//  Create multiple palette colors with "for loop"
function createColorPalette() {
    for ( let i = 0; i < paletteColors.length; i++ ) {
        let colorHex = paletteColors[i];

        createColorCircleAndAppend(colorHex);
    }
}
function colorCustomApp() {
    colorCustom.addEventListener('change', () => {
        // loop to display colors from paletteColors array.
        for (let i = 0; i < paletteColors.length; i++) {
            // removes previous array in paletteContainer to prevent array repitition.
            paletteContainer.removeChild(document.querySelector('.circle'));
        };
        // places selection from colorCustom at the start of paletteColors array.
        paletteColors.unshift(colorCustom.value)
        createColorPalette();
    });
    
}

function dragAndDraw() {
    gridContainer.addEventListener('mousedown', () => {
        down = true;
        gridContainer.addEventListener('mouseup', () => {
            down = false;
            gridContainer.addEventListener('mouseover', (e) => {
                if (e.target.className === "square" && down) {
                    e.target.style.backgroundColor = paintColor;
                }
            });
        });
    });
}

// create a function that saves each square background color to a local storage
function saveBtn() {
    saveButton.addEventListener('click', () => {
        const gridArray = [];
        for (let i = 0; i < allSquares.length; i++) {
            const squareColors = allSquares[i];
            gridArray.push(squareColors.style.backgroundColor);
        }
        const gridInfo = {
            grid: gridArray,
        }
        console.log(gridInfo);
        // console.log(allSquares.style.backgroundColor);
        localStorage.setItem('gridSave', JSON.stringify(gridInfo));
    })
}

//create a function that retrieves each square background color form local storage
function loadBtn() {
    undoButton.addEventListener('click', () => {
        const savedGridInfo = JSON.parse(localStorage.getItem('gridSave'));
        for (let i = 0; i < allSquares.length; i++) {
            allSquares[i].style.backgroundColor = savedGridInfo.grid[i];
        }
    });
}

// FETCH random image from API
// function getImageFromApi() {
//     const fetchRequest = fetch('https://source.unsplash.com/random/300x200');

//     fetchRequest.then(function(response) {
//         return response;
//     })
//     .then(function(data) {
//         console.log(data);
//         gridContainer.style.backgroundImage = `url('${data.url}')`;
//     })
// }
// https://pokeapi.co/api/v2/pokedex/12/
function showImage() {
    var a = Math.floor(Math.random()*gameArr.length);
    var img = gameArr[a];
    console.log(img);
    gridContainer.style.backgroundImage = img;
}

function init() {
    makeGrid(customWidth, customHeight);
    changeGridSize();
    createColorPalette();
    colorCustomApp();
    fillSquares();
    dragAndDraw();
    saveBtn();
    loadBtn();
    
}

init();

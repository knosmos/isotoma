import Interactive from "https://vectorjs.org/interactive.js";

let canvas = new Interactive("editor-canvas", {
    width: 700,
    height: 500
});
canvas.width = canvas.root.clientWidth;
canvas.height = canvas.root.clientHeight;
canvas.border = true;

// Create grid
let numCols = canvas.width / 20;
let numRows = canvas.height / 20;
for (let i=0; i<numCols; i++) {
    let x = i*20;
    let line = canvas.line(x, 0, x, canvas.height);
    line.stroke = "#eee";
}
for (let i=0; i<numRows; i++) {
    let y = i*20;
    let line = canvas.line(0, y, canvas.width, y);
    line.stroke = "#eee";
}

// Convert from mouse coords to grid coords
function offsetCoords(x, y) {
    // subtract the offset of the canvas from the page
    x -= canvas.root.getBoundingClientRect().left;
    y -= canvas.root.getBoundingClientRect().top;

    return [x, y];
}

function scaleCoords(x, y) {
    // scale the coordinates
    x *= canvas.width/canvas.root.clientWidth;
    y *= canvas.height/canvas.root.clientHeight;

    return [x, y];
}

function gridCoords(x, y) {
    let col = Math.round(x/20);
    let row = Math.round(y/20);
    return [col*20, row*20];
}

window.elements = [];
window.selectedElem;

export { canvas, offsetCoords, scaleCoords, gridCoords };
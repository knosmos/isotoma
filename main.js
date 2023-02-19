import Interactive from "https://vectorjs.org/interactive.js";

let canvas = new Interactive("editor-canvas", {
    width: 700,
    height: 500
});
canvas.border = true;

// Create grid
let numCols = 35;
let numRows = 25;
for (let i=0; i<numCols; i++) {
    let x = i*20;
    let line = canvas.line(x, 0, x, canvas.height);
    line.stroke = "lightgrey";
}
for (let i=0; i<numRows; i++) {
    let y = i*20;
    let line = canvas.line(0, y, canvas.width, y);
    line.stroke = "lightgrey";
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
/*
canvas.root.onclick = (event) => {
    let x = event.clientX;
    let y = event.clientY;
    [x, y] = offsetCoords(x, y);
    [x, y] = scaleCoords(x, y);
    [x, y] = gridCoords(x, y);

    let control = canvas.control(x, y);
    let control2 = canvas.control(x, y);
    control.addDependency(control2);
    control.update = function() {
        [this.x, this.y] = scaleCoords(this.x, this.y);
        [this.x, this.y] = gridCoords(control2.x, control2.y);
        
        control2.x = this.x;
        control2.y = this.y;
    }

    canvas.root.onclick=null;
}
*/
export { canvas, offsetCoords, scaleCoords, gridCoords };
import { canvas, scaleCoords, gridCoords } from './main.js';

class Control {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.control = canvas.rectangle(x, y, 1, 1);
        this.control2 = canvas.control(x, y);
        this.control.addDependency(this.control2);
        this.control.update = function() {
            [this.x, this.y] = scaleCoords(this.control2.x, this.control2.y);
            [this.x, this.y] = gridCoords(this.x, this.y);
            //[this.x, this.y] = gridCoords(this.control2.x, this.control2.y);
            this.control2.x = this.x;
            this.control2.y = this.y;
            this.control.x = this.x;
            this.control.y = this.y;
        }.bind(this);
    }
}

export { Control };
import { canvas } from '/main.js';
import { Control } from '/control.js';

class Circle {
    constructor() {
        this.x = 80;
        this.y = 80;
        this.r = 40;
        
        this.control1 = new Control(this.x, this.y);
        this.control2 = new Control(this.x - this.r, this.y);
        this.circle = canvas.circle(this.x, this.y, this.r);
        this.circle.stroke = "black";
        this.circle.fill = "none";

        this.circle.addDependency(this.control1.control);
        this.circle.addDependency(this.control2.control);
        this.circle.update = function() {
            this.x = this.control1.x;
            this.y = this.control1.y;
            this.r = Math.sqrt(Math.pow(this.control1.x - this.control2.x, 2) + Math.pow(this.control1.y - this.control2.y, 2));

            this.circle.cx = this.x;
            this.circle.cy = this.y;
            this.circle.r = this.r;
        }.bind(this);
    }
}

document.getElementById("new-circle-btn").onclick = () => {
    new Circle();
}
import { canvas } from './main.js';
import { Control } from './control.js';

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

        this.x_diff = this.control1.x - this.control2.x;
        this.y_diff = this.control1.y - this.control2.y;

        //this.circle.addDependency(this.control1.control);
        this.circle.addDependency(this.control2.control);
        this.circle.update = function() {
            this.r = Math.sqrt(Math.pow(this.control1.x - this.control2.x, 2) + Math.pow(this.control1.y - this.control2.y, 2));

            this.x_diff = this.control1.x - this.control2.x;
            this.y_diff = this.control1.y - this.control2.y;
            
            this.circle.r = this.r;
            window.selectedElem = this;
            window.generate();
        }.bind(this);

        this.control2.control2.addDependency(this.control1.control2);
        this.control2.control2.update = function() {

            this.x = this.control1.x;
            this.y = this.control1.y;

            this.control2.control2.x = this.control1.x - this.x_diff;
            this.control2.control2.y = this.control1.y - this.y_diff;

            this.circle.cx = this.x;
            this.circle.cy = this.y;

            window.selectedElem = this;
            window.generate();
        }.bind(this);

        window.selectedElem = this;
        setTimeout(() => window.generate(), 100);
    }

    render() {
        return `\\draw (${this.x/100}, ${this.y/100}) circle (${Math.round(this.r * 100) / 10000});`;
    }

    remove() {
        this.control1.remove();
        this.control2.remove();
        this.circle.remove();
    }
}

document.getElementById("new-circle-btn").onclick = () => {
    window.elements.push(new Circle());
}
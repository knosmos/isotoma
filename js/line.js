import { canvas } from './main.js';
import { Control } from './control.js';

class Line {
    constructor() {
        this.x = 20;
        this.y = 20;
        this.x2 = 100;
        this.y2 = 100;
        
        this.control1 = new Control(this.x, this.y);
        this.control2 = new Control(this.x2, this.y2);
        this.line = canvas.line(this.x, this.y, this.x2, this.y2);

        this.line.stroke = "#381c65";

        this.line.addDependency(this.control1.control);
        this.line.addDependency(this.control2.control);
        this.line.update = function() {
            this.x = this.control1.x;
            this.y = this.control1.y;
            this.x2 = this.control2.x;
            this.y2 = this.control2.y;

            this.line.x1 = this.x;
            this.line.y1 = this.y;
            this.line.x2 = this.x2;
            this.line.y2 = this.y2;

            window.selectedElem = this;
        }.bind(this);
    }

    render() {
        return `\\draw (${this.x/100},${this.y/100}) -- (${this.x2/100},${this.y2/100});`;
    }

    remove() {
        for (let i of [this.control1, this.control2, this.line]) {
            i.remove();
        }
    }
}

document.getElementById("new-line-btn").onclick = () => {
    window.elements.push(new Line());
}
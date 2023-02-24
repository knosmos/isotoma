import { canvas } from './main.js';
import { Control } from './control.js';

class Rect {
    constructor() {
        this.x1 = 20;
        this.y1 = 20;
        this.x2 = 100;
        this.y2 = 80;
        
        this.tl = new Control(this.x1, this.y1);
        this.br = new Control(this.x2, this.y2);

        this.rect = canvas.rectangle(this.x1, this.y1, this.x2-this.x1, this.y2-this.y1);
        this.rect.stroke = "black";
        this.rect.fill = "none";

        this.rect.addDependency(this.tl.control);
        this.rect.addDependency(this.br.control);
        this.rect.update = function() {
            this.x1 = this.tl.x;
            this.y1 = this.tl.y;
            this.x2 = this.br.x;
            this.y2 = this.br.y;
            
            this.rect.x = Math.min(this.x1, this.x2);
            this.rect.y = Math.min(this.y1, this.y2);

            this.rect.width = Math.abs(this.x2 - this.x1) + 0.001; // avoid zero width/height
            this.rect.height = Math.abs(this.y2 - this.y1) + 0.001;

            window.selectedElem = this;
        }.bind(this);
    }

    render() {
        return `\\draw (${this.x1/100},${this.y1/100}) rectangle (${this.x2/100},${this.y2/100});`;
    }

    remove() {
        for (let i of [this.tl, this.br, this.rect]) {
            i.remove();
        }
    }
}

document.getElementById("new-rect-btn").onclick = () => {
    window.elements.push(new Rect());
}
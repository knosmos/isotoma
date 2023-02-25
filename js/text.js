import { canvas } from './main.js';
import { Control } from './control.js';

class Text {
    constructor() {
        this.x = 20;
        this.y = 60;
        
        this.control = new Control(this.x - 15, this.y - 10);
        this.text = canvas.text(this.x, this.y, prompt("Enter Text:"));

        this.text.addDependency(this.control.control);
        this.text.update = function() {
            this.x = this.control.x + 15;
            this.y = this.control.y + 10;
            
            this.text.x = this.x;
            this.text.y = this.y;

            window.selectedElem = this;
            window.generate();
        }.bind(this);

        window.selectedElem = this;
        setTimeout(() => window.generate(), 100);
    }

    render() {
        return `\\draw (${this.x/100}, ${(this.y - 10)/100}) node[right] {${this.text.contents}};`;
    }

    remove() {
        for (let i of [this.control, this.text]) {
            i.remove();
        }
    }
}

document.getElementById("new-text-btn").onclick = () => {
    window.elements.push(new Text());
}
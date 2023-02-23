import { canvas } from './main.js';
import { Control } from './control.js';

class Text {
    constructor() {
        this.x = 20;
        this.y = 60;
        
        this.control = new Control(this.x - 15, this.y - 8);
        this.text = canvas.text(this.x, this.y, prompt("Enter Text:"));

        this.text.addDependency(this.control.control);
        this.text.update = function() {
            this.x = this.control.x + 15;
            this.y = this.control.y + 8;
            
            this.text.x = this.x;
            this.text.y = this.y;
        }.bind(this);
    }

    render() {
        return `\\draw (${this.x/100}, ${this.y/100}) node[right] {${this.text.contents}};`;
    }
}

document.getElementById("new-text-btn").onclick = () => {
    window.elements.push(new Text());
}
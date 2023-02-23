import { canvas } from './main.js';
import { Control } from './control.js';

class Bezier {
    constructor() {
        // quadratic bezier
        // set up control points
        this.l = new Control(20, 20);
        this.c = new Control(100, 100);
        this.r = new Control(180, 20);

        // add guide lines
        this.lg = canvas.line(this.l.x, this.l.y, this.c.x, this.c.y);
        this.rg = canvas.line(this.c.x, this.c.y, this.r.x, this.r.y);
        this.lg.style.stroke = "#ddd";
        this.rg.style.stroke = "#ddd";

        // add curve
        this.curve = canvas.path(this.getPath());

        this.curve.addDependency(this.l.control);
        this.curve.addDependency(this.c.control);
        this.curve.addDependency(this.r.control);

        // set update function
        this.curve.update = function() {
            this.curve.d = this.getPath();
            
            this.lg.x1 = this.l.x;
            this.lg.y1 = this.l.y;
            this.lg.x2 = this.c.x;
            this.lg.y2 = this.c.y;

            this.rg.x1 = this.c.x;
            this.rg.y1 = this.c.y;
            this.rg.x2 = this.r.x;
            this.rg.y2 = this.r.y;
        }.bind(this);
    }

    getPath() {
        return `M ${this.l.x} ${this.l.y} Q ${this.c.x} ${this.c.y} ${this.r.x} ${this.r.y}`;
    }

    render() {
        let q0 = `(${this.l.x/100},${this.l.y/100})`;
        let q1 = `(${1/3 * this.l.x/100 + 2/3 * this.c.x/100},${1/3 * this.l.y/100 + 2/3 * this.c.y/100})`;
        let q2 = `(${2/3 * this.c.x/100 + 1/3 * this.r.x/100},${2/3 * this.c.y/100 + 1/3 * this.r.y/100})`;
        let q3 = `(${this.r.x/100},${this.r.y/100})`;

        return `\\draw ${q0} .. controls ${q1} and ${q2} .. ${q3};`;
    }
}

document.getElementById("new-curve-btn").onclick = () => {
    window.elements.push(new Bezier());
}
import { canvas } from '/main.js';
import { Control } from '/control.js';

class Curve {
    constructor() {
        this.pts = [];
        this.numPts = 3;
        for (let i=0; i<this.numPts; i++) {
            this.pts.push(new Control(20*i+20, 20 + (i%2)*20));
        }

        this.line = canvas.path(this.getPath());

        for (let i=0; i<this.numPts; i++) {
            this.line.addDependency(this.pts[i].control);
        }

        console.log(this.line);
        
        this.line.update = function() {
            console.log(this.line);
            this.line.d = this.getPath();
        }.bind(this);
    }

    getPath() {
        let path = '';
        for (let i=0; i<this.numPts; i++) {
            path += (i == 0) ? "M " : "T ";
            path += `${this.pts[i].x} ${this.pts[i].y} `;
        }
        console.log(path);
        return path;
    }

    getSmallPath() {
        let path = '';
        for (let i=0; i<this.numPts; i++) {
            path += (i == 0) ? "M " : "T ";
            path += `${this.pts[i].x/100} ${this.pts[i].y/100} `;
        }
        return path;
    }

    render() {
        
        let res = "\\draw plot [smooth, tension=2] coordinates { ";
        for (let i=0; i<this.numPts; i++) {
            res += `(${this.pts[i].x/100},${this.pts[i].y/100}) `;
        }
        res += "};";
        return res;
        
        //return `\\draw svg {${this.getPath()}};`;
    }
}

document.getElementById("new-curve-btn").onclick = () => {
    window.elements.push(new Curve());
}
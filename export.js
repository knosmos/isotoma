function render(elements) {
    let text = '';
    console.log(elements);
    for (let element of elements) {
        text += element.render() + "\n";
    }
    return `\\begin{center}
\\begin{tikzpicture}[yscale=-1]
${text}\\end{tikzpicture}
\\end{center}`;
}

let isOnDiv = false;
let tikzElem = document.getElementById("tikz-output");

tikzElem.addEventListener("mouseenter", () => {isOnDiv=true;});
tikzElem.addEventListener("mouseout", () => {isOnDiv=false;});

setInterval(() => {
    if (isOnDiv) return;
    let tikz = render(window.elements);
    document.getElementById("tikz-output").innerHTML = tikz;
}, 1000);
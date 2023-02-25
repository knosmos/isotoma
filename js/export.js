function render(elements) {
    let text = '';
    console.log(elements);
    for (let i=0; i<elements.length; i++) {
        let element = elements[i];
        if (window.selectedElem == element) {
            text += `<span class="delete-btn" onclick="delElem(${i})">✕</span><span class="selected-elem">${element.render()}</span>\n`;
        }
        else {
            text += element.render() + "\n";
        }
    }
    return `\\begin{center}
\\begin{tikzpicture}[yscale=-1]
${text}\\end{tikzpicture}
\\end{center}`;
}

function renderTextOnly(elements) {
    let text = '';
    console.log(elements);
    for (let i=0; i<elements.length; i++) {
        let element = elements[i];
        text += element.render() + "\n";
    }
    return `\\begin{center}
\\begin{tikzpicture}[yscale=-1]
${text}\\end{tikzpicture}
\\end{center}`;
}

function delElem(i) {
    elements[i].remove();
    window.elements.splice(i,1);
    generate();
}

let tikzElem = document.getElementById("tikz-output");

function generate() {
    let tikz = render(window.elements);
    tikzElem.innerHTML = tikz;
}

setTimeout(() => generate(), 100); // wait for initialization to complete

document.getElementById("copy-tikz").onclick = () => {
    let text = renderTextOnly(window.elements);
    navigator.clipboard.writeText(text).then(function() {
        console.log('Copying to clipboard was successful!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}
import html2canvas from "node_modules/html2canvas/dist/html2canvas.js";

console.log("THIS is html2canvas action file");
html2canvas(document.querySelector("#Test")).then(canvas => {
    document.body.appendChild(canvas)
});
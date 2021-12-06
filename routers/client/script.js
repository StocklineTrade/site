const canvas = document.getElementById('market');
const ctx = canvas.getContext('2d');

function canvasResize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
} canvasResize();
canvas.onresize = canvasResize;
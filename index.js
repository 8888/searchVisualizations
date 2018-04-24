'use strict';

import { binarySearch } from './search.js';

const canvas = document.getElementById('canvasElement');
canvas.tabIndex = 0;
canvas.focus();
// canvas parameters
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasBounds = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');

// temporary values
const searchField = [8,13,22,27,35,42,49,55,58,60,73,79,88,94,101];
const searchTarget = 88;
const searchPath = binarySearch(searchField, searchTarget);

function init() {}

function update(delta) {}

function display() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#000000'; // black
    ctx.strokeStyle = '#000000';
    const fontSize = 12;
    ctx.font = fontSize.toString + 'px Verdana';
    ctx.textAlign = 'start';
    ctx.lineWidth = 2;

    const margin = 25;

    ctx.fillText(
        'Search Target: ' + searchTarget.toString(),
        margin,
        margin
    );

    // draw the number field
    const y = 300;
    const spacing = 40;
    for (let i = 0; i < searchField.length; i++) {
        ctx.textAlign = 'center';
        const x = margin + (i * spacing);
        ctx.fillText(searchField[i], x, y);
    }

    // draw the search path
    let lineOriginX = margin + searchPath[0] * spacing; // center number is first
    let lineOriginY = 100;
    for (let i = 0; i < searchPath.length; i++) {
        // searchPath is an array of indexes
        const x = margin + searchPath[i] * spacing; // x of number
        // draw line path
        // horizontal
        ctx.strokeStyle = '#33cc33'; // green
        ctx.beginPath();
        ctx.moveTo(lineOriginX, lineOriginY + (i * spacing));
        ctx.lineTo(x, lineOriginY + (i * spacing));
        ctx.stroke();
        lineOriginX = x;
        // vertical part 1
        ctx.beginPath();
        ctx.moveTo(x, lineOriginY + (i * spacing));
        ctx.lineTo(x, lineOriginY + (spacing * (i + 1))); // center is 1/2 fontSize and radius is fontSize
        ctx.stroke();
        // change color if this is an incorrect path
        ctx.strokeStyle = searchField[searchPath[i]] == searchTarget ? '#33cc33' : '#cc0000'; // red
        // vertical part 2
        ctx.beginPath();
        ctx.moveTo(x, lineOriginY + (spacing * (i + 1)));
        ctx.lineTo(x, y - (fontSize * 1.5)); // center is 1/2 fontSize and radius is fontSize
        ctx.stroke();
        // draw outline circle
        ctx.beginPath();
        ctx.arc(x, y - (fontSize/2), fontSize, 0, 2 * Math.PI);
        // this centers the circle on the font
        ctx.stroke();
    }
}

window.onload = function() {
    init();
    let mainloop_updateLast = performance.now();
    (function mainLoop(nowTime) {
        update(nowTime - mainloop_updateLast);
        display();
        mainloop_updateLast = nowTime;
        requestAnimationFrame(mainLoop);
    })(performance.now());
};

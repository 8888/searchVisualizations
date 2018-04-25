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

// drawing sizes
const margin = 25;
const fontSize = 12;

// mouse location
let mouseX = null;
let mouseY = null;

// temporary values
const searchField = [8,13,22,27,35,42,49,55,58,60,73,79,88,94,101];
let searchTarget = 88;
let searchPath = [];

// input box
let searchTargetInputFocus = false;

function init() {
    // user input
    canvas.addEventListener('mousemove', function(event) {
        mouseX = event.clientX - canvasBounds.left;
        mouseY = event.clientY - canvasBounds.top;
    });

    canvas.addEventListener('mousedown', function(event) {
        if (event.button === 0) { // left click
            // check if input box was clicked
            if (
                mouseX >= margin &&
                mouseX <= margin + fontSize * 5 &&
                mouseY >= margin + fontSize &&
                mouseY <= margin + fontSize + fontSize * 1.5
            ) {
                searchTargetInputFocus = true;
            } else {
                searchTargetInputFocus = false;
            }
        }
    });

    canvas.addEventListener('keydown', function(event) {
        if (searchTargetInputFocus) {
            if (event.keyCode >= 48 && event.keyCode <= 57) {
                // 0-9 is keycode 48-57
                searchTarget = parseInt(searchTarget.toString() + (event.keyCode - 48).toString(), 10);
            } else if (event.keyCode >= 96 && event.keyCode <= 105) {
                // numpad 0-9 is keycode 96-105
                searchTarget = parseInt(searchTarget.toString() + (event.keyCode - 96).toString(), 10);
            } else if (event.keyCode == 8) {
                // backspace
                searchTarget = Math.floor(searchTarget / 10);
            }
        }
    });
}

function update(delta) {
    searchPath = binarySearch(searchField, searchTarget);
}

function display() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#000000'; // black
    ctx.strokeStyle = '#000000';
    ctx.font = fontSize.toString + 'px Verdana';
    ctx.textAlign = 'start';
    ctx.lineWidth = 2;

    // search target
    ctx.fillText(
        'Search Target: ' + searchTarget.toString(),
        margin,
        margin
    );
    ctx.strokeRect(margin, margin + fontSize, fontSize * 5, fontSize * 1.5);
    ctx.fillText(searchTarget.toString(), margin + fontSize / 2, (margin + fontSize) + (fontSize * 1.5) - (fontSize * 0.5)); // rectY + rectHeight - 1/2 font

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

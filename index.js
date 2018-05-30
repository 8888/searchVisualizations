'use strict';

import { binarySearch } from './search.js';
import * as bst from './binarySearchTree.js';

const mainCanvas = document.getElementById('mainCanvasElement');
const sideCanvas = document.getElementById('sideCanvasElement');
mainCanvas.tabIndex = 0;
mainCanvas.focus();
// mainCanvas parameters
const mainCanvasWidth = mainCanvas.width;
const mainCanvasHeight = mainCanvas.height;
const mainCanvasBounds = mainCanvas.getBoundingClientRect();
const mainCtx = mainCanvas.getContext('2d');
// sideCanvas parameters
const sideCanvasWidth = sideCanvas.width;
const sideCanvasHeight = sideCanvas.height;
const sideCanvasBounds = sideCanvas.getBoundingClientRect();
const sideCtx = sideCanvas.getContext('2d');

// drawing sizes
const margin = 25;
const fontSize = 10;

// temporary values
const searchField = [8,13,22,27,35,42,49,55,58,60,73,79,88,94,101];
let searchTarget = 88;
let searchPath = [];
const searchTree = bst.balance(bst.createFromArray(searchField));
let step = -1;

const getUserInput = (reset = false) => {
    // gets value from user input box
    // resets value if true
    const value = document.getElementById('side-bar-input').value;
    if (reset) {
        document.getElementById('side-bar-input').value = '';
    }
    return parseInt(value);
};

function init() {
    // create event listeners
    document.getElementById('side-bar-step').addEventListener('click', () => {
        if (step < searchPath.length - 1) {
            step += 1;
        } else {
            step = -1;
        }
    });

    document.getElementById('side-bar-search-target').addEventListener('click', () => {
        const value = getUserInput(true);
        if (value) {
            searchTarget = value;
            step = -1;
        }
    });
}

function update(delta) {
    searchPath = binarySearch(searchField, searchTarget);
}

function display() {
    // all drawing is currently very inefficient
    // portions are redrawn every frame even when they don't change
    // functions are redefined every frame
    // this is purely prototype at this point just to see how it will look
    mainCtx.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
    sideCtx.clearRect(0, 0, sideCanvasWidth, sideCanvasHeight);

    // search target
    sideCtx.fillStyle = '#000000'; // black
    sideCtx.font = (fontSize * 1.5).toString() + 'px Verdana';
    sideCtx.fillText(
        'Search Target: ' + searchTarget.toString(),
        2,
        margin
    );
    sideCtx.fillText(
        'Tree Height: ' + bst.height(searchTree),
        2,
        margin * 2
    );
    sideCtx.fillText(
        'Total Nodes: ' + searchField.length,
        2,
        margin * 3
    );
    sideCtx.fillText(
        'Current Search Step: ' + (step + 1),
        2,
        margin * 4
    );

    mainCtx.fillStyle = '#000000'; // black
    mainCtx.strokeStyle = '#000000';
    mainCtx.font = fontSize.toString() + 'px Verdana';
    mainCtx.textAlign = 'start';
    mainCtx.lineWidth = 2;

    // draw the number field
    const y = 300;
    const spacing = 40;
    for (let i = 0; i < searchField.length; i++) {
        mainCtx.textAlign = 'center';
        const x = margin + (i * spacing);
        mainCtx.fillText(searchField[i], x, y);
    }

    // draw the search path
    function drawSearchPath(i) {
        // searchPath is an array of indexes
        const x = margin + searchPath[i] * spacing; // x of number
        // draw line path
        // horizontal
        mainCtx.strokeStyle = '#33cc33'; // green
        mainCtx.beginPath();
        mainCtx.moveTo(lineOriginX, lineOriginY + (i * spacing));
        mainCtx.lineTo(x, lineOriginY + (i * spacing));
        mainCtx.stroke();
        lineOriginX = x;
        // vertical part 1
        mainCtx.beginPath();
        mainCtx.moveTo(x, lineOriginY + (i * spacing));
        mainCtx.lineTo(x, lineOriginY + (spacing * (i + 1))); // center is 1/2 fontSize and radius is fontSize
        mainCtx.stroke();
        // change color if this is an incorrect path
        mainCtx.strokeStyle = searchField[searchPath[i]] == searchTarget ? '#33cc33' : '#cc0000'; // red
        // vertical part 2
        mainCtx.beginPath();
        mainCtx.moveTo(x, lineOriginY + (spacing * (i + 1)));
        mainCtx.lineTo(x, y - (fontSize * 1.5)); // center is 1/2 fontSize and radius is fontSize
        mainCtx.stroke();
        // draw outline circle
        mainCtx.beginPath();
        mainCtx.arc(x, y - (fontSize/2), fontSize, 0, 2 * Math.PI);
        // this centers the circle on the font
        mainCtx.stroke();
    }

    let lineOriginX = margin + searchPath[0] * spacing; // center number is first
    let lineOriginY = 100;
    if (step != -1) {
        for (let i = 0; i <= step; i++) {
            drawSearchPath(i);
        }
    }

    // draw the binary search tree
    function drawBst(tree, x, y, layerSpacing, height) {
        // draw current node
        mainCtx.strokeStyle = '#000000'; // black
        mainCtx.lineWidth = 2;
        mainCtx.fillText(tree.k, x, y);
        mainCtx.beginPath();
        if (step !== -1 && searchPath[step] === tree.v) {
            // currently searching on this node
            mainCtx.strokeStyle = '#0061ff'; // blue
            mainCtx.lineWidth = 4;
        }
        mainCtx.arc(x, y, fontSize, 0, 2 * Math.PI);
        mainCtx.stroke();
        // reset values
        mainCtx.strokeStyle = '#000000';
        mainCtx.lineWidth = 2;
        // parents draw lines to their children
        // then recursively draw lower nodes
        if (tree.l) {
            mainCtx.beginPath();
            mainCtx.moveTo(x - fontSize, y); // x - radius
            mainCtx.lineTo(
                x - layerSpacing - (Math.pow(5, height)), // childX center
                y + layerSpacing - fontSize // childY - radius
            );
            mainCtx.stroke();
            drawBst(
                tree.l,
                x - layerSpacing - (Math.pow(5, height)),
                y + layerSpacing,
                layerSpacing,
                height - 1
            );
        }
        if (tree.r) {
            mainCtx.beginPath();
            mainCtx.moveTo(x + fontSize, y); // x + radius
            mainCtx.lineTo(
                x + layerSpacing + (Math.pow(5, height)), // childX center
                y + layerSpacing - fontSize // childY - radius
            );
            mainCtx.stroke();
            drawBst(
                tree.r,
                x + layerSpacing + (Math.pow(5, height)),
                y + layerSpacing,
                layerSpacing,
                height - 1
            );
        }
    }
    const bstOriginX = 360;
    const bstOriginY = 360;
    // spacing will be decided by height
    const height = bst.height(searchTree);
    const layerSpacing = 50;
    drawBst(searchTree, bstOriginX, bstOriginY, layerSpacing, height);
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

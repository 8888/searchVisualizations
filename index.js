'use strict';

import * as bsa from './search/binarySearchAlgorithm.js';
import * as bst from './search/binarySearchTree.js';
import * as Draw from './view/draw.js';

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
const defaultStyle = Draw.styleParameters(
    '#000000', // fillStyle - black
    '#000000', // strokeStyle
    2, // lineWidth
    10, // fontSize
    'Verdana', // fontName
    'start', // textAlign
    25, // xMargin
    25, // yMargin
    {arrayStart: 0, arrayValues: 40, bstOrigin: 360}, // xSpacing
    {arrayCenter: 300, arrayLineOrigin: 100, bstOrigin: 360, bstLayer: 50} // ySpacing
);

// temporary values
// let searchField = [8,13,22,27,35,42,49,55,58,60,73,79,88,94,101];
let searchField = [8,13,35,58,60,79,88];
let searchTarget = 88;
let searchPath = [];
let searchTree = bst.balance(bst.createFromArray(searchField));
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

    document.getElementById('side-bar-insert').addEventListener('click', () => {
        const value = getUserInput(true);
        if (value) {
            searchField = bsa.sortedInsert(value, searchField);
            step = -1;
        }
    });

    document.getElementById('side-bar-remove').addEventListener('click', () => {
        const value = getUserInput(true);
        if (value) {
            searchField = bsa.remove(value, searchField);
            step = -1;
        }
    });
}

function update(delta) {
    searchPath = bsa.binarySearchPath(searchField, searchTarget);
    searchTree = bst.balance(bst.createFromArray(searchField));
}

function display() {
    // all drawing is currently very inefficient
    // portions are redrawn every frame even when they don't change
    // this is purely prototype at this point just to see how it will look
    mainCtx.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
    sideCtx.clearRect(0, 0, sideCanvasWidth, sideCanvasHeight);
    Draw.updateCanvasStyle(mainCtx, defaultStyle);
    Draw.updateCanvasStyle(sideCtx, defaultStyle);

    Draw.drawStats(
        sideCtx,
        searchTarget,
        bst.height(searchTree),
        searchField.length,
        step,
        defaultStyle
    );
    Draw.updateCanvasStyle(sideCtx, defaultStyle);

    Draw.drawArrayField(
        mainCtx,
        searchField,
        defaultStyle.xSpacing['arrayStart'],
        defaultStyle.ySpacing['arrayCenter'],
        defaultStyle.xSpacing['arrayValues'],
        defaultStyle
    );
    Draw.updateCanvasStyle(mainCtx, defaultStyle);

    Draw.drawSearchPath(
        mainCtx,
        searchField,
        searchTarget,
        searchPath,
        step,
        defaultStyle.xSpacing['arrayValues'],
        defaultStyle.ySpacing['arrayLineOrigin'],
        defaultStyle.ySpacing['arrayCenter'],
        defaultStyle
    );
    Draw.updateCanvasStyle(mainCtx, defaultStyle);

    Draw.drawBst(
        mainCtx,
        searchTree,
        step,
        searchPath,
        defaultStyle.xSpacing['bstOrigin'],
        defaultStyle.ySpacing['bstOrigin'],
        defaultStyle.ySpacing['bstLayer'],
        bst.height(searchTree),
        defaultStyle
    );
    Draw.updateCanvasStyle(mainCtx, defaultStyle);
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

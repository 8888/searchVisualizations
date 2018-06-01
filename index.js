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

// starting values
// const startingField = [8,13,22,27,35,42,49,55,58,60,73,79,88,94,101];
const startingField = [8,13,35,58,60,79,88];
const startingTarget = 88;
let state = {
    searchField: null,
    searchTarget: null,
    searchPath: null,
    searchTree: null,
    step: null,
    statsAreDirty: false,
    searchIsDirty: false
};
let updatedState = {
    searchField: startingField,
    searchTarget: startingTarget,
    step: -1
};

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
        if (state.step < state.searchPath.length - 1) {
            updatedState.step += 1;
        } else {
            updatedState.step = -1;
        }
    });

    document.getElementById('side-bar-search-target').addEventListener('click', () => {
        const value = getUserInput(true);
        if (value) {
            updatedState.searchTarget = value;
            updatedState.step = -1;
        }
    });

    document.getElementById('side-bar-insert').addEventListener('click', () => {
        const value = getUserInput(true);
        if (value) {
            updatedState.searchField = bsa.sortedInsert(value, state.searchField);
            updatedState.step = -1;
        }
    });

    document.getElementById('side-bar-remove').addEventListener('click', () => {
        const value = getUserInput(true);
        if (value) {
            updatedState.searchField = bsa.remove(value, state.searchField);
            updatedState.step = -1;
        }
    });
}

function update(delta) {
    // check if values have changed
    if (state.searchField !== updatedState.searchField || state.searchTarget !== updatedState.searchTarget) {
        state.searchField = updatedState.searchField;
        state.searchTarget = updatedState.searchTarget;
        state.searchPath = bsa.binarySearchPath(state.searchField, state.searchTarget);
        state.searchTree = bst.balance(bst.createFromArray(state.searchField));
        state.statsAreDirty = true;
        state.searchIsDirty = true;
    }
    if (state.step !== updatedState.step) {
        state.step = updatedState.step;
        state.statsAreDirty = true;
        state.searchIsDirty = true;
    }
}

function display() {
    if (state.statsAreDirty) {
        // draw the stats canvas
        sideCtx.clearRect(0, 0, sideCanvasWidth, sideCanvasHeight);
        Draw.updateCanvasStyle(sideCtx, defaultStyle);

        Draw.drawStats(
            sideCtx,
            state.searchTarget,
            bst.height(state.searchTree),
            state.searchField.length,
            state.step,
            defaultStyle
        );
        state.statsAreDirty = false;
    }

    if (state.searchIsDirty) {
        // draw the search canvas
        mainCtx.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
        Draw.updateCanvasStyle(mainCtx, defaultStyle);

        if (state.searchField.length) {
            Draw.drawArrayField(
                mainCtx,
                state.searchField,
                defaultStyle.xSpacing['arrayStart'],
                defaultStyle.ySpacing['arrayCenter'],
                defaultStyle.xSpacing['arrayValues'],
                defaultStyle
            );
            Draw.updateCanvasStyle(mainCtx, defaultStyle);

            Draw.drawSearchPath(
                mainCtx,
                state.searchField,
                state.searchTarget,
                state.searchPath,
                state.step,
                defaultStyle.xSpacing['arrayValues'],
                defaultStyle.ySpacing['arrayLineOrigin'],
                defaultStyle.ySpacing['arrayCenter'],
                defaultStyle
            );
            Draw.updateCanvasStyle(mainCtx, defaultStyle);

            Draw.drawBst(
                mainCtx,
                state.searchTree,
                state.step,
                state.searchPath,
                defaultStyle.xSpacing['bstOrigin'],
                defaultStyle.ySpacing['bstOrigin'],
                defaultStyle.ySpacing['bstLayer'],
                bst.height(state.searchTree),
                defaultStyle
            );
        }
        state.searchIsDirty = false;
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

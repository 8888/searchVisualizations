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
let mainMouseX = {old: null, new: null};
let mainMouseY = {old: null, new: null};
let mainMouseDrag = false;
let mainOriginX = 0;
let mainOriginY = 0;
let mainScaleFactor = 1;
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
    {arrayStart: 0, arrayValues: 40, bstOrigin: 360, bstNode: 15}, // xSpacing
    {arrayCenter: 300, arrayLineOrigin: 100, bstOrigin: 360, bstLayer: 50} // ySpacing
);

// starting values
const startingField = [8,13,22,27,35,42,49,55,58,60,73,79,88,94,101];
const startingTarget = 88;
let state = {
    searchField: null,
    searchTarget: null,
    searchPath: null,
    searchTree: null,
    step: null,
    statsAreDirty: false,
    searchIsDirty: false,
    mainScaleFactor: 1 // total scale to draw at
};
let updatedState = {
    searchField: startingField,
    searchTarget: startingTarget,
    step: -1,
    mainScaleFactor: state.mainScaleFactor
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

const handleFiles = (files) => {
    // files is a FileList array like object, not a normal array
    // this handles multiple files by default
    // but currently this will only use the last file to create data from
    // it will actually use them all, but keep overwriting each other
    // since FileReader is async, there's no gurantee on what file will be last
    const reader = new FileReader();
    reader.onload = (event) => {
        const result = JSON.parse(event.target.result);
        updatedState.searchField = result;
        updatedState.step = -1;
    };
    [...files].forEach(file => {
        if (file.type == 'application/json') {
            reader.readAsText(file);
        }
    });
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

    document.getElementById('side-bar-file-drop').addEventListener('dragover', (event) => {
        // prevent default browser behavior
        event.preventDefault();
        event.stopPropagation();
    });

    document.getElementById('side-bar-file-drop').addEventListener('drop', (event) => {
        // prevent default browser behavior
        event.preventDefault();
        event.stopPropagation();
        // access the dropped files
        handleFiles(event.dataTransfer.files);
    });

    // canvas event listeners
    mainCanvas.addEventListener('mousemove', (event) => {
        mainMouseX.new = event.clientX - mainCanvasBounds.left;
        mainMouseY.new = event.clientY - mainCanvasBounds.top;
    });

    mainCanvas.addEventListener('mousedown', (event) => {
        if (event.button === 0) { // left click
            mainMouseDrag = true;
            mainMouseX.old = event.clientX - mainCanvasBounds.left;
            mainMouseY.old = event.clientY - mainCanvasBounds.top;
        }
    });

    mainCanvas.addEventListener('mouseup', (event) => {
        if (event.button === 0) { // left click
            mainMouseDrag = false;
        }
    });

    const handleScrollWheel = (event) => {
        // event.deltaY = 100 for wheel down (zoom out)
        // event.deltaY = -100 for wheel up (zoom in)
        // scale factor should be +0.1 for zoom out (using 100)
        // scale factor should be -0.1 for zoom in (using -100)
        // 1 - (100 * .001) = 0.9 (zoom out -> everything is drawn at 0.9x size)
        // 1 - (-100 * .001) = 1.1 (zoom in -> everything is drawn at 1.1x size)
        const scaleFactor = (event.deltaY * .001); // current change
        updatedState.mainScaleFactor -= scaleFactor;
    };

    mainCanvas.addEventListener('mousewheel', handleScrollWheel);
    mainCanvas.addEventListener('DOMMouseScroll', handleScrollWheel);
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

    // pan
    if (mainMouseDrag) {
        const dx = (mainMouseX.new - mainMouseX.old) / mainScaleFactor;
        const dy = (mainMouseY.new - mainMouseY.old) / mainScaleFactor;
        mainMouseX.old = mainMouseX.new;
        mainMouseY.old = mainMouseY.new;
        mainOriginX += dx;
        mainOriginY += dy;
        state.searchIsDirty = true;
    }

    // zoom
    if (state.mainScaleFactor !== updatedState.mainScaleFactor) {
        // scale factor has changed
        const oldScale = state.mainScaleFactor;
        const newScale = updatedState.mainScaleFactor;
        // adjust origin to keep the point that cursor is at from moving
        // location in old scale units
        // mouse and origin are at 1:1 real scale
        const x = (mainMouseX.new - mainOriginX) / oldScale;
        const y = (mainMouseY.new - mainOriginY) / oldScale;
        // calculate different in real scale
        const dx = (x * oldScale) - (x * newScale);
        const dy = (y * oldScale) - (y * newScale);
        // adjust origin
        mainOriginX += dx;
        mainOriginY += dy;
        // set new state
        state.mainScaleFactor = newScale;
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
        // clear entire canvase, even if transformed
        mainCtx.save();
        mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        mainCtx.clearRect(0, 0, mainCanvasWidth, mainCanvasHeight);
        mainCtx.restore();

        mainCtx.save(); // save origin before pan and zoom
        mainCtx.translate(mainOriginX, mainOriginY); // pan
        mainCtx.scale(state.mainScaleFactor, state.mainScaleFactor); // zoom

        Draw.updateCanvasStyle(mainCtx, defaultStyle); // init defaults

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
                defaultStyle.xSpacing['bstNode'],
                defaultStyle.ySpacing['bstLayer'],
                bst.height(state.searchTree),
                defaultStyle
            );
        }
        state.searchIsDirty = false;
        mainCtx.restore(); // restore from pre-transform save
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

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

const searchField = [8,13,19,22,27,35,42,49,55,58,60,73,79,88,94,101];
const searchTarget = 88;

function init() {
    console.log(binarySearch(searchField, searchTarget));
    console.log(binarySearch([0,1,2,3,4,5,6,7,8,9], -1));
}

function update(delta) {}

function display() {}

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

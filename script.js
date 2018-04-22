'use strict';

const canvas = document.getElementById('canvasElement');
canvas.tabIndex = 0;
canvas.focus();
// canvas parameters
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasBounds = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');

function init() {}

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

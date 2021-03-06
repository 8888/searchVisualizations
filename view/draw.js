'use strict';

const styleParameters = (
    fillStyle,
    strokeStyle,
    lineWidth,
    fontSize,
    fontName,
    textAlign,
    xMargin = 0,
    yMargin = 0,
    xSpacing = {},
    ySpacing = {}
) => {
    // creates an object of default drawing style parameters
    // all required params will map to canvas ctx params
    // all optionals can be used for layout purposes
    // xSpacing and ySpacing are optional objects
    // this can be used for user defined implementations such as
    // xSpacing = {gutter: 2, imageSpacing: 2}
    const params = {
        fillStyle: fillStyle,
        strokeStyle: strokeStyle,
        lineWidth: lineWidth,
        fontSize: fontSize,
        fontName: fontName,
        textAlign: textAlign,
        xMargin: xMargin,
        yMargin: yMargin,
        xSpacing: xSpacing,
        ySpacing: ySpacing
    };
    return params;
};

const updateCanvasStyle = (ctx, params) => {
    // updates the canvas ctx formatting
    // uses the information from the provided params object
    ctx.fillStyle = params.fillStyle;
    ctx.strokeStyle = params.strokeStyle;
    ctx.lineWidth = params.lineWidth;
    const font = params.fontSize.toString() + 'px ' + params.fontName;
    ctx.font = font;
    ctx.textAlign = params.textAlign;
};

const drawStats = (ctx, target, height, nodes, step, root, min, max, styleParams) => {
    // draws the basic stats to the canvas
    ctx.font = (styleParams.fontSize * 1.5).toString() + 'px ' + styleParams.fontName;
    ctx.fillText(
        'Search Target: ' + target,
        2,
        styleParams.xMargin
    );
    ctx.fillText(
        'Current Search Step: ' + (step + 1),
        2,
        styleParams.xMargin * 2
    );
    ctx.fillText(
        'Tree Height: ' + height,
        2,
        styleParams.xMargin * 3
    );
    ctx.fillText(
        'Total Nodes: ' + nodes,
        2,
        styleParams.xMargin * 4
    );
    ctx.fillText(
        'Root: ' + root,
        2,
        styleParams.xMargin * 5
    );
    ctx.fillText(
        'Min: ' + min,
        2,
        styleParams.xMargin * 6
    );
    ctx.fillText(
        'Max: ' + max,
        2,
        styleParams.xMargin * 7
    );
};

const drawArrayField = (ctx, searchField, x, y, xSpacing, xMargin) => {
    // draw the search field in array form
    ctx.textAlign = 'center';
    for (let i = 0; i < searchField.length; i++) {
        ctx.fillText(
            searchField[i],
            x + xMargin + (i * xSpacing),
            y
        );
    }
};

const _drawSearchPath = (
    ctx,
    index,
    xMargin,
    xSpacing,
    xOrigin,
    ySpacing,
    yOrigin,
    yEnd,
    correctPath,
    nodeRadius
) => {
    // draw single search path
    // searchPath is an array of indexes
    const xEnd = xMargin + index * xSpacing; // x of number
    // draw line path
    // horizontal
    ctx.strokeStyle = '#33cc33'; // green
    ctx.beginPath();
    ctx.moveTo(xOrigin, yOrigin);
    ctx.lineTo(xEnd, yOrigin);
    ctx.stroke();
    // vertical part 1
    ctx.beginPath();
    ctx.moveTo(xEnd, yOrigin);
    ctx.lineTo(xEnd, yOrigin + ySpacing);
    ctx.stroke();
    // change color if this is an incorrect path
    ctx.strokeStyle = correctPath ? ctx.strokeStyle : '#cc0000'; // red
    // vertical part 2
    ctx.beginPath();
    ctx.moveTo(xEnd, yOrigin + ySpacing);
    ctx.lineTo(xEnd, yEnd - (nodeRadius * 1.5)); // center is 1/2 radius
    ctx.stroke();
    // draw outline circle
    ctx.beginPath();
    ctx.arc(xEnd, yEnd - (nodeRadius/2), nodeRadius, 0, 2 * Math.PI);
    // this centers the circle on the font
    ctx.stroke();
};

const drawSearchPath = (
    ctx,
    searchField,
    searchTarget,
    path,
    step,
    xMargin,
    xSpacing,
    ySpacing,
    yEnd,
    nodeRadius
) => {
    // public api to draw the array search paths
    for (let i = 0; i <= step; i++) {
        const correctPath = searchField[path[i]] == searchTarget;
        // sets x as the center of displayed number for this search path
        const xOrigin = xMargin + path[i - 1] * xSpacing;
        // subtracting because lower y value is higher on grid
        // start at the top and work lower
        // yEnd is the center point of the numbers array
        // ((path.length - i) * ySpacing) sets heigh needed to accomodate length of path
        // (ySpacing * .75) is to give padding above the array
        const yOrigin = yEnd - ((path.length - i) * ySpacing) - (ySpacing * .75);
        _drawSearchPath(
            ctx,
            path[i],
            xMargin,
            xSpacing,
            xOrigin,
            ySpacing,
            yOrigin,
            yEnd,
            correctPath,
            nodeRadius
        );
    }
};

const drawBst = (ctx, tree, step, path, x, y, nodeSpacing, layerSpacing, height, nodeRadius) => {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // draw current node
    ctx.fillText(tree.k, x, y);
    ctx.beginPath();
    if (step !== -1 && path[step] === tree.v) {
        // currently searching on this node
        ctx.strokeStyle = '#0061ff'; // blue
        ctx.lineWidth = 4;
    }
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.stroke();
    // reset values
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    // parents draw lines to their children
    // then recursively draw lower nodes
    if (tree.l) {
        ctx.beginPath();
        ctx.moveTo(x - nodeRadius, y); // x - radius
        ctx.lineTo(
            // Math.pow(2, height) = number of nodes at this height
            x - (nodeSpacing * Math.pow(2, height)), // childX center
            y + layerSpacing - nodeRadius // childY - radius
        );
        ctx.stroke();
        drawBst(
            ctx,
            tree.l,
            step,
            path,
            x - (nodeSpacing * Math.pow(2, height)),
            y + layerSpacing,
            nodeSpacing,
            layerSpacing,
            height - 1,
            nodeRadius
        );
    }
    if (tree.r) {
        ctx.beginPath();
        ctx.moveTo(x + nodeRadius, y); // x + radius
        ctx.lineTo(
            x + (nodeSpacing * Math.pow(2, height)), // childX center
            y + layerSpacing - nodeRadius // childY - radius
        );
        ctx.stroke();
        drawBst(
            ctx,
            tree.r,
            step,
            path,
            x + (nodeSpacing * Math.pow(2, height)),
            y + layerSpacing,
            nodeSpacing,
            layerSpacing,
            height - 1,
            nodeRadius
        );
    }
};

export {
    styleParameters,
    updateCanvasStyle,
    drawStats,
    drawArrayField,
    drawSearchPath,
    drawBst
};

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

export {
    styleParameters,
    updateCanvasStyle
};

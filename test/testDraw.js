'use strict';

import * as Draw from '../view/draw.js';

describe('draw', function() {
    describe('styleParameters()', function() {
        it('returns correct object: ', function() {
            chai.expect(Draw.styleParameters(
                '#000000',
                '#000000',
                2,
                10,
                'Verdana',
                'start',
                1,
                5,
                {gutter: 16},
                {gutter: 20}
            )).eql({
                fillStyle: '#000000',
                strokeStyle: '#000000',
                lineWidth: 2,
                fontSize: 10,
                fontName: 'Verdana',
                textAlign: 'start',
                xMargin: 1,
                yMargin: 5,
                xSpacing: {gutter: 16},
                ySpacing: {gutter: 20}
            });
        });
    });
    describe('updateCanvasStyle()', function() {
        let canvasElement;
        let ctx;
        let defaultParams;
        beforeEach(function() {
            canvasElement = document.createElement('canvas');
            ctx = canvasElement.getContext('2d');
            defaultParams = Draw.styleParameters(
                '#888888',
                '#1ee1ee',
                2,
                16,
                'Verdana',
                'center',
                1,
                5,
                {gutter: 16},
                {gutter: 20}
            );
        });
        it('sets ctx fillStyle property: ', function() {
            Draw.updateCanvasStyle(ctx, defaultParams);
            chai.expect(ctx.fillStyle).equal('#888888');
        });
        it('sets ctx strokeStyle property: ', function() {
            Draw.updateCanvasStyle(ctx, defaultParams);
            chai.expect(ctx.strokeStyle).equal('#1ee1ee');
        });
        it('sets ctx lineWidth property: ', function() {
            Draw.updateCanvasStyle(ctx, defaultParams);
            chai.expect(ctx.lineWidth).equal(2);
        });
        it('sets ctx font property: ', function() {
            Draw.updateCanvasStyle(ctx, defaultParams);
            chai.expect(ctx.font).equal('16px Verdana');
        });
        it('sets ctx textAlign property: ', function() {
            Draw.updateCanvasStyle(ctx, defaultParams);
            chai.expect(ctx.textAlign).equal('center');
        });
    });
});

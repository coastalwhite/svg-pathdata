import { assert } from 'chai'
import { SVGPathData } from '../src'

describe('Basic tests', function () {
    assert.equal(new SVGPathData('abcd').toString(), 'abcd')
})

describe('Curves', function () {
    it('should be that curves work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .curveTo(10.1, 10.9, 30.5, 15.2, 20.7, 5.8)
                .closePath()
                .toString(),
            'M 5 5 C 30.5 15.2, 20.7 5.8, 10.1 10.9 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .curveRelativeTo(10.1, 10.9, 30.5, 15.2, 20.7, 5.8)
                .closePath()
                .toString(),
            'M 5 5 c 30.5 15.2, 20.7 5.8, 10.1 10.9 Z',
        )
    })

    it('should be that smooth curves work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .smoothCurveTo(10.1, 10.9, 20.7, 5.8)
                .closePath()
                .toString(),
            'M 5 5 S 20.7 5.8, 10.1 10.9 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .smoothCurveRelativeTo(10.1, 10.9, 20.7, 5.8)
                .closePath()
                .toString(),
            'M 5 5 s 20.7 5.8, 10.1 10.9 Z',
        )
    })

    it('should be that quadratic curves work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .quadraticCurveTo(10.1, 10.9, 20.7, 5.8)
                .closePath()
                .toString(),
            'M 5 5 Q 20.7 5.8, 10.1 10.9 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .quadraticCurveRelativeTo(10.1, 10.9, 20.7, 5.8)
                .closePath()
                .toString(),
            'M 5 5 q 20.7 5.8, 10.1 10.9 Z',
        )
    })

    it('should be that quadratic string work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .quadraticStringTo(10.1, 10.9)
                .closePath()
                .toString(),
            'M 5 5 T 10.1 10.9 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .quadraticStringRelativeTo(10.1, 10.9)
                .closePath()
                .toString(),
            'M 5 5 t 10.1 10.9 Z',
        )
    })
})

describe('Lines', function () {
    it('should be that lines work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .lineTo(10.0, 10.0)
                .closePath()
                .toString(),
            'M 5 5 L 10 10 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .lineRelativeTo(5.0, 5.0)
                .closePath()
                .toString(),
            'M 5 5 l 5 5 Z',
        )
    })

    it('should be that horizontal lines work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .horizontalLineTo(10.0)
                .closePath()
                .toString(),
            'M 5 5 H 10 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .horizontalLineRelativeTo(5.0)
                .closePath()
                .toString(),
            'M 5 5 h 5 Z',
        )
    })

    it('should be that vertical lines work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .verticalLineTo(10.0)
                .closePath()
                .toString(),
            'M 5 5 V 10 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .verticalLineRelativeTo(5.0)
                .closePath()
                .toString(),
            'M 5 5 v 5 Z',
        )
    })
})

describe('Arc', function () {
    it('should be that arcs work correctly', function () {
        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .arcTo(10.0, 10.0, 4.5, 8.0, 3.14, true, false)
                .closePath()
                .toString(),
            'M 5 5 A 4.5 8 3.14 1 0 10 10 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .arcRelativeTo(10.0, 10.0, 4.5, 8.0, 3.14, true, false)
                .closePath()
                .toString(),
            'M 5 5 a 4.5 8 3.14 1 0 10 10 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .arcTo(10.0, 10.0, 4.5, 8.0, 3.14, false, true)
                .closePath()
                .toString(),
            'M 5 5 A 4.5 8 3.14 0 1 10 10 Z',
        )

        assert.equal(
            new SVGPathData()
                .moveTo(5.0, 5.0)
                .arcRelativeTo(10.0, 10.0, 4.5, 8.0, 3.14, false, true)
                .closePath()
                .toString(),
            'M 5 5 a 4.5 8 3.14 0 1 10 10 Z',
        )
    })
})

describe('Cloning', function () {
    it('should be that cloning work correctly', function () {
        const path = new SVGPathData()
            .moveTo(5.0, 5.0)
            .horizontalLineTo(5.0)
            .closePath()

        assert.equal(path.clone().moveTo(5, 3).toString(), 'M 5 5 H 5 Z M 5 3')
        assert.equal(path.toString(), 'M 5 5 H 5 Z')
    })
})

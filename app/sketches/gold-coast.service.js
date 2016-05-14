import Circle from './gold-coast/circle.class'

function GoldCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 64;

        let gold = {r: 163, g: 107, b: 82, a:255};
        let _gold = gold;
        let blue = {r: 58, g: 68, b: 157, a:175};
        let x = p.windowWidth/2;
        let y = p.windowHeight/2;
        let sizeMin;
        let shapes = [];
        let texts = [];

        let reset = function() {
            while(shapes.length > 0) {
                shapes.pop();
            }

            while(shapes.length < 8) {
                shapes.push(new Circle());
            }
        };

        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.frameRate(28);
            sizeMin = p.windowWidth/8;
            reset();
        };

        p.draw = function() {
            // reset
            _gold.a = 255;

            // background
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();

            // draw shapes
            for (var i = shapes.length; i > 0; i--) {
                shapes[i].draw(p, x, y, size, _gold);
            };

            // shading rectangle
            p.fill(blue.r, blue.g, blue.b, blue.a);
            p.rect(0, p.height/2, p.width, p.height/2);
        };

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            reset();
        };
    };
}

export default GoldCoast;
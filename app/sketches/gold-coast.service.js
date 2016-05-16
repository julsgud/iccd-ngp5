import Circle from './gold-coast/circle.class'

function GoldCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 64;

        // colors and refs
        let gold = {r: 163, g: 107, b: 82, a:255};
        let blue = {r: 58, g: 68, b: 157, a:175};

        // dims
        let maxSize;

        // collections
        let shapes = [];
        let texts = [];

        ////////
        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.frameRate(fps);
            maxSize = p.height/2;
        };

        ////////
        p.draw = function() {
            // background and setup
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();

            // if less than 8, add 1
            if (shapes.length < 8) {
                if (shapes.length === 0) {
                    shapes.push(new Circle());
                } else if(shapes[shapes.length-1].size > maxSize/8) {
                    shapes.push(new Circle());
                }
            }

            // che
            // if (shapes[0].size >= maxSize) {
            //     shapes[0].pop();
            // }

            // draw shapes
            for (var i = shapes.length-1; i > 0; i--) {
                shapes[i].draw(p, gold);
                shapes[i].growAndFade(p, fps, 4, maxSize);
            };

            // shading rectangle
            p.fill(blue.r, blue.g, blue.b, blue.a);
            p.rect(0, p.height/2, p.width, p.height/2);
        };

        ////////
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            reset();
        };

        ////////

        function reset() {
            while(shapes.length > 0) {
                shapes.pop();
            }

            while(shapes.length < 8) {
                shapes.push(new Circle());
            }
        }
    };
}

export default GoldCoast;
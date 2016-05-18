import Circle from './gold-coast/circle.class'

function GoldCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 128;
        let orientation;

        // colors and refs
        let gold = {r: 163, g: 107, b: 82, a:255};
        let blue = {r: 58, g: 68, b: 157, a:200};

        // dims
        let maxSize;

        // collections
        let shapes = [];
        let texts = [];

        ////////
        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.frameRate(fps);
            p.smooth();
            orientation = screenOrientation(p.width, p.height);
            maxSize = (orientation === 'landscape') ? p.width/2 : p.height/2;
            console.log(p.width/2, p.height/2, maxSize);
        };

        ////////
        p.draw = function() {
            // background and setup
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();

            fillArray();           
            console.log(shapes[0].size);

            // draw shapes
            for (var i = 0; i < shapes.length; i++) {
                shapes[i].draw(p, gold);
                shapes[i].growAndFade(p, fps, 3, maxSize);
            }

            // shading rectangle
            p.fill(blue.r, blue.g, blue.b, blue.a);
            p.rect(0, p.height/2, p.width, p.height/2);

            trimArray(); 
        };

        ////////
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            orientation = screenOrientation(p.width, p.height);
            maxSize = (orientation === 'landscape') ? p.width/2 : p.height/2;
            console.log(p.width/2, p.height/2, maxSize);
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

        function fillArray() {
            if(shapes.length === 0) {
                shapes.push(new Circle());
            } else if (shapes.length < 8 && shapes[shapes.length-1].size >= maxSize/8) {
                shapes.push(new Circle());
            }
        }

        function trimArray() {
            if(shapes[0].size >= maxSize) {
                shapes.shift();
            }
        }

        function screenOrientation(width, height) {
            let orientation;

            if (width > height) {
                orientation = 'landscape';
            } else {
                orientation = 'portrait';
            }

            console.log(orientation);

            return orientation;
        }

        p.mouseReleased = function() {
            while(shapes.length > 0) {
                shapes.pop();
            }
        }

        p.touchEnded = function() {
            while(shapes.length > 0) {
                shapes.pop();
            }
        }
    };
}

export default GoldCoast;
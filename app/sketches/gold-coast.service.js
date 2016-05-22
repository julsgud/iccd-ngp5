import Circle from './gold-coast/circle.class';
import Text from './text.class';

function GoldCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 64;
        let orientation;
        let tabac;
        let growthTime = 5;

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
            // load font
            tabac = p.loadFont('fonts/31267E_0_0.ttf');

            // setup canvas 
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.class('p5canvas');

            // drawing options
            p.frameRate(fps);
            p.smooth();

            // setup vars
            orientation = screenOrientation(p.width, p.height);
            maxSize = (orientation === 'landscape') ? p.width/2 : p.height/2;

            // setup text
            p.textFont(tabac);
            resetText();
        };

        ////////
        p.draw = function() {
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();

            // draw shapes
            fillArray();  

            for (var i = 0; i < shapes.length; i++) {
                shapes[i].draw(p, gold);
                shapes[i].growAndFade(p, fps, growthTime, maxSize);
            }

            trimArray();

            // shading rectangle
            p.fill(blue.r, blue.g, blue.b, blue.a);
            p.rect(0, p.height/2, p.width, p.height/2);

            // draw text

            for (var i = 0; i < texts.length; i++) {
                texts[i].draw(p);
            }
        };

        ////////

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            orientation = screenOrientation(p.width, p.height);
            maxSize = (orientation === 'landscape') ? p.width/2 : p.height/2;
            resetText();
        };

        ////////

        //////// shape helpers

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

        //////// text helpers

        function resetText() {
            while(texts.length > 0) {
                texts.pop();
            }

            texts.push(new Text(p.width/13, 'I CAN CHASE', p.width/2, p.height/8, gold));
            texts.push(new Text(p.width/13, 'DRAGONS', p.width/2, p.height/8*1.5, gold));
            texts.push(new Text(p.width/13, 'GOLD', p.width/2, p.height/8*7, gold));
            texts.push(new Text(p.width/13, 'COAST', p.width/2, p.height/8*7.5, gold));
        }

        //////// layout helpers

        function screenAdapt(orientation, width, height) {
            let s = {};

            // min and max fontsize, max size etc based on screen size
            if (orientation === 'portrait') {

                // smartphone
                if (width < 480) {

                    s.fontSize = width/13;
                    s.maxSize = width/3;

                // tablet
                } else if (width < 1024) {

                // laptop
                } else if (width < 1440) {

                // desktop
                } else {


                }

            } else if (orientation === 'landscape') {



            }

            return s;
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

        //////// interactivity

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
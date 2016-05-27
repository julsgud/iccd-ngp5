import Circle from './gold-coast/circle.class';
import Text from './text.class';

function GoldCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 64;
        let orientation;
        let tabac;
        let growthTime = 3.8;
        let screenAdapter;
        let pullFactor;
        let pressFlag;
        let posX, posY;
        let video = false;
        let player;

        // colors and refs
        let gold = {r: 163, g: 107, b: 82, a:255};
        let blue = {r: 58, g: 68, b: 157, a:200};

        // dims
        let maxSize;

        // collections
        let shapes = [];
        let nameText = [];
        let songText = [];

        ////////
        p.setup = function() {
            // load font
            tabac = p.loadFont('fonts/312E5B_0_0.ttf');
            p.textFont(tabac);
            
            // setup canvas 
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.class('p5canvas');

            // drawing options
            p.frameRate(fps);
            p.smooth();

            // setup soundcloud
            // loadSounds(sounds);
            // sounds = p5.loadSound('assets/nemo.aac');

            // setup vars
            screenAdapter = screenAdapt(screenOrientation(p.width, p.height), p.width, p.height);
            resetNameText(screenAdapter, p.width, p.height);
            resetSongText(screenAdapter, p.width, p.height);
        };

        ////////

        p.draw = function() {
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();

            drawShapes(screenAdapter);

            // shading rectangle
            p.fill(blue.r, blue.g, blue.b, blue.a);
            p.rect(0, p.height/2, p.width, p.height/2);

            // draw text
            if (nameText[0].alpha === 255) {
                nameText.forEach((t) => t.draw(p));
            } else {
                nameText.forEach((t) => t.fadeIn(p, growthTime*.5, fps));
            }

            if (songText[0].alpha === 255) {
                songText.forEach((t) => t.draw(p));
            } else {
                songText.forEach((t) => t.fadeIn(p, growthTime*.8, fps));
            }
            
        };

        ////////

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            screenAdapter = screenAdapt(screenOrientation(p.width, p.height), p.width, p.height);
            resetNameText(screenAdapter, p.width, p.height);
            resetSongText(screenAdapter, p.width, p.height);
        };

        //////// shape helpers

        function drawShapes(screenAdapter) {
            fillArray(screenAdapter);  

            for (var i = 0; i < shapes.length; i++) {

                posX = p.width/2;
                posY = p.height/2;

                // if (pressFlag) {
                //     posX += mouseX/8 * i;
                //     posY += mouseY/8 * i;
                // }

                shapes[i].draw(p, posX, posY, gold);
                shapes[i].growAndFade(p, fps, growthTime, screenAdapter.maxSize);
            }

            trimArray(screenAdapter);
        }

        function fillArray(screenAdapter) {
            if(shapes.length === 0) {
                shapes.push(new Circle());
            } else if (shapes.length < 8 && shapes[shapes.length-1].size >= screenAdapter.maxSize/8) {
                shapes.push(new Circle());
            }
        }

        function trimArray(screenAdapter) {
            if(shapes[0].size >= screenAdapter.maxSize) {
                shapes.shift();
            }
        }

        //////// text helpers
        function resetNameText(screenAdapter, width, height) {
            while(nameText.length > 0) {
                nameText.pop();
            }

            nameText.push(new Text(screenAdapter.nameSize, 'I CAN CHASE', screenAdapter.posX, screenAdapter.frame, gold));
            nameText.push(new Text(screenAdapter.nameSize, 'DRAGONS', screenAdapter.posX, screenAdapter.frame + screenAdapter.nameSize, gold));
        }

        function resetSongText(screenAdapter, width, height) {
            while(songText.length > 0) {
                songText.pop();
            }

            songText.push(new Text(screenAdapter.songNameSize, 'GOLD', width - screenAdapter.posX, height-screenAdapter.frame-screenAdapter.songNameSize, gold));
            songText.push(new Text(screenAdapter.songNameSize, 'COAST', width - screenAdapter.posX, height-screenAdapter.frame, gold));
        }

        //////// layout helpers
        function screenAdapt(orientation, width, height) {
            let s = {};

            // min and max fontsize, max size etc based on screen size
            if (orientation === 'portrait') {
                // smartphone
                if (width <= 480) {

                    s.nameSize = height/22;
                    s.songNameSize = height/15;
                    s.frame = height/10;
                    s.maxSize = width - width/10*2;
                    s.posX = width/2;
                    s.posY = height/2;

                // tablet
                } else if (width <= 1024) {

                    s.nameSize = height/21;
                    s.songNameSize = height/13;
                    s.frame = height/8;
                    s.maxSize = width - width/10*2.5;
                    s.posX = width/2;
                    s.posY = height/2;

                // desktop/laptop
                } else {

                    // does not apply
                    s.nameSize = height/17;
                    s.songNameSize = height/10;
                    s.frame = height/5;
                    s.maxSize = width - width/10*2.5;
                    s.posX = width/2;
                    s.posY = height/2;

                }

            } else if (orientation === 'landscape') {

                if (width <= 480) {
                    // does not apply
                // medium landscape
                } else if (width <= 1024) {

                    s.nameSize = height/21;
                    s.songNameSize = height/13;
                    s.frame = height/8;
                    s.maxSize = height - height/5;
                    s.posX = width/2;


                // large landscape
                } else {

                    s.nameSize = height/17;
                    s.songNameSize = height/10;
                    s.frame = height/8;
                    s.maxSize = height - height/5;
                    s.posX = width/2;

                }
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

            return orientation;
        };

        //////// youtube

        function createVideo() {
            video = true;
            let width = (p.width/3).toString();
            let height = (p.height/3).toString();

            player = new YT.Player('player', {
                height: height,
                width: width,
                videoId: 'RDXwUfiiZk4',
                playerVars: {
                    showinfo: '0',
                    color: 'white',
                    controls: '2'
                }
            });

        }

        //////// interactivity

        p.mousePressed = function() {
            if (!video) {
                while(shapes.length > 0) {
                    shapes.pop();
                }
                createVideo();
                screenAdapter.maxSize = (screenOrientation(p.width, p.height) === 'portrait') ? p.width*1.2 : p.height*1.2;
                console.log(screenAdapter.maxSize);
            } else {
                while(shapes.length > 0) {
                    shapes.pop();
                }
                console.log('video already loaded');
            }
        }

        p.mouseReleased = function() {
            // while(shapes.length > 0) {
            //     shapes.pop();
            // }
        }

        p.touchEnded = function() {
            // while(shapes.length > 0) {
            //     shapes.pop();
            // }
        }
    }
}

export default GoldCoast;
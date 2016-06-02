import Circle from './gold-coast/circle.class';
import Text from './text.class';
import Text2 from './text2.class';

function GoldCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 29.96;
        let orientation;
        let tabac;
        let growthTime = 4;
        let screenAdapter;
        let pressFlag;
        let posX, posY;
        let video = false;
        let textFlag = false;
        let player;
        let timer = 0;
        let lyricsLength = 7.4;

        // colors and refs
        let gold = {r: 163, g: 107, b: 82, a:255};
        let blue = {r: 58, g: 68, b: 157, a:200};

        // dims
        let maxSize;

        // collections
        let shapes = [];
        let nameText = [];
        let songText = [];
        let texts = [];
        let lyrics = [];
        let lyricsOne = [];
        let lyricsTwo = [];
        let lyricsThree = [];
        let lines = [];

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

            // loadSounds(sounds);
            // sounds = p5.loadSound('assets/nemo.aac');

            // setup vars
            screenAdapter = screenAdapt(screenOrientation(p.width, p.height), p.width, p.height);
            // resetNameText(screenAdapter, p.width, p.height);
            // resetSongText(screenAdapter, p.width, p.height);
            // resetLyrics(screenAdapter, p.width, p.height);
            console.log(lyrics.length);
        };

        ////////

        p.draw = function() {
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();

            wordPusher();
            lyricsConcat();

            drawShapes(screenAdapter);
            // if (textFlag) {drawTexts(p)};

            // shading rectangle
            p.fill(blue.r, blue.g, blue.b, blue.a);
            p.rect(0, p.height/2, p.width, p.height/2);

            // draw text
            // if (nameText[0].alpha === 255) {
            //     nameText.forEach((t) => t.draw(p));
            // } else {
            //     nameText.forEach((t) => t.fadeIn(p, growthTime*.5, fps));
            // }

            // if (songText[0].alpha === 255) {
            //     songText.forEach((t) => t.draw(p));
            // } else {
            //     songText.forEach((t) => t.fadeIn(p, growthTime*.8, fps));
            // }

            for (var i = 0; i < lyrics.length; i++) {
                lyrics[i].draw(p, lines[i]);
            }
        };

        ////////

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            screenAdapter = screenAdapt(screenOrientation(p.width, p.height), p.width, p.height);
            resetLyrics(screenAdapter, p.width, p.height);
            // resetNameText(screenAdapter, p.width, p.height);
            // resetSongText(screenAdapter, p.width, p.height);
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

        function resetLyrics(screenAdapter, width, height) {
            while (lyrics.length > 0) {
                lyrics.pop();
            }
 
            lyrics.push(new Text2(screenAdapter.songNameSize, width/2, height/2 + screenAdapter.frame, gold));
            
        }

        function wordPusher() {
            timer = p.frameCount;
            console.log(timer); 

            console.log(Math.ceil((.2*248)/lyricsLength));

            // push each word into its line array with time
            if (timer == 1) {
                p.saveFrames('gc', 'png', 10, fps);
                lyricsOne.push('A');
            } else if (timer == Math.ceil((.2*248)/lyricsLength)) {
                lyricsOne.push('million');
            } else if (timer == Math.ceil((1*248)/lyricsLength)) {
                lyricsOne.push('ideas');
            } else if (timer == Math.ceil((1.5*248)/lyricsLength)) {
                lyrics.push(new Text2(screenAdapter.songNameSize, p.width/2, p.height/2 + screenAdapter.frame + screenAdapter.songNameSize , gold));
                lyricsTwo.push('are');
            } else if (timer == Math.ceil((2*248)/lyricsLength)) {
                lyricsTwo.push('gonna');
            } else if (timer == Math.ceil((2.5*248)/lyricsLength)) {
                lyricsTwo.push('come,');
            } else if (timer == Math.ceil((3.75*248)/lyricsLength)) {
                lyrics.push(new Text2(screenAdapter.songNameSize, p.width/2, p.height/2 + screenAdapter.frame + (screenAdapter.songNameSize*2), gold));
                lyricsThree.push('but');
            } else if (timer == Math.ceil((4*248)/lyricsLength)) {
                lyricsThree.push('never');
            } else if (timer == Math.ceil((4.5*248)/lyricsLength)) {
                lyricsThree.push('one');
            } else if (timer == Math.ceil((5*248)/lyricsLength)) {
                lyricsThree.push('like');
            } else if (timer == Math.ceil((5.5*248)/lyricsLength)) {
                lyricsThree.push('you...');
            } else if (timer == 247) {
                // pop.all();
            }


        }

        function lyricsConcat() {
            console.log(lyricsOne.length);
            if (lyricsOne.length > 0) {
                lines[0] = lyricsOne.join(' ');
            }
            if (lyricsTwo.length > 0) {
                lines[1] = lyricsTwo.join(' ');
            }
            if (lyricsThree.length > 0) {
                lines[2] = lyricsThree.join(' ');
            }
        }

        function popAll() {
            while (lyricsOne > 0) {
                lyricsOne.pop();
            }

            while (lyricsTwo > 0) {
                lyricsTwo.pop();
            }

            while (lyricsThree > 0) {
                lyricsThree.pop();
            }
        }

        function resetSongText(screenAdapter, width, height) {
            while(songText.length > 0) {
                songText.pop();
            }

            songText.push(new Text(screenAdapter.songNameSize, 'GOLD', width - screenAdapter.posX, height-screenAdapter.frame-screenAdapter.songNameSize, gold));
            songText.push(new Text(screenAdapter.songNameSize, 'COAST', width - screenAdapter.posX, height-screenAdapter.frame, gold));
        }

        function textFlagIt() {
            textFlag = true;
        }

        function fillTextsArray() {
            if (texts.length === 0) {
                let textX = p.random(screenAdapter.frame, p.width-screenAdapter.frame);
                let textY = p.random(screenAdapter.frame, p.height-screenAdapter.frame);
                let textPick = p.random(0, 1);
                let text = (textPick > 0.5) ? 'ENTROPIA' : 'AGOSTO 2016';
                let color = (textY >= p.height/2) ? gold : blue;

                texts.push(new Text(screenAdapter.nameSize, text, textX, textY, color));

            } else if (texts.length === 0 && texts[texts.length-1].alpha > 255/3) {
                let textX = p.random(screenAdapter.frame, p.width-screenAdapter.frame);
                let textY = p.random(screenAdapter.frame, p.height-screenAdapter.frame);
                let textPick = p.random(0, 1);
                let text = (textPick > 0.5) ? 'ENTROPIA' : 'AGOSTO 2016';
                let color = (textY >= p.height/2) ? gold : blue;

                texts.push(new Text(screenAdapter.nameSize, text, textX, textY, color));
            }
        }

        function drawTexts(p) {
            fillTextsArray(p);

            for (var i = 0; i < texts.length; i++) {
                if (texts[i].alpha === 255) {
                    texts.forEach((t) => t.draw(p));
                } else {
                    texts.forEach((t) => t.fadeIn(p, growthTime*.5, fps));
                }
            }
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
            let orientation = screenOrientation(p.width, p.height);
            let preWidth = (orientation === 'portrait') ? p.width/1.5 : p.width/3; 
            let preHeight = (orientation === 'portrait') ? p.height/4 : p.height/3;
            let width = preWidth.toString();
            let height = preHeight.toString();

            player = new YT.Player('player', {
                height: height,
                width: width,
                videoId: '2MWrSoX2v70',
                playerVars: {
                    showinfo: '0',
                    color: 'white',
                    controls: '2'
                },
                events: {
                    'onStateChange': textFlagIt
                }
            });

        }

        //////// save frames

        //////// interactivity

        p.mousePressed = function() {
            
        }

        p.keyTyped = function() {
            console.log('key typed');

            if (p.key === 's') {
                console.log('saving');
                console.log(growthTime + 'x' + fps);
                p.saveFrames('out', 'png', 1, fps);
            }

            return false;
        }

        p.mouseReleased = function() {
            // if (!video) {
            //     while(shapes.length > 0) {
            //         shapes.pop();
            //     }
            //     createVideo();
            //     screenAdapter.maxSize = (screenOrientation(p.width, p.height) === 'portrait') ? p.width*1.2 : p.height*1.2;
            //     console.log(screenAdapter.maxSize);
            // } else {
            //     while(shapes.length > 0) {
            //         shapes.pop();
            //     }
            //     console.log('video already loaded');
            // }
        }

        p.touchEnded = function() {
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
    }
}

export default GoldCoast;
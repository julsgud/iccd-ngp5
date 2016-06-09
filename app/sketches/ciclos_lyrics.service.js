import Semi from './semi.class';
import FilterRect from './filter-rect.class';
import Text from './text.class';
import Text2 from './text2.class';

function frontColorCoast() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 60;
        let resolution = 2048;
        let orientation;
        let tabac;
        let time = 5;
        let screenAdapter;
        let pressFlag;
        let posX, posY;
        let video = false;
        let textFlag = false;
        let fadeFlag = false;
        let saveFlag = false;

        let player;
        let timer = 0;
        let lyricsLength = 7.4;

        // colors and refs
        let frontColor = {r: 243, g: 158, b: 161, a:255};
        let backColor = {r: 159, g: 107, b: 85, a:255};

        // dims
        let maxSize;

        // collections
        let shapes = [];
        let shapes2 = [];
        let nameText = [];
        let songText = [];
        let texts = [];
        let lyrics = [];
        let lyricsOne = [];
        let lyricsTwo = [];
        let lyricsThree = [];
        let lyricsFour = [];
        let lyricFlags = [
            {time: 4750, word: 'sube ', insert: function() {lyricsThree.push(this.word)}}, 
            {time: 5050, word: 'hasta', insert: function() {lyricsThree.push(this.word)}},
            {time: 5640, word: 're', insert: function() {lyricsFour.unshift(this.word)}},
            {time: 5940, word: 'orden', insert: function() {lyricsTwo.push(this.word)}},
            {time: 2220, word: 'una ', insert: function() {lyricsOne.push(this.word)}},
            {time: 2370, word: 'ola ', insert: function() {lyricsOne.push(this.word)}}, 
            {time: 2550, word: 'entre', insert: function() {lyricsOne.push(this.word)}},
            {time: 3120, word: 'el ', insert: function() {lyricsTwo.unshift(this.word)}},
            {time: 3270, word: 'des', insert: function() {lyricsTwo.splice(1, 0, this.word)}},
            {time: 3570, word: 'ventar', insert: function() {lyricsFour.push(this.word)}}
        ];
        let lines = [];
        let rects = [];

        ////////
        p.setup = function() {
            // load font
            tabac = p.loadFont('fonts/312E5B_0_0.ttf');
            p.textFont(tabac);
            
            // setup canvas 
            //let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
             let canvas = p.createCanvas(resolution/2, resolution/2);
            canvas.class('p5canvas');

            // drawing options
            p.frameRate(fps);
            p.smooth();

            // loadSounds(sounds);
            // sounds = p5.loadSound('assets/nemo.aac');

            // setup vars
            screenAdapter = screenAdapt(screenOrientation(p.width, p.height), p.width, p.height);
            rects[0] = new FilterRect();
            // resetNameText(screenAdapter, p.width, p.height);
            // resetSongText(screenAdapter, p.width, p.height);
            resetLyrics(screenAdapter, p.width, p.height);
        };

        ////////

        p.draw = function() {
            let measure = 1000/fps;
            let timer = p.frameCount * measure;
            if(p.frameCount = 1) {p.saveFrames('ciclos1_', 'png', 8, 15)};
            p.background(backColor.r, backColor.g, backColor.b);
            p.noStroke();

            wordPusher();
            lyricsConcat();

            drawShapes(shapes, p.width/2 + p.width/6, 'top');
            drawShapes(shapes2, p.width/2 - p.width/6, 'bottom');


            drawLyrics();

            // if(fadeFlag) {rects[0].fadeIn()};
            // rects[0].draw(p, 0, 0, p.width, backColor);

            // if (textFlag) {drawTexts(p)};
            // for (var i = 0; i < lyrics.length; i++) {
            //     lyrics[i].draw(p, lines[i]);
            // }

            // if(timer > 7130 && timer < 7130 + measure) {p.saveFrames('ciclos3_', 'png', 15, fps);}
        };

        ////////

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            screenAdapter = screenAdapt(screenOrientation(p.width, p.height), p.width, p.height);
            // resetLyrics(screenAdapter, p.width, p.height);
            // resetNameText(screenAdapter, p.width, p.height);
            // resetSongText(screenAdapter, p.width, p.height);
        };

        //////// shape helpers

        function drawShapes(array, positionX, position) {
            fill(array);  

            for (var i = 0; i < array.length; i++) {

                posX = positionX;
                posY = p.height/2;

                array[i].draw(p, posX, posY, frontColor, position, backColor);
                array[i].shrinkAndFade(p, fps, time, screenAdapter.maxSize);
            }

            trim(array);
        }

        function fill(array) {
            if(array.length === 0) {
                array.push(new Semi(screenAdapter.maxSize));
            } else if (array.length < 8 && array[array.length-1].size <= screenAdapter.maxSize/8*7) {
                array.push(new Semi(screenAdapter.maxSize));
            }
        }

        function trim(array) {
            if(array[0].size <= 0) {
                array.shift();
            }
        }

        //////// text helpers
        // function resetNameText(screenAdapter, width, height) {
        //     while(nameText.length > 0) {
        //         nameText.pop();
        //     }

        //     nameText.push(new Text(screenAdapter.nameSize, 'I CAN CHASE', screenAdapter.posX, screenAdapter.frame, frontColor));
        //     nameText.push(new Text(screenAdapter.nameSize, 'DRAGONS', screenAdapter.posX, screenAdapter.frame + screenAdapter.nameSize, frontColor));
        // }

        // function save() {

        //     p.saveFrames('ciclos_', 'png', 18, fps);
        // }

        function resetLyrics(screenAdapter, width, height) {
            while (lyrics.length > 0) {
                lyrics.pop();
            }
 
            lyrics.push(new Text2(null, screenAdapter.songNameSize+ 10, width/2, screenAdapter.frame, frontColor));
            lyrics.push(new Text2(null, screenAdapter.songNameSize+ 10, width/2, screenAdapter.frame + screenAdapter.songNameSize+10, frontColor));
            lyrics.push(new Text2(null, screenAdapter.songNameSize+ 10, width/2, height - screenAdapter.frame*2, frontColor));
            lyrics.push(new Text2(null, screenAdapter.songNameSize+ 10, width/2, height - screenAdapter.frame*2 + screenAdapter.songNameSize+10, frontColor));
            
        }

        function wordPusher() {
            let measure = 1000/fps;
            let timer = p.frameCount * measure;
            // push each word into its line array with time
            for (var i = 0; i < lyricFlags.length; i++) {
                if (timer > lyricFlags[i].time - measure/2 && timer <= lyricFlags[i].time) {
                    lyricFlags[i].insert();
                } 
            }

            if (timer > 7130 && timer < 7130 + measure) {screenAdapter.maxSize = p.width}
            // if (timer > 10700 - measure && timer < 10700 + measure) {screenAdapter.maxSize = p.width*2}
        }

        function drawLyrics() {
            for (var i = 0; i < lyrics.length; i++) {
                lyrics[i].draw(p, lines[i]);
            }
        }

        function lyricsConcat() {
            if (lyricsOne.length > 0) {
                lines[0] = lyricsOne.join('');
            }
            if (lyricsTwo.length > 0) {
                lines[1] = lyricsTwo.join('');
            }
            if (lyricsThree.length > 0) {
                lines[2] = lyricsThree.join('');
            }
            if (lyricsFour.length > 0) {
                lines[3] = lyricsFour.join('');
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

            songText.push(new Text(screenAdapter.songNameSize, 'GOLD', width - screenAdapter.posX, height-screenAdapter.frame-screenAdapter.songNameSize, frontColor));
            songText.push(new Text(screenAdapter.songNameSize, 'COAST', width - screenAdapter.posX, height-screenAdapter.frame, frontColor));
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
                let color = (textY >= p.height/2) ? frontColor : backColor;

                texts.push(new Text(screenAdapter.nameSize, text, textX, textY, color));

            } else if (texts.length === 0 && texts[texts.length-1].alpha > 255/3) {
                let textX = p.random(screenAdapter.frame, p.width-screenAdapter.frame);
                let textY = p.random(screenAdapter.frame, p.height-screenAdapter.frame);
                let textPick = p.random(0, 1);
                let text = (textPick > 0.5) ? 'ENTROPIA' : 'AGOSTO 2016';
                let color = (textY >= p.height/2) ? frontColor : backColor;

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
                    console.log(3);
                    s.nameSize = height/22;
                    s.songNameSize = height/15;
                    s.frame = height/10;
                    s.maxSize = width - width/3;
                    s.posX = width/2;
                    s.posY = height/2;

                // tablet
                } else if (width <= 1024) {
                    console.log('2');
                    s.nameSize = height/21;
                    s.songNameSize = height/13;
                    s.frame = height/10;
                    s.maxSize = width - width/3;
                    s.posX = width/2;
                    s.posY = height/2;

                // desktop/laptop
                } else {
                    console.log('1');
                    // does not apply
                    s.nameSize = height/17;
                    s.songNameSize = height/10;
                    s.frame = height/5;
                    s.maxSize = width - width/3;
                    s.posX = width/2;
                    s.posY = height/2;

                }

            } else if (orientation === 'landscape') {

                if (width < 480) {
                // does not apply, always portrait

                // medium
                // } else if (width <= 1024) {

                //     s.nameSize = height/21;
                //     s.songNameSize = height/13;
                //     s.frame = height/10;
                //     s.maxSize = height - height/3;
                //     s.posX = width/2;


                // large landscape
                } else {
                    // console.log('large');
                    // s.nameSize = height/17;
                    // s.songNameSize = height/10;
                    // s.frame = height/10;
                    // s.maxSize = height - height/5;
                    // s.posX = width/2;
                    s.nameSize = height/21;
                    s.songNameSize = height/10;
                    s.frame = height/10;
                    s.maxSize = width - width/3;
                    s.posX = width/2;
                    s.posY = height/2;
                }
            }

            return s;
         }

        function screenOrientation(width, height) {
            let orientation;

            if (width >= height) {
                orientation = 'landscape';
            } else {
                orientation = 'portrait';
            }
            console.log(orientation);

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
                // p.saveFrames('ciclos_', 'png', 18, fps);
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
    }
}

export default frontColorCoast;
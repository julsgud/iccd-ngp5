import Semi from './classes/semi.class';
import Text from './classes/text.class';
import Text2 from './classes/text2.class';

function CiclosLyrics() {
    'ngInject';

    return function(p) {
        // setup
        let fps = 60;
        let resolution = 2048;
        let tabac;
        let time = 5;
        let screenAdapter;
        let video = false;
        let textFlag = false;
        let fadeFlag = false;
        let saveFlag = false;
        let timer = 0;
        let lyricsLength = 7.4;

        // video
        let player;

        // colors and refs
        let frontColor = {r: 243, g: 158, b: 161, a:255};
        let backColor = {r: 159, g: 107, b: 85, a:255};

        // collections
        let shapes = [];
        let shapes2 = [];
        let nameText = [];
        let songText = [];
        let lyrics = [];
        let line1 = [];
        let line2 = [];
        let line3 = [];
        let line4 = [];
        let lyricFlags = [
            {time: 4750, word: 'sube ', insert: function() {line3.push(this.word)}}, 
            {time: 5050, word: 'hasta', insert: function() {line3.push(this.word)}},
            {time: 5640, word: 're', insert: function() {line4.unshift(this.word)}},
            {time: 5940, word: 'orden', insert: function() {line2.push(this.word)}},
            {time: 2220, word: 'una ', insert: function() {line1.push(this.word)}},
            {time: 2370, word: 'ola ', insert: function() {line1.push(this.word)}}, 
            {time: 2550, word: 'entre', insert: function() {line1.push(this.word)}},
            {time: 3120, word: 'el ', insert: function() {line2.unshift(this.word)}},
            {time: 3270, word: 'des', insert: function() {line2.splice(1, 0, this.word)}},
            {time: 3570, word: 'ventar', insert: function() {line4.push(this.word)}}
        ];
        let lines = [];
        let rects = [];

        ////////
        p.setup = function() {
            // load font
            tabac = p.loadFont('fonts/312E5B_0_0.ttf');
            p.textFont(tabac);
            
            // canvas
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            // let canvas = p.createCanvas(resolution/2, resolution/2);
            canvas.class('p5canvas');

            // options
            p.frameRate(fps);
            p.smooth();

            // init
            screenAdapter = screenAdapt(windowType(p.width, p.height), p.width, p.height);
            rects[0] = new FilterRect();
            resetLyrics(screenAdapter, p.width, p.height);
        };

        ////////

        p.draw = function() {
            p.background(backColor.r, backColor.g, backColor.b);
            p.noStroke();

            wordPusher();
            lyricsConcat();

            drawShapes(shapes, p.width/2 + p.width/6, 'top');
            drawShapes(shapes2, p.width/2 - p.width/6, 'bottom');

            drawLyrics();
        };

        ////////

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            screenAdapter = screenAdapt(windowType(p.width, p.height), p.width, p.height);
            resetLyrics(screenAdapter, p.width, p.height);
        };

        //////// shape helpers

        function drawShapes(array, positionX, position) {
            fill(array);  

            for (var i = 0; i < array.length; i++) {

                let posX = positionX;
                let posY = p.height/2;

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

        //////// lyric helpers

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

            for (var i = 0; i < lyricFlags.length; i++) {
                if (timer > lyricFlags[i].time - measure/2 && timer <= lyricFlags[i].time) {
                    lyricFlags[i].insert();
                } 
            }

            if (timer > 7130 && timer < 7130 + measure) {screenAdapter.maxSize = p.width}
        }

        function drawLyrics() {
            for (var i = 0; i < lyrics.length; i++) {
                lyrics[i].draw(p, lines[i]);
            }
        }

        function lyricsConcat() {
            if (line1.length > 0) {
                lines[0] = line1.join('');
            }
            if (line2.length > 0) {
                lines[1] = line2.join('');
            }
            if (line3.length > 0) {
                lines[2] = line3.join('');
            }
            if (line4.length > 0) {
                lines[3] = line4.join('');
            }
        }

        function popAll() {
            while (line1 > 0) {
                line1.pop();
            }

            while (line2 > 0) {
                line2.pop();
            }

            while (line3 > 0) {
                line3.pop();
            }

            while (line4 > 0) {
                line3.pop();
            }
        }

        //////// layout helpers
        function screenAdapt(orientation, width, height) {
            let s = {};

            switch (orientation) {
                case 'portrait':

                    // small
                    if (width <= 480) {

                        s.nameSize = height/22;
                        s.songNameSize = height/15;
                        s.frame = height/10;
                        s.maxSize = width - width/3;
                        s.posX = width/2;
                        s.posY = height/2;

                    // medium
                    } else if (width <= 1024) {

                        s.nameSize = height/21;
                        s.songNameSize = height/13;
                        s.frame = height/10;
                        s.maxSize = width - width/3;
                        s.posX = width/2;
                        s.posY = height/2;

                    // large
                    } else {

                        s.nameSize = height/17;
                        s.songNameSize = height/10;
                        s.frame = height/5;
                        s.maxSize = width - width/3;
                        s.posX = width/2;
                        s.posY = height/2;

                    }

                    break;

                case 'landscape':

                    // medium
                    if (width <= 1024) {

                        s.nameSize = height/21;
                        s.songNameSize = height/10;
                        s.frame = height/10;
                        s.maxSize = width - width/3;
                        s.posX = width/2;
                        s.posY = height/2;

                    } else {

                        s.nameSize = height/21;
                        s.songNameSize = height/10;
                        s.frame = height/10;
                        s.maxSize = width - width/3;
                        s.posX = width/2;
                        s.posY = height/2;
                    }

                    break;

                case 'square':

                    s.nameSize = height/21;
                    s.songNameSize = height/10;
                    s.frame = height/10;
                    s.maxSize = width - width/3;
                    s.posX = width/2;
                    s.posY = height/2;

                break;
            }
                                                                                                                  
            return s;
         }

        function windowType(width, height) {
            let orientation;

            if (width = height) {
                orientation = 'square';

            } else if (width > height) {
                orientation = 'lanscape';

            } else {
                orientation = 'portrait';

            }

            return orientation;
        };

        //////// youtube

        function createVideo() {
            video = true;
            let orientation = windowType(p.width, p.height);
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
            //     screenAdapter.maxSize = (windowType(p.width, p.height) === 'portrait') ? p.width*1.2 : p.height*1.2;
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
            //     screenAdapter.maxSize = (windowType(p.width, p.height) === 'portrait') ? p.width*1.2 : p.height*1.2;
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

export default CiclosLyrics;
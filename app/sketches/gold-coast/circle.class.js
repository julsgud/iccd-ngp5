import p from 'p5';

export default class Circle {
    constructor(p) {
        this.size = 0;
        this.alpha = 255;
    }

    draw(p, color) {
        p.fill(color.r, color.g, color.b, this.alpha);
        p.ellipse(p.width/2, p.height/2, this.size, this.size);
    }

    growAndFade(p, fps, seconds, maxSize) {
        let framesToMax = (seconds*fps)/maxSize;
        this.size += (seconds*fps)/maxSize;
        // 64, frameCount, 4s 4000/64
        this.alpha -= .3;
    }


}
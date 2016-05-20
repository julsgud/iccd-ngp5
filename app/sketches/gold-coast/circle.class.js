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

        // size should go from 0 to maxSize in totalFrames
        // how much should it increment per frame?
        // 460 - 0 - 360
        let framesToMax = seconds * fps;
        let incrementBy = maxSize/framesToMax;
        this.size += incrementBy;
        // 64, frameCount, 4s 4000/64

        let decrementBy = 255/framesToMax;
        this.alpha -= decrementBy;
    }


}
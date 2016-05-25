export default class Circle {
    constructor(p) {
        this.size = 0;
        this.alpha = 255;
    }

    draw(p, x, y, color) {
        p.fill(color.r, color.g, color.b, this.alpha);
        p.ellipse(x, y, this.size, this.size);
    }

    growAndFade(p, fps, seconds, maxSize) {
        let framesToMax = seconds * fps;
        let incrementBy = maxSize/framesToMax;
        this.size += incrementBy;
        let decrementBy = 255/framesToMax;
        this.alpha -= decrementBy;
    }


}
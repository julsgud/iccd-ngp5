export default class Circle {
    constructor(p) {
        this.size = 0;
        this.alpha = 255;
    }

    draw(p, x, y, frontColor, cut, backColor) {
        p.fill(frontColor.r, frontColor.g, frontColor.b, this.alpha);
        p.ellipse(x, y, this.size, this.size);

        // draw shading rectangle
        if (cut === 'cutBottom') {
            p.fill(backColor.r, backColor.g, backColor.b, backColor.a);
            p.rect(0, p.height/2, p.width, p.height/2);
        } else {
            p.fill(backColor.r, backColor.g, backColor.b, backColor.a);
            p.rect(0, 0, p.width, p.height/2);
        }
    }

    growAndFade(p, fps, seconds, maxSize) {
        let framesToMax = seconds * fps;
        let incrementBy = maxSize/framesToMax;
        this.size += incrementBy;
        let decrementBy = 255/framesToMax;
        this.alpha -= decrementBy;
    }


}
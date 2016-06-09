export default class Semi {
    constructor(_size) {
        this.size = _size;
        this.alpha = 0;
    }

    draw(p, x, y, frontColor, position, backColor) {

        let disp = p.height/21*1.14;

        if(position === 'top') {
            p.fill(frontColor.r, frontColor.g, frontColor.b, this.alpha);
            p.arc(x, y + disp, this.size, this.size, -p.PI + p.HALF_PI/5, p.PI + p.HALF_PI/5);
        } else {
            p.fill(frontColor.r, frontColor.g, frontColor.b, this.alpha);
            p.arc(x, y - disp, this.size, this.size, 0 + p.HALF_PI/5, p.PI + p.HALF_PI/5);
        }        
    }

    shrinkAndFade(p, fps, seconds, maxSize) {
        let framesToMax = seconds * fps;
        let decrementBy = maxSize/framesToMax;
        this.size -= decrementBy;
        let incrementBy = 255/framesToMax;
        this.alpha += incrementBy;
    }


}
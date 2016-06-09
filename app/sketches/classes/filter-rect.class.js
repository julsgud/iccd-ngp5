export default class FilterRect {
    constructor() {
        this.alpha = 0;
    }

    draw(p, x, y, size, color) {
        p.noStroke();
        p.fill(color.r, color.g, color.b, this.alpha);
        p.rect(x, y, size, size);
    }

    fadeIn() {
        if(this.alpha < 255) { this.alpha += 0.62}
    }
}
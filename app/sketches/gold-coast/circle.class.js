export default class Circle {
    constructor() {
        this.x;
        this.y;
        this.size;
        this.color;
    }

    draw(p, x, y, size, color) {
        p.fill(color.r, color.g, color.b, color.a);
        p.ellipse(x, y, size, size);
    }
}
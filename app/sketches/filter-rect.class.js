export default class FilterRect {
    constructor() {
        
    }

    draw(p, x, y, size, color) {
        p.noStroke();
        p.fill(color.r, color.g, color.b, color.a);
        p.rect(x, y, size, size);
    }
}
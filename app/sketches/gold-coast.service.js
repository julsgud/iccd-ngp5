function GoldCoast() {
    return function(p) {
        let gold = {r: 163, g: 107, b: 82};
        let blue = {r: 58, g: 68, b: 157};

        p.setup = function() {
            p.createCanvas(p.windowWidth, p.windowHeight);
        };

        p.draw = function() {
            p.background(blue.r, blue.g, blue.b);
            p.noStroke();
            p.fill(gold.r, gold.g, gold.b);
            p.ellipse(p.width/2, p.height/2, 30, 30);
        };
    };
}

export default GoldCoast;
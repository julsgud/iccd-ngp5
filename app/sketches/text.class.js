export default class Text {
	constructor(_textSize, _text, _x, _y, _color) {
		this.text = _text;
		this.textSize = _textSize;
		this.x = _x;
		this.y = _y;
		this.color = _color;
	}

	draw(p) {
		p.textSize(this.textSize);    
		p.textAlign(p.CENTER, p.CENTER);
		p.fill(this.color.r, this.color.g, this.color.b, this.color.a);
		p.text(this.text, this.x, this.y);
	}
	
}
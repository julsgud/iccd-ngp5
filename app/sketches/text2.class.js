export default class Text2 {
	constructor(_text, _textSize, _x, _y, _color) {
		this.text = (_text) ? _text : ' ';
		this.textSize = _textSize;
		this.x = _x;
		this.y = _y;
		this.color = _color;
		this.alpha = 250;
	}

	draw(p, text) {

		p.textSize(this.textSize);    
		p.textAlign(p.CENTER, p.CENTER);

		if(text) {
			p.fill(this.color.r, this.color.g, this.color.b, this.alpha);
			p.text(text, this.x, this.y); 
		}
	}

	fadeIn(p, growthTime, fps) {
		p.textSize(this.textSize);    
		p.textAlign(p.CENTER, p.CENTER);

		p.fill(this.color.r, this.color.g, this.color.b, this.alpha);
		p.text(this.text, this.x, this.y);

		this.alpha += 255/(growthTime*fps);
	}
	
}
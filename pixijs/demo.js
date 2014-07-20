
includeJS('pixijs/pixi.js');

initDemo = function() {
	stage = new PIXI.Stage(0xF1EEE7);

	renderer = PIXI.autoDetectRenderer(400, 400,
		document.getElementById("canvas")
	);

	var spriteSheet = PIXI.Texture.fromImage("./assets/tiles_pegman.png");
	var sprite = new PIXI.Sprite(spriteSheet);
	sprite.position.x = 0;
	sprite.position.y = 0;

	stage.addChild(sprite);

	renderer.render(stage);
};

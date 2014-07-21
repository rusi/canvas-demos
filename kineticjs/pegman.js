Pegman.postInit = function() {
	layer.add(this.pegmanSprite);

	// setup animation listeners
	this.pegmanSprite.on('frameIndexChange', (function(evt)
	{
		var animation = this.pegmanSprite.getAnimation();
		var animations = this.pegmanSprite.getAnimations();
		var len = animations[animation].length / 4;

		if (len > 1 && evt.newVal >= len-1)
		{
			this.pegmanSprite.stop();
			this.pegmanSprite.animation(Maze.directionToString(this.direction));
			this.pegmanSprite.start();
			this.draw();
			this.playNextAction();
		}
	}).bind(this));
};

Pegman.preReset = function() {
	if (this.tween)
		this.tween.destroy();
	this.pegmanSprite.stop();
}

Pegman.postReset = function() {
	this.pegmanSprite.animation(Maze.directionToString(this.direction));
	this.draw();
};

Pegman.draw = function() {
	this.pegmanSprite.position({
		x: this.posX * Maze.SQUARE_SIZE,
		y: this.posY * Maze.SQUARE_SIZE,
	});
	stage.draw();
};

Pegman.moveTo = function(x, y) {
	this.posX = x;
	this.posY = y;
	this.tween = new Kinetic.Tween({
		node: this.pegmanSprite,
		x: this.posX * Maze.SQUARE_SIZE,
		y: this.posY * Maze.SQUARE_SIZE,
		rotation: 0,
		duration: 1,
		easing: Kinetic.Easings.EaseInOut,
		onFinish: function() {
			Pegman.playNextAction();
		},
	}).play();
};

Pegman.turnTo = function(directionId) {
	this.pegmanSprite.animation(directionId);
	this.pegmanSprite.start();
};

Pegman.finishPreviousAction = function() {
	if (this.tween)
		this.tween.destroy();
	this.pegmanSprite.stop();
};
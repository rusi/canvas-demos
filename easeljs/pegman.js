Pegman.postInit = function() {
	stage.addChild(this.pegmanSprite);
	// TODO: find a way to bind the callback to 'this' to avoid the extra function
	this.pegmanSprite.addEventListener("animationend", nextAction);
};

Pegman.preReset = function() {
	this.pegmanSprite.stop();
	createjs.Tween.removeTweens(this.pegmanSprite);
};
Pegman.postReset = function() {
	this.pegmanSprite.x = this.posX * Maze.SQUARE_SIZE;
	this.pegmanSprite.y = this.posY * Maze.SQUARE_SIZE;
	this.pegmanSprite.gotoAndPlay(Maze.directionToString(this.direction));
};

Pegman.finishPreviousAction = function() {
	this.pegmanSprite.stop();
};

function nextAction() {
	Pegman.playNextAction();
}

Pegman.moveTo = function(x, y) {
	this.posX = x;
	this.posY = y;

	createjs.Tween.get(this.pegmanSprite).to({
		x: this.posX * Maze.SQUARE_SIZE,
		y: this.posY * Maze.SQUARE_SIZE
	}, 1000, createjs.Ease.quadInOut)
	// TODO: find a way to bind the callback to 'this' to avoid the extra function
	.call(nextAction);
},

Pegman.turnTo = function(d) {
	this.pegmanSprite.gotoAndPlay(d);
};

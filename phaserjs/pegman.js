Pegman.postInit = function() {

};

Pegman.preReset = function() {
	if (this.tween) {
		this.tween.stop();
	}
	if (this.anim) {
		this.anim.stop();
	}
};
Pegman.postReset = function() {
	this.pegmanSprite.reset(this.posX * Maze.SQUARE_SIZE, this.posY * Maze.SQUARE_SIZE);
	this.pegmanSprite.animations.play(Maze.directionToString(this.direction));
};


Pegman.finishPreviousAction = function() {
};

Pegman.moveTo = function(x, y) {
	this.posX = x;
	this.posY = y;

	this.tween = game.add.tween(this.pegmanSprite);
	this.tween.to({
			x: this.posX * Maze.SQUARE_SIZE,
			y: this.posY * Maze.SQUARE_SIZE,
		}, 1000, Phaser.Easing.Exponential.InOut);
	this.tween.onComplete.addOnce(function() {
		this.playNextAction();
	}, this);
	this.tween.start();
},

Pegman.turnTo = function(d) {
	//console.log(d);
	this.anim = this.pegmanSprite.animations.play(d);
	this.anim.onComplete.addOnce(function() {
		this.playNextAction();
	}, this);
};

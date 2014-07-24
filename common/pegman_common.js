
'use strict';

var Pegman = {
	posX: 0,
	posY: 0,
	direction: Maze.DirectionType.EAST,
	pegmanActions: [],

	pegmanSprite: null,
	anim: null,
	tween: null,

	init: function(pegmanSprite, coords){
		this.posX = coords.x;
		this.posY = coords.y;
		this.pegmanSprite = pegmanSprite;

		this.postInit();
		this.reset();
	},

	reset: function() {
		this.preReset();
		this.tween = null;
		this.anim = null;

		this.posX = Maze.start_.x;
		this.posY = Maze.start_.y;
		this.direction = Maze.DirectionType.EAST;
		this.pegmanActions = [];
		this.postReset();
	},

	nextAction: function(action) {
		this.pegmanActions.push(action);
	},

	play: function() {
		this.playNextAction();
	},

	playNextAction: function() {
		if (this.pegmanActions.length <= 0)
			return;

		this.finishPreviousAction();
		if (this.tween) {
			this.tween = null;
		}
		if (this.anim) {
			this.anim = null;
		}

		var action = this.pegmanActions.shift();
		// console.log(action);
		switch (action) {
			case "forward":
				var step = Maze.getStepInDirection[Maze.directionToString(this.direction)];
				this.moveTo(this.posX + step[0], this.posY + step[1]);
				break;
			case "left":
				this.turnToInternal(Maze.constrainDirection4(this.direction + 1));
				break;
			case "right":
				this.turnToInternal(Maze.constrainDirection4(this.direction - 1));
				break;
		}
	},

	turnToInternal: function(newDirection) {
		var d = Maze.directionToString(this.direction);
		this.direction = newDirection;
		d += "_" + Maze.directionToString(this.direction);
		this.turnTo(d);
	},
};

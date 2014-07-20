
includeJS("phaserjs/phaser.min.js");

var game = null;

var initDemo = function() {
	// remove existing Canvas object
	document.getElementById('canvas').remove();
	game = new Phaser.Game(400, 400, Phaser.AUTO, 'canvasContainer', {
		preload: preload,
		create: create,
		update: update,
	}, true);

	var pegman = null;

	function preload () {
		game.load.spritesheet('tiles', './assets/tiles_pegman.png', Maze.SQUARE_SIZE, Maze.SQUARE_SIZE);
		game.load.spritesheet('pegman', './assets/pegman.png', Maze.PEGMAN_WIDTH, Maze.PEGMAN_HEIGHT-1);
		game.load.image('marker', './assets/marker.png')
	}

	function create () {
		//var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
		//logo.anchor.setTo(0.5, 0.5);

		drawMaze();

		var marker = game.add.sprite(Maze.finish_.x * Maze.SQUARE_SIZE, Maze.finish_.y * Maze.SQUARE_SIZE, 'marker');
		marker.anchor.setTo(-0.75, 0.1);

		pegman = game.add.sprite(0, 0, 'pegman');
		pegman.kill();
		pegman.anchor.setTo(0, 0.15);
		var fps = 7;
		pegman.animations.add('NORTH', [0], fps, /*loop*/false);
		pegman.animations.add('EAST', [4], fps, /*loop*/false);
		pegman.animations.add('SOUTH', [8], fps, /*loop*/false);
		pegman.animations.add('WEST', [12], fps, /*loop*/false);
		pegman.animations.add('WEST_SOUTH', [12, 11, 10, 9, 8], fps, /*loop*/false);
		pegman.animations.add('SOUTH_WEST', [8, 9, 10, 11, 12], fps, /*loop*/false);
		pegman.animations.add('WEST_NORTH', [12, 13, 14, 15, 0], fps, /*loop*/false);
		pegman.animations.add('NORTH_WEST', [0, 15, 14, 13, 12], fps, /*loop*/false);
		pegman.animations.add('EAST_SOUTH', [4, 5, 6, 7, 8], fps, /*loop*/false);
		pegman.animations.add('SOUTH_EAST', [8, 7, 6, 5, 4], fps, /*loop*/false);
		pegman.animations.add('EAST_NORTH', [4, 3, 2, 1, 0], fps, /*loop*/false);
		pegman.animations.add('NORTH_EAST', [0, 1, 2, 3, 4], fps, /*loop*/false);

		Pegman.init(pegman, Maze.start_);
	}

	function update() {
	}
};

var drawTileAt = function(tileId, x, y)
{
	var coords = Maze.tile_SHAPES[tileId];
	var tileIndex = coords[1] * 5 + coords[0];
	game.add.sprite(x * Maze.SQUARE_SIZE, y * Maze.SQUARE_SIZE, 'tiles', tileIndex);
}

var Pegman = {
	posX: 0,
	posY: 0,
	direction: Maze.DirectionType.EAST,

	pegmanActions: [],
	pegmanSprite: null,

	tween: null,
	anim: null,

	init: function(pegmanSprite, coords){
		this.posX = coords.x;
		this.posY = coords.y;
		this.pegmanSprite = pegmanSprite;

		this.reset();
	},

	nextAction: function(action) {
		this.pegmanActions.push(action);
	},

	play: function() {
		this.playNextAction();
	},

	reset: function() {
		if (this.tween) {
			this.tween.stop();
			this.tween = null;
		}
		if (this.anim) {
			this.anim.stop();
			this.anim = null;
		}
		this.posX = Maze.start_.x;
		this.posY = Maze.start_.y;
		this.direction = Maze.DirectionType.EAST;
		this.pegmanActions = [];
		this.pegmanSprite.reset(this.posX * Maze.SQUARE_SIZE, this.posY * Maze.SQUARE_SIZE);
		this.pegmanSprite.animations.play(Maze.directionToString(this.direction));
	},

	playNextAction: function() {
		if (this.pegmanActions.length <= 0)
			return;

		if (this.tween) {
			this.tween = null;
		}
		if (this.anim) {
			this.anim = null;
		}

		var action = this.pegmanActions.shift();
		switch (action) {
			case "forward":
				this.moveForward();
				break;
			case "left":
				this.turnTo(Maze.constrainDirection4(this.direction + 1));
				break;
			case "right":
				this.turnTo(Maze.constrainDirection4(this.direction - 1));
				break;
		}
	},

	moveForward: function(){
		var step = Maze.getStepInDirection[Maze.directionToString(this.direction)];
		this.posX += step[0];
		this.posY += step[1];

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

	turnTo: function(newDirection) {
		var d = Maze.directionToString(this.direction);
		this.direction = newDirection;
		d += "_" + Maze.directionToString(this.direction);
		//console.log(d);
		this.anim = this.pegmanSprite.animations.play(d);
		this.anim.onComplete.addOnce(function() {
			this.playNextAction();
		}, this);
	}
}


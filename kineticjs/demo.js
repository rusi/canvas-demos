
'use strict';

var loading = function() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var x = canvas.width / 2;
	var y = canvas.height / 2;

	context.font = '30pt Calibri';
	context.textAlign = 'center';
	context.textBaseling = 'middle';
	context.fillText('Loading...', x, y);
}();

var tiles = {};
var stage = null;
var layer = null;

var marker = null;


var Pegman = {
	posX: 0,
	posY: 0,
	direction: Maze.DirectionType.EAST,
	pegmanSprite: null,

	pegmanActions: [],
	tween: null,

	init: function(sprite, pos) {
		this.pegmanSprite = sprite;
		this.setDirection(this.direction);
		this.posX = pos.x;
		this.posY = pos.y;
		layer.add(this.pegmanSprite);

		// setup animation listeners
		this.pegmanSprite.on('frameIndexChange', function(evt)
		{
			var animation = Pegman.pegmanSprite.getAnimation();
			var animations = Pegman.pegmanSprite.getAnimations();
			var len = animations[animation].length / 4;

			if (len > 1 && evt.newVal >= len-1)
			{
				//Pegman.pegmanSprite.animation(Maze.directionToString(Pegman.direction));
				Pegman.pegmanSprite.stop();
				Pegman.pegmanSprite.animation(Maze.directionToString(Pegman.direction));
				Pegman.pegmanSprite.start();
				stage.draw();
				Pegman.playNextAction();
			}
		});
	},

	placeAt: function(coords){
		this.posX = coords.x;
		this.posY = coords.y;
		this.draw();
	},

	setDirection: function(direction){
		this.direction = Maze.constrainDirection4(direction);
		this.pegmanSprite.animation(Maze.directionToString(this.direction));
		stage.draw();
	},

	moveForward: function(){
		var step = Maze.getStepInDirection[Maze.directionToString(this.direction)];
		this.posX += step[0];
		this.posY += step[1];
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
	},
	turnLeft: function(){
		this.turnTo(Maze.constrainDirection4(this.direction + 1));
	},
	turnRight: function() {
		this.turnTo(Maze.constrainDirection4(this.direction - 1));
	},
	turnTo: function(newDirection) {
		var d = Maze.directionToString(this.direction);
		this.direction = newDirection;
		d += "_" + Maze.directionToString(this.direction);
		this.pegmanSprite.animation(d);
		this.pegmanSprite.start();
	},

	draw: function() {
		this.pegmanSprite.position({
			x: this.posX * Maze.SQUARE_SIZE,
			y: this.posY * Maze.SQUARE_SIZE,
		});
		stage.draw();
	},

	nextAction: function(action) {
		this.pegmanActions.push(action);
	},
	playNextAction: function() {
		if (this.tween)
			this.tween.destroy();
		this.tween = null;
		this.pegmanSprite.stop();
		if (this.pegmanActions.length <= 0)
			return;

		var action = this.pegmanActions.shift();
		switch (action) {
			case "forward":
				this.moveForward();
				break;
			case "left":
				this.turnLeft();
				break;
			case "right":
				this.turnRight();
				break;
		}
	},
	play: function() {
		if (this.tween)
			return;

		this.playNextAction();
	},

	reset: function() {
		if (this.tween)
			this.tween.destroy();
		this.tween = null;
		this.pegmanSprite.stop();
		this.pegmanActions = [];
		this.setDirection(Maze.DirectionType.EAST);
		this.placeAt(Maze.start_);
	},
};

var drawTileAt = function(tileId, x, y)
{
	//console.log(tileId);
	var tile = tiles[tileId].clone();
	tile.position({
		x: x * Maze.SQUARE_SIZE,
		y: y * Maze.SQUARE_SIZE,
	});
	layer.add(tile);
}

var drawMarkerAt = function(coords)
{
	marker.position({
		x: coords.x * Maze.SQUARE_SIZE,
		y: coords.y * Maze.SQUARE_SIZE,
	});
	layer.add(marker);
}

var loadTiles = function(spriteSheet)
{
	_.each(Maze.tile_SHAPES, function(value, key)
	{
		tiles[key] = new Kinetic.Image({
			image: spriteSheet,
			x: value[0] * Maze.SQUARE_SIZE,
			y: value[1] * Maze.SQUARE_SIZE,
			width: Maze.SQUARE_SIZE,
			height: Maze.SQUARE_SIZE,
			crop: {
				x: value[0] * Maze.SQUARE_SIZE,
				y: value[1] * Maze.SQUARE_SIZE,
				width: Maze.SQUARE_SIZE,
				height: Maze.SQUARE_SIZE
			},
			// stroke: "Red",
			// strokeWidth: 1
		});
		// layer.add(tiles[key]);
	});
	// stage.draw(); //repaint the stage
};

var loadMarker = function(spriteSheet)
{
	marker = new Kinetic.Image({
		image: spriteSheet,
		offset: {
			x: -0.5 * Maze.SQUARE_SIZE + spriteSheet.width / 2,
			y: -0.6 * Maze.SQUARE_SIZE + spriteSheet.height,
		},
		// stroke: "Red",
		// strokeWidth: 1,
	});
}

// could implement Pegman as a set of tiles + rotation index (as originally implemented),
// but want to test sprite animatinos here, which is why we setup each sequence as a separate animation.
var loadPegman = function(spriteSheet)
{
	var w = Maze.PEGMAN_WIDTH;
	var h = Maze.PEGMAN_HEIGHT - 1;
	var pegman = new Kinetic.Sprite({
		image: spriteSheet,
		offset: {
			x: -0.5 * Maze.SQUARE_SIZE + Maze.PEGMAN_WIDTH / 2,
			y: -0.9 * Maze.SQUARE_SIZE + Maze.PEGMAN_HEIGHT,
		},
		animation: 'EAST',
		animations: {
			// x, y, width, height (# frames)
			EAST: [
				 4 * w, 0, w, h
			],
			WEST: [
				12 * w, 0, w, h
			],
			NORTH: [
				 0, 0, w, h
			],
			SOUTH: [
				 8 * w, 0, w, h
			],
			WEST_SOUTH: [
				12 * w, 0, w, h,
				11 * w, 0, w, h,
				10 * w, 0, w, h,
				 9 * w, 0, w, h,
				 8 * w, 0, w, h,
			],
			SOUTH_WEST: [
				 8 * w, 0, w, h,
				 9 * w, 0, w, h,
				10 * w, 0, w, h,
				11 * w, 0, w, h,
				12 * w, 0, w, h,
			],
			WEST_NORTH: [
				12 * w, 0, w, h,
				13 * w, 0, w, h,
				14 * w, 0, w, h,
				15 * w, 0, w, h,
				 0 * w, 0, w, h,
			],
			NORTH_WEST: [
				 0 * w, 0, w, h,
				15 * w, 0, w, h,
				14 * w, 0, w, h,
				13 * w, 0, w, h,
				12 * w, 0, w, h,
			],
			EAST_SOUTH: [
				 4 * w, 0, w, h,
				 5 * w, 0, w, h,
				 6 * w, 0, w, h,
				 7 * w, 0, w, h,
				 8 * w, 0, w, h,
			],
			SOUTH_EAST: [
				 8 * w, 0, w, h,
				 7 * w, 0, w, h,
				 6 * w, 0, w, h,
				 5 * w, 0, w, h,
				 4 * w, 0, w, h,
			],
			EAST_NORTH: [
				 4 * w, 0, w, h,
				 3 * w, 0, w, h,
				 2 * w, 0, w, h,
				 1 * w, 0, w, h,
				 0 * w, 0, w, h,
			],
			NORTH_EAST: [
				 0 * w, 0, w, h,
				 1 * w, 0, w, h,
				 2 * w, 0, w, h,
				 3 * w, 0, w, h,
				 4 * w, 0, w, h,
			],
		},
		frameRate: 8,
		frameIndex: 0
	});
	return pegman;
}

var initBackground = function()
{
	var background = new Kinetic.Rect({
		width: 400,
		height: 400,
		fill: '#F1EEE7',
		stroke: 'black',
		strokeWidth: 1
	});
	layer.add(background);
}

var initStage = function(images)
{
	stage = new Kinetic.Stage({
		container: 'canvasContainer',
		width: 400,
		height: 400
	});

	layer = new Kinetic.Layer();

	initBackground();
	loadTiles(images['tiles']);
	loadMarker(images['marker']);

	// drawPegmanAt({x: 100, y: 100});
	drawMaze();
	drawMarkerAt(Maze.finish_);
	Pegman.init(loadPegman(images['pegman']), Maze.start_);
	Pegman.draw();

	stage.add(layer);
};

var loadImages = function(sources, callback)
{
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if (++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
};

var sources = {
	tiles: './assets/tiles_pegman.png',
	marker: './assets/marker.png',
	pegman: './assets/pegman.png',
};
setTimeout(function() {
	loadImages(sources, initStage);
}, 1500);

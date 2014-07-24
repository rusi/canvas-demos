
includeJS("easeljs/easeljs-0.7.1.min.js");
includeJS("easeljs/tweenjs-0.5.1.min.js");

var stage = null;
var tiles = null;

var initDemo = function() {
	stage = new createjs.Stage("canvas");

	// load tiles
	tiles = new createjs.SpriteSheet({
		images: ["assets/tiles_pegman.png"],
		frames: {width: Maze.SQUARE_SIZE, height: Maze.SQUARE_SIZE},
	});

	// render maze
	drawMaze();

	// load and draw finish marker
	var markerSheet = new createjs.SpriteSheet({
		images: ["assets/marker.png"],
		frames: {width: 20, height: 34, regX: -(50-20)/2, regY: 4},
		animations: {},
	});
	var marker = new createjs.Sprite(markerSheet);
	marker.x = Maze.finish_.x * Maze.SQUARE_SIZE;
	marker.y = Maze.finish_.y * Maze.SQUARE_SIZE;
	stage.addChild(marker);

	// pegman
	var pegmanSheet = new createjs.SpriteSheet({
		images: ["assets/pegman.png"],
		framerate: 7,
		frames: {width: Maze.PEGMAN_WIDTH, height: Maze.PEGMAN_HEIGHT-1, regX: 0, regY: 8},
		animations: {
			NORTH: 0,
			EAST: 4,
			SOUTH: 8,
			WEST: 12,
			WEST_SOUTH: { frames: [12,11,10,9,8], next: 'SOUTH' },
			SOUTH_WEST: [8,12,'WEST'],
			WEST_NORTH: { frames: [12,13,14,15,0], next: 'NORTH' },
			NORTH_WEST: { frames: [0,15,14,13,12], next: 'WEST' },
			EAST_SOUTH: [4,8,'SOUTH'],
			SOUTH_EAST: { frames: [8,7,6,5,4], next: 'EAST' },
			EAST_NORTH: { frames: [4,3,2,1,0], next: 'NORTH' },
			NORTH_EAST: [0,4,'EAST'],
		},
	});
	var pegman = new createjs.Sprite(pegmanSheet);
	Pegman.init(pegman, Maze.start_);

	//stage.update();
	createjs.Ticker.addEventListener("tick", stage);
};

var drawTileAt = function(tileId, x, y)
{
	var coords = Maze.tile_SHAPES[tileId];
	var tileIndex = coords[0] + coords[1] * 5;
	var sprite = new createjs.Sprite(tiles);
	sprite.gotoAndStop(tileIndex);
	sprite.x = x * Maze.SQUARE_SIZE;
	sprite.y = y * Maze.SQUARE_SIZE;
	stage.addChild(sprite);
}
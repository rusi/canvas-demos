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

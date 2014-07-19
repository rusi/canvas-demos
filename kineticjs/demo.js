
loading = function() {
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

var pegman = null;
var marker = null;

drawTileAt = function(tileId, x, y)
{
	//console.log(tileId);
	var tile = tiles[tileId].clone();
	tile.position({
		x: x * Maze.SQUARE_SIZE,
		y: y * Maze.SQUARE_SIZE,
	});
	layer.add(tile);
}

drawMarkerAt = function(coords)
{
	marker.position({
		x: coords.x * Maze.SQUARE_SIZE,
		y: coords.y * Maze.SQUARE_SIZE,
	});
	layer.add(marker);
}

drawPegmanAt = function(coords)
{
	pegman.position({
		x: coords.x * Maze.SQUARE_SIZE,
		y: coords.y * Maze.SQUARE_SIZE,
	});
	layer.add(pegman);
	pegman.start();
}

loadTiles = function(spriteSheet)
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

loadMarker = function(spriteSheet)
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
loadPegman = function(spriteSheet)
{
	var w = Maze.PEGMAN_WIDTH;
	var h = Maze.PEGMAN_HEIGHT - 1;
	pegman = new Kinetic.Sprite({
		image: spriteSheet,
		offset: {
			x: -0.5 * Maze.SQUARE_SIZE + Maze.PEGMAN_WIDTH / 2,
			y: -0.9 * Maze.SQUARE_SIZE + Maze.PEGMAN_HEIGHT,
		},
		animation: 'rightToDown',
		animations: {
			// x, y, width, height (# frames)
			right: [
				 4 * w, 0, w, h
			],
			left: [
				12 * w, 0, w, h
			],
			up: [
				 0, 0, w, h
			],
			down: [
				 8 * w, 0, w, h
			],
			leftToDown: [
				12 * w, 0, w, h,
				11 * w, 0, w, h,
				10 * w, 0, w, h,
				 9 * w, 0, w, h,
				 8 * w, 0, w, h,
			],
			downToLeft: [
				 8 * w, 0, w, h,
				 9 * w, 0, w, h,
				10 * w, 0, w, h,
				11 * w, 0, w, h,
				12 * w, 0, w, h,
			],
			leftToUp: [
				12 * w, 0, w, h,
				13 * w, 0, w, h,
				14 * w, 0, w, h,
				15 * w, 0, w, h,
				 0 * w, 0, w, h,
			],
			upToLeft: [
				 0 * w, 0, w, h,
				15 * w, 0, w, h,
				14 * w, 0, w, h,
				13 * w, 0, w, h,
				12 * w, 0, w, h,
			],
			rightToDown: [
				 4 * w, 0, w, h,
				 5 * w, 0, w, h,
				 6 * w, 0, w, h,
				 7 * w, 0, w, h,
				 8 * w, 0, w, h,
			],
			downToRight: [
				 8 * w, 0, w, h,
				 7 * w, 0, w, h,
				 6 * w, 0, w, h,
				 5 * w, 0, w, h,
				 4 * w, 0, w, h,
			],
			rightToUp: [
				 4 * w, 0, w, h,
				 3 * w, 0, w, h,
				 2 * w, 0, w, h,
				 1 * w, 0, w, h,
				 0 * w, 0, w, h,
			],
			upToRight: [
				 0 * w, 0, w, h,
				 1 * w, 0, w, h,
				 2 * w, 0, w, h,
				 3 * w, 0, w, h,
				 4 * w, 0, w, h,
			],
		},
		frameRate: 7,
		frameIndex: 0
	});

	var frameCount = 0;
	pegman.on('frameIndexChange', function(evt)
	{
		// if (pegman.animation() === 'punch' && ++frameCount > 3) {
		if (++frameCount >= 5)
		{
			pegman.animation('down');
			frameCount = 0;
		}
	});
}

initBackground = function()
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

initStage = function(images)
{
	stage = new Kinetic.Stage({
		container: 'canvasContainer',
		width: 400,
		height: 400
	});

	layer = new Kinetic.Layer();

	initBackground();
	loadTiles(images['tiles']);
	loadPegman(images['pegman']);
	loadMarker(images['marker']);

	// drawPegmanAt({x: 100, y: 100});
	drawMaze();
	drawPegmanAt(Maze.start_);
	drawMarkerAt(Maze.finish_);

	stage.add(layer);

	// var tween = new Kinetic.Tween({
	// 	node: pegman,
	// 	x: Maze.finish_.x * Maze.SQUARE_SIZE,
	// 	y: Maze.finish_.y * Maze.SQUARE_SIZE,
	// 	rotation: 0,
	// 	duration: 5,
	// 	onFinish: function() {
	// 		pegman.setAnimation("rightToDown");
	// 		var tween2 = new Kinetic.Tween({
	// 			node: pegman,
	// 			onFinish: function() { pegman.setAnimation('left'); }
	// 		}).play();
	// 	},
	// }).play();

};

loadImages = function(sources, callback)
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
	tiles: '../assets/tiles_pegman.png',
	marker: '../assets/marker.png',
	pegman: '../assets/pegman.png',
};
loadImages(sources, initStage);


includeJS('fabricjs/fabric.min.js');

'use strict';

var canvas = null;
var tiles = {};
var count = 0;

var loadTiles = function()
{
	_.each(Maze.tile_SHAPES, function(value, key)
	{
		count += 1;
		fabric.Image.fromURL('assets/tiles_pegman.png', function(img){
			img.set({
				left: 0,
				top: 0,
				clipTo: function (ctx) {
					// 0, 0 is the center of the image...
					ctx.rect(-img.width/2 + (value[0] * Maze.SQUARE_SIZE), -img.height/2 + (value[1] * Maze.SQUARE_SIZE), Maze.SQUARE_SIZE, Maze.SQUARE_SIZE);
				}
			});
			img.offsetX = value[0] * Maze.SQUARE_SIZE;
			img.offsetY = value[1] * Maze.SQUARE_SIZE;
			tiles[key] = img;
			//canvas.add(img);
			// TODO: simple way to know when ALL tiles have been loaded
			// console.log(count + " == " + _.keys(tiles).length);
			if (count === _.keys(tiles).length)
			{
				tilesLoaded();
			}
		});
	});
}

var drawTileAt = function(tileId, x, y)
{
	//console.log(tileId);
	var tile = fabric.util.object.clone(tiles[tileId]);
	//var tile = tiles[tileId].clone(function(img){
	tile.set({
		left: x * Maze.SQUARE_SIZE - tile.offsetX,
		top: y * Maze.SQUARE_SIZE - tile.offsetY,
	});
	canvas.add(tile);
	//});
}

var tilesLoaded = function()
{
	drawMaze();
}

var initDemo = function()
{
	document.getElementById("canvas").style.background = "transparent";

	canvas = new fabric.StaticCanvas('canvas', {
		backgroundColor: '#F1EEE7',
	});

	loadTiles();

	// fabric.Image.fromURL('assets/tiles_pegman.png', function(img){
	// 	img.set({
	// 		left: 0,
	// 		top: 0,
	// 		// clipTo: function (ctx) {
	// 		// 	// 0, 0 is the center of the image...
	// 		// 	ctx.rect(-img.width/2+ 50, -img.height/2, 50, 50);
	// 		// }
	// 	});
	// 	canvas.add(img);
	// });

	canvas.renderAll();
};
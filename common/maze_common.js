/**
 * @fileoverview From Blockly's Maze application.
 */
'use strict';


/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
var getStringParamFromUrl = function(name, defaultValue) {
  var val =
      window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};
/**
 * Extracts a numeric parameter from the URL.
 * If the parameter is absent or less than min_value, min_value is
 * returned.  If it is greater than max_value, max_value is returned.
 * @param {string} name The name of the parameter.
 * @param {number} minValue The minimum legal value.
 * @param {number} maxValue The maximum legal value.
 * @return {number} A number in the range [min_value, max_value].
 */
var getNumberParamFromUrl = function(name, minValue, maxValue) {
  var val = Number(getStringParamFromUrl(name, 'NaN'));
  return isNaN(val) ? minValue : Math.min(Math.max(minValue, val), maxValue);
};
//////////////////////////

/**
 * Create a namespace for the application.
 */
var Maze = {};


Maze.MAX_LEVEL = 10;
Maze.LEVEL = getNumberParamFromUrl('level', 1, Maze.MAX_LEVEL);

Maze.SKINS = [
  // sprite: A 1029x51 set of 21 avatar images.
  // tiles: A 250x200 set of 20 map images.
  // marker: A 20x34 goal image.
  // background: An optional 400x450 background image, or false.
  // graph: Colour of optional grid lines, or false.
  // look: Colour of sonar-like look icon.
  // winSound: List of sounds (in various formats) to play when the player wins.
  // crashSound: List of sounds (in various formats) for player crashes.
  // crashType: Behaviour when player crashes (stop, spin, or fall).
  {
    sprite: 'pegman.png',
    tiles: 'tiles_pegman.png',
    marker: 'marker.png',
    background: false,
    graph: false,
    look: '#000',
    winSound: ['apps/maze/win.mp3', 'apps/maze/win.ogg'],
    crashSound: ['apps/maze/fail_pegman.mp3', 'apps/maze/fail_pegman.ogg'],
    crashType: Maze.CRASH_STOP
  },
  {
    sprite: 'astro.png',
    tiles: 'tiles_astro.png',
    marker: 'marker.png',
    background: 'bg_astro.jpg',
    // Coma star cluster, photo by George Hatfield, used with permission.
    graph: false,
    look: '#fff',
    winSound: ['apps/maze/win.mp3', 'apps/maze/win.ogg'],
    crashSound: ['apps/maze/fail_astro.mp3', 'apps/maze/fail_astro.ogg'],
    crashType: Maze.CRASH_SPIN
  },
  {
    sprite: 'panda.png',
    tiles: 'tiles_panda.png',
    marker: 'marker.png',
    background: 'bg_panda.jpg',
    // Spring canopy, photo by Rupert Fleetingly, CC licensed for reuse.
    graph: false,
    look: '#000',
    winSound: ['apps/maze/win.mp3', 'apps/maze/win.ogg'],
    crashSound: ['apps/maze/fail_panda.mp3', 'apps/maze/fail_panda.ogg'],
    crashType: Maze.CRASH_FALL
  }
];
Maze.SKIN_ID = getNumberParamFromUrl('skin', 0, Maze.SKINS.length);
Maze.SKIN = Maze.SKINS[Maze.SKIN_ID];

/**
 * The types of squares in the maze, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Maze.SquareType = {
  WALL: 0,
  OPEN: 1,
  START: 2,
  FINISH: 3
};

/**
 * Constants for cardinal directions.  Subsequent code assumes these are
 * in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
Maze.DirectionType = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/West/South/East squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
Maze.tile_SHAPES = {
  '10010': [4, 0],  // Dead ends
  '10001': [3, 3],
  '11000': [0, 1],
  '10100': [0, 2],
  '11010': [4, 1],  // Vertical
  '10101': [3, 2],  // Horizontal
  '10110': [0, 0],  // Elbows
  '10011': [2, 0],
  '11001': [4, 2],
  '11100': [2, 3],
  '11110': [1, 1],  // Junctions
  '10111': [1, 0],
  '11011': [2, 1],
  '11101': [1, 2],
  '11111': [2, 2],  // Cross
  'null0': [4, 3],  // Empty
  'null1': [3, 0],
  'null2': [3, 1],
  'null3': [0, 3],
  'null4': [1, 3]
};

// The maze square constants defined above are inlined here
// for ease of reading and writing the static mazes.
Maze.map = [
// Level 0.
 undefined,
// Level 1.
 [[0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 3, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]],
// Level 2.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 0, 0, 0],
  [0, 0, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 3.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 1, 1, 1, 1, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 4.
/**
 * Note, the path continues past the start and the goal in both directions.
 * This is intentionally done so users see the maze is about getting from
 * the start to the goal and not necessarily about moving over every part of
 * the maze, 'mowing the lawn' as Neil calls it.
 */
 [[0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 1, 3, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0]],
// Level 5.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 6.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 7.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 2, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 3, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 8.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 2, 1, 1, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 9.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [3, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 2, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]],
// Level 10.
 [[0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 3, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0],
  [0, 2, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]]
][Maze.LEVEL];

/**
 * Measure maze dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each maze square (i.e. tile).
 */
Maze.ROWS = Maze.map.length;
Maze.COLS = Maze.map[0].length;
Maze.SQUARE_SIZE = 50;
Maze.PEGMAN_HEIGHT = 52;
Maze.PEGMAN_WIDTH = 49;

Maze.MAZE_WIDTH = Maze.SQUARE_SIZE * Maze.COLS;
Maze.MAZE_HEIGHT = Maze.SQUARE_SIZE * Maze.ROWS;
Maze.PATH_WIDTH = Maze.SQUARE_SIZE / 3;

Maze.start_ = {};
Maze.finish_ = {};

// Return a value of '0' if the specified square is wall or out of bounds,
// '1' otherwise (empty, start, finish).
var normalize = function(x, y) {
	if (x < 0 || x >= Maze.COLS || y < 0 || y >= Maze.ROWS) {
		return '0';
	}
	return (Maze.map[y][x] == Maze.SquareType.WALL) ? '0' : '1';
};

var drawMaze = function() {
	for (var y = 0; y < Maze.ROWS; y++)
	{
		for (var x = 0; x < Maze.COLS; x++)
		{
			// Compute the tile index.
			var tileId = normalize(x, y) +
				normalize(x, y - 1) +  // North.
				normalize(x + 1, y) +  // West.
				normalize(x, y + 1) +  // South.
				normalize(x - 1, y);   // East.
			// Draw the tile.
			if (!tiles[tileId])
			{
				// Empty square.  Use null0 for large areas, with null1-4 for borders.
				// Add some randomness to avoid large empty spaces.
				if (tileId == '00000' && Math.random() > 0.3) {
					tileId = 'null0';
				} else {
					tileId = 'null' + Math.floor(1 + Math.random() * 4);
				}
			}
			// drawTileAt is a framework specific implementation
			drawTileAt(tileId, x, y);

			// also identify start and finish coordinates
			if (Maze.map[y][x] == Maze.SquareType.START) {
				Maze.start_ = {x: x, y: y};
			} else if (Maze.map[y][x] == Maze.SquareType.FINISH) {
				Maze.finish_ = {x: x, y: y};
			}
		}
	}
};

Maze.directionToString = function(direction)
{
	switch (direction)
	{
		case Maze.DirectionType.EAST:
			return "EAST";
		case Maze.DirectionType.WEST:
			return "WEST";
		case Maze.DirectionType.SOUTH:
			return "SOUTH";
		case Maze.DirectionType.NORTH:
			return "NORTH";
		default:
			return "";
	}
};

Maze.getStepInDirection = {
	EAST: [1, 0],
	WEST: [-1, 0],
	SOUTH: [0, 1],
	NORTH: [0, -1],
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection4 = function(d) {
  d = Math.round(d) % 4;
  if (d < 0) {
    d += 4;
  }
  return d;
};

/**
 * Keep the direction within 0-15, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Maze.constrainDirection16 = function(d) {
  d = Math.round(d) % 16;
  if (d < 0) {
    d += 16;
  }
  return d;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Maze.bindClick = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

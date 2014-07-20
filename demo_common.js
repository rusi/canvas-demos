'use strict';

var runProgram = function() {
	var runButton = document.getElementById('runButton');
	var resetButton = document.getElementById('resetButton');
	// Ensure that Reset button is at least as wide as Run button.
	if (!resetButton.style.minWidth) {
		resetButton.style.minWidth = runButton.offsetWidth + 'px';
	}
	runButton.style.display = 'none';
	resetButton.style.display = 'inline';
	// Prevent double-clicks or double-taps.
	resetButton.disabled = false;

	Pegman.nextAction("forward");
	Pegman.nextAction("forward");
	Pegman.nextAction("left");
	Pegman.nextAction("forward");
	Pegman.nextAction("left");
	Pegman.nextAction("forward");
	Pegman.nextAction("left");
	Pegman.nextAction("forward");

	Pegman.nextAction("right");
	Pegman.nextAction("forward");
	Pegman.nextAction("right");
	Pegman.nextAction("forward");
	Pegman.nextAction("right");
	Pegman.nextAction("forward");
	Pegman.nextAction("right");
	Pegman.nextAction("forward");
	Pegman.nextAction("left");
	Pegman.play();
};

var resetProgram = function() {
	var runButton = document.getElementById('runButton');
	runButton.style.display = 'inline';
	document.getElementById('resetButton').style.display = 'none';
	// Prevent double-clicks or double-taps.
	runButton.disabled = false;

	Pegman.reset();
}

window.onload = function(e){
	Maze.bindClick('runButton', runProgram);
	Maze.bindClick('resetButton', resetProgram);
};
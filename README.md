Canvas Demos
============
The purpose of this project is to create the same application using different HTML5 Canvas
frameworks. This Maze demo is based on, and uses assets and code from Blocky's Maze:
    https://blockly-demo.appspot.com/static/apps/maze/index.html

Impelementation exists for the following frameworks:
* PhaserJS (game engine, uses Pixi for rendering) - http://phaser.io
* KineticJS (for interactive web graphics) - http://kineticjs.com
* PixiJS (rendering engine; 2D WebGL+Canvas) - http://www.pixijs.com

(not yet implemented)
* PandaJS
* EaselJS
* FabricJS

### Other evaluations and comparisons:
* The following StackOverflow link has an evaluation of FabricJS and KineticJS:
  http://stackoverflow.com/questions/8938969/current-state-of-javascript-canvas-libraries
* Another comparison between EaselJS, FabricJS, PaperJS, PixiJS:
  https://groups.google.com/forum/#!topic/flashcodersny/rU0-3zD7QIo

The application uses the following features:
* Images & Sprites
* Animation & Transitions/Tweens

The application does not USE any of:
* Drag-n-drop
* Collision detection
* Mouse & Keyboard events
* Physics

*You can compare 'demo.js' for each of the project to see the differences for yourself.*

PhaserJS - game engine
======================
* Tutorials - impressive collection of tutorials
  - http://examples.phaser.io - great set of examples / tutorials
  - http://gamemechanicexplorer.com
  - http://discoverphaser.com (book)
* Documentation - rich set of guides
  - http://phaser.io/getting-started-js.php
  - http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
  - http://docs.phaser.io/

### Pros
* Phaser.js IS a game development framework and as such, it makes it very easy to work with
  Sprites, Animations, Transitions.
* Very simple to start with and allows you to create a full game within ~100 lines of code.
* Has several physics engines.


Kinetic JS - for interactive web graphics
=========================================
* Tutorials - a handful of basic tutorials exist. However, I find Google & StackOverflow
  to be a lot more useful.
* Documentation - documentation for the API exists. However, the documentation is missing
  basic examples.
* User base & StackOverflow - it seems that there is a large user base and a lot of questions
  are covered and answered in StackOverflow.

### Pros
* Easy and simple to use.
* Has a number of basic shapes; supports 
* The "Tween" API is very nice and easy to use, and includes a number of Easings.

### Cons
* It would be useful to have a generic image/assets loader, even though it is easy to copy the
  image loader from the examples/tutorials.
* The Sprite animation API is somewhat limited and does not have options not to loop
  animations; there are also no events when the animation ends, so you have to manually manage 
  transitions, based on the current frameIndex.
* Not able to flip sprite animations.
* It is NOT a game engine and as such not suitable for complex games.
  Can be used to implement simple board games or similar.


Pixi JS - rendering engine
==========================
It seems that Pixi is designed as a fast and efficient rendering engine. It can be used for serious
game development but it is NOT a game engine. Pixi is encouraging developers to
extend existing basic classes, such as Sprite and TilingSprite, as a way to add new functionality.
Other frameworks are designed to use their shapes and constructs to assemble and compose a scene.

It is not suitable to use Pixi JS for this demo, beucase Pixi is pretty low level for the purpose of
the maze app. However, a number of game engines are built on top of Pixi which are used to implement
this demo project.

Tutorials:
- Building a Parallax Scroller with Pixi.js: Part 1
    http://www.yeahbutisitflash.com/?p=5226

### Pros
* Provides an asset loader; encourages use of TexturePacker (http://www.codeandweb.com/texturepacker).
* It has a nice support for Spine (http://esotericsoftware.com/spine-in-depth).

### Cons
* Unless using Spine, it does not provide an easy to use animations support. People usually extend
  Sprite or MovieClip to implement their own animation functionality.

#### Useful Comments / Links
* Tweening - http://www.html5gamedevs.com/topic/938-tweening/
* See QA - http://www.html5gamedevs.com/topic/2393-creating-an-object-with-multiple-animations-in-pixijs/



Additional Resources
====================
* http://www.html5gamedevs.com
* http://cdnjs.com
* http://physicsjs.challengepost.com


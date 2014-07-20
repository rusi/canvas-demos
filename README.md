Canvas Demos
============
The purpose of this project is to create the same application using different HTML5 Canvas
frameworks. This Maze demo is based on, and uses assets and code from Blocky's Maze:
    https://blockly-demo.appspot.com/static/apps/maze/index.html

Impelementation exists for the following frameworks:
* KineticJS (for interactive web graphics) - http://kineticjs.com
* PixiJS (rendering engine; 2D WebGL+Canvas) - http://www.pixijs.com

(in progress)
* PhaserJS (game engine, uses Pixi for rendering) - http://phaser.io

(not yet implemented)
* PandaJS
* EaselJS
* FabricJS


The application uses the following features:
* Images & Sprites
* Animation

The application does not USE any of:
* Drag-n-drop
* Collision detection
* Mouse & Keyboard events
* Physics

PhaserJS - game engine
======================
* Tutorials - impressive collection of tutorials
  - http://examples.phaser.io
  - http://gamemechanicexplorer.com
  - http://discoverphaser.com (book)


Kinetic JS - for interactive web graphics
=========================================
* Tutorials - a handful of basic tutorials exist. However, I find Google & StackOverflow
  to be a lot more useful.
* Documentation - documentation for the API exists. However, the documentation is missing
  basic examples.
* User base & StackOverflow - it seems that there is a large user base and a lot of questions
  are covered and answered in StackOverflow.

### Nice Features
* Easy and simple to use.
* Has a number of basic shapes; supports 
* The "Tween" API is very nice and easy to use, and includes a number of Easings.

### Shortcomings
* It would be useful to have a generic image/assets loader, even though it is easy to copy the
  image loader from the examples/tutorials.
* The Sprite animation API is somewhat limited and does not have options not to loop
  animations; there are also no events when the animation ends, so you have to manually manage 
  transitions, based on the current frameIndex.
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

### Nice Features
* Provides an asset loader; encourages use of TexturePacker (http://www.codeandweb.com/texturepacker).
* It has a nice support for Spine (http://esotericsoftware.com/spine-in-depth). 

### Shortcomings
* Unless using Spine, it does not provide an easy to use animations support. People usually extend
  Sprite or MovieClip to implement their own animation functionality.

#### Useful Comments / Links
See QA:
* http://www.html5gamedevs.com/topic/2393-creating-an-object-with-multiple-animations-in-pixijs/



Additional Resources
====================
* http://cdnjs.com


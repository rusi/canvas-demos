Canvas Demos
============
The purpose of this project is to create the same application using different HTML5 Canvas
frameworks. The Maze demo is based on, and uses assets and code from Blockly's Maze:
    https://blockly-demo.appspot.com/static/apps/maze/index.html

You can see the demos for each of the frameworks here:
* [PhaserJS](http://phaser.io) (game engine, uses Pixi for rendering)
  - http://rusi.github.io/canvas-demos/index.html
* [EaselJS/CreateJS](http://www.createjs.com/#!/EaselJS) (html5 canvas library)
  - http://rusi.github.io/canvas-demos/index.html?framework=easeljs
* [KineticJS](http://kineticjs.com) (for interactive web graphics)
  - http://rusi.github.io/canvas-demos/index.html?framework=kineticjs

*You can compare 'demo.js' and 'pegman.js' for each of the projects to see the differences for yourself.*

(incomplete; not suitable or hard to use for this demo)
* [FabricJS](http://fabricjs.com) (simple HTML5 canvas library; for interactive graphics)
  - http://rusi.github.io/canvas-demos/index.html?framework=fabricjs
  - rendered the tilemap but anything else seem to require a lot more work compared to the other frameworks
* [PixiJS](http://www.pixijs.com) (rendering engine; 2D WebGL+Canvas)
* [PandaJS](http://www.pandajs.net) (game engine)

### Other evaluations and comparisons:
* The following StackOverflow link has an evaluation of FabricJS and KineticJS:
  http://stackoverflow.com/questions/8938969/current-state-of-javascript-canvas-libraries
* Another comparison between EaselJS, FabricJS, PaperJS, PixiJS:
  https://groups.google.com/forum/#!topic/flashcodersny/rU0-3zD7QIo
* http://www.softr.li/blog/2012/06/20/which-html5-canvas-javascript-library-should-i-use

The application uses the following features:
* Images & Sprites
* Animation & Transitions/Tweens

The application does not USE any of:
* Drag-n-drop
* Collision detection
* Mouse & Keyboard events
* Physics

PhaserJS - game engine
======================
Phaser JS is a game engine build on top of Pixi JS.
* Tutorials - impressive collection of tutorials and demos/examples
  - http://examples.phaser.io - great set of examples / tutorials
  - http://www.photonstorm.com/phaser/tutorial-making-your-first-phaser-game
  - http://gamemechanicexplorer.com
  - http://discoverphaser.com (book)
* Documentation - rich set of guides
  - http://phaser.io/getting-started-js.php
  - http://docs.phaser.io/

### Pros
* Great documentation; lots of well organized examples.
* Phaser.js IS a game development framework and as such, it makes it very easy to work with
  Sprites, Animations, Transitions.
* Very simple to start with and allows you to create a full game within ~100 lines of code.
* Easy to load and use tilesets.
* Has several physics engines.


EaselJS - HTML5 canvas library
==============================
EaselJS - a Flash-Like Interface for the HTML5 Canvas. It is part of the CreateJS suite of JavaScript
libraries; (from "Using CreateJS - EaselJS"):
>- EaselJS - Makes working with HTML5 canvas easy (http://www.createjs.com/#!/EaselJS)
>- TweenJS - For tweening HTML5 and JavaScript properties (http://www.createjs.com/#!/TweenJS)
>- SoundJS - Lets you easily work with HTML5 audio
>- PreloadJS - Lets you manage and coordinate loading of assets

* Documentation - good documentation with examples explaining API usage
* Examples/Demos - good set of demos
* Tutorials - very good set of tutorials (google search)
  - http://www.createjs.com/tutorials/Getting%20Started/
  - http://code.tutsplus.com/tutorials/using-createjs-easeljs--net-34840
  - http://code.tutsplus.com/articles/getting-started-with-easeljs-a-flash-like-interface-for-the-html5-canvas--active-10382
  - http://blogs.msdn.com/b/davrous/archive/2011/07/21/html5-gaming-animating-sprites-in-canvas-with-easeljs.aspx
  - http://www.gamedev5.com/2013/06/tutorial-1-dragon-of-bosnia-basic-html.html
  - http://blog.createjs.com/createjs-sandbox-code-snippets-and-demos/

### Pros
* Good documentation with examples; good set of tutorials and demos.
* Handles SpriteSheets; easy to use/define animations and sprites.

### Cons
* Working with tilesets is a little tricky.
* No physics engine; most commonly used with Box2D (http://sandbox.createjs.com/EaselJS_Box2dWeb/)

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

Fabric JS - simple HTML5 canvas library
=======================================
* Tutorials - 4-part tutorial exists which is helpful in learning how to use FabricJS
  (http://fabricjs.com/articles/).
* Demos - good set of demos exist which show Fabric's functionality and strengths.

### Pros
* Documentation is available, but doesn't have example usage.
* FabricJS can be used to create a drawing tool, allowing users to draw and manipulate objects.

### Cons
* Does not provide image/asset loader.
* It is NOT a game engine; doesn't provide facilities to deal with tiles, animations, transitions, etc.

Panda JS - game engine
======================
Panda JS is another game engine build on top of Pixi JS.
* Tutorials - very limited
  - http://www.emanueleferonato.com/2014/03/05/look-at-panda-js-html5-game-engine-capabilities-with-a-working-game-prototype/
* Small snippet of code showing differences between Phaser and Panda JS
  - http://www.pandajs.net/snippets/9719395.html

### Pros
* Encourages good object-oriented design and implementation

### Cons
* Documentation is not very detailed; doesn't have a lot of examples nor tutorials.
* Hard to figure out; doesn't provide a minified js file, which makes it hard to 'install' and use.
* Seems to be designed for standalone HTML5 games.


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
- http://www.pixijs.com/resources/
- http://www.emanueleferonato.com/2014/02/26/complete-html5-concentration-game-made-with-pixi-js/

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


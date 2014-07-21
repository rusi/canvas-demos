game.module(
    'game.main'
)
.body(function() {

game.addAsset('tiles_pegman.png');

SceneGame = game.Scene.extend({
	// backgroundColor: 0xb9bec7,

	init: function() {
		var logo = new game.Sprite('tiles_pegman.png');
		logo.anchor.set(0.5, 0.5);
		logo.position.set(game.system.width / 2, game.system.height / 2);
		this.stage.addChild(logo);
	}
});

game.start();

});

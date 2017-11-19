// Here we use the 'official name' (menuState) when defining the state
var menuState = {
	create: function() {
		var fontCover = game.add.sprite(0, 0, 'fontCover');
		fontCover.scale.setTo(game.world.width / fontCover.width, 
			game.world.height / fontCover.height);
		
		var startButton = game.add.button(game.world.centerX, 
			game.world.height * 0.85, 'startButton', startOnClick, 
			this);
		startButton.anchor.setTo(0.5, 0.5);
		startButton.scale.setTo(0.8, 0.8);
	}
};

function startOnClick() {
	game.state.start('play');
}

// Here we use the 'official name' (loadState) when defining the state
var loadState = {
	preload: function() {
		game.load.image('loading', 'assets/loading.png');
	},

	create: function() {
		game.stage.backgroundColor = "#FFFFFF";

		var loading = game.add.sprite(game.world.centerX, game.world.centerY, 
			'loading');
		loading.anchor.setTo(0.5, 0.5);
		this.loadingText = game.add.text(game.world.centerX, 
			game.world.height * 0.7, '', {font: '32px Arial'});
		this.loadingText.anchor.setTo(0.5, 0.5);

		// You can listen for each of these events from Phaser.Loader
   		game.load.onLoadStart.add(loadStart, this);
    	game.load.onFileComplete.add(fileComplete, this);
    	game.load.onLoadComplete.add(loadComplete, this);

    	// objects
    	game.load.image('bird', 'assets/bird.png');
    	game.load.image('carrot', 'assets/carrot.png');
    	game.load.image('cat', 'assets/cat.png');
    	game.load.image('cherry', 'assets/cherry.png');
    	game.load.image('duck', 'assets/duck.png');
    	game.load.image('horse', 'assets/horse.png');
    	game.load.image('pumpkin','assets/pumpkin.png');
    	game.load.image('watermelon', 'assets/watermelon.png');

    	// coloured shapes
    	game.load.image('blueCircle', 'assets/blue_circle.png');
    	game.load.image('blueStar', 'assets/blue_star.png');
    	game.load.image('blueTriangle', 'assets/blue_triangle.png');
    	game.load.image('greenCircle', 'assets/green_circle.png');
    	game.load.image('greenStar', 'assets/green_star.png');
    	game.load.image('greenTriangle', 'assets/green_triangle.png');
		game.load.image('redCircle', 'assets/red_circle.png');
		game.load.image('redStar', 'assets/red_star.png');
		game.load.image('redTriangle', 'assets/red_triangle.png');
		game.load.image('yellowCircle', 'assets/yellow_circle.png');
		game.load.image('yellowStar', 'assets/yellow_star.png');
		game.load.image('yellowTriangle', 'assets/yellow_triangle.png');

    	// buttons
    	game.load.spritesheet('closeButton', 'assets/close_button.png', 41, 
    		41);
    	game.load.image('howToPlayButton', 'assets/how_to_play_button.png');
    	game.load.image('nextLevelButton', 'assets/next_level_button.png');
    	game.load.image('replayButton', 'assets/replay_button.png');
    	game.load.image('startButton', 'assets/start_button.png');
		game.load.image('submitAnswerButton', 
			'assets/submit_answer_button.png');

    	// others
    	game.load.image('emptyCard', 'assets/empty_card.png');
    	game.load.image('explanationWindow', 
    		'assets/explanation_window.png');
    	game.load.image('fontCover', 'assets/font_cover.png');
    	game.load.image('fontCoverBackground', 
    		'assets/font_cover_background.png');
    	game.load.image('levelText', 'assets/level_text.png');
    	game.load.image('loseBackground', 'assets/lose_background.png');
    	game.load.image('part1OfLoseText', 'assets/part1_of_lose_text.png');
    	game.load.image('part2OfLoseText', 'assets/part2_of_lose_text.png');
    	game.load.image('passBackground', 'assets/pass_background.png');
    	game.load.image('part1OfCongratulationText', 
    		'assets/part1_of_congratulation_text.png');
    	game.load.image('part2OfCongratulationText', 
    		'assets/part2_of_congratulation_text.png');
    	game.load.image('part3OfCongratulationText', 
    		'assets/part3_of_congratulation_text.png');
    	game.load.image('part4OfCongratulationText', 
    		'assets/part4_of_congratulation_text.png');
    	game.load.image('passAllBackground', 
    		'assets/pass_all_background.png');
    	game.load.image('part1OfPassAllText', 
    		'assets/part1_of_pass_all_text.png');
    	game.load.image('part2OfPassAllText', 
    		'assets/part2_of_pass_all_text.png');
    	game.load.image('part3OfPassAllText', 
    		'assets/part3_of_pass_all_text.png');
    	game.load.image('part4OfPassAllText', 
    		'assets/part4_of_pass_all_text.png');
    	game.load.image('part5OfPassAllText', 
    		'assets/part5_of_pass_all_text.png');
    	game.load.image('part6OfPassAllText', 
    		'assets/part6_of_pass_all_text.png');
    	game.load.image('part7OfPassAllText', 
    		'assets/part7_of_pass_all_text.png');
    	game.load.image('part8OfPassAllText', 
    		'assets/part8_of_pass_all_text.png');
    	game.load.image('promptText', 'assets/prompt_text.png');
    	game.load.image('questionBoxForThree', 
    		'assets/question_box_for_three.png');
    	game.load.image('questionBoxForTwo', 
    		'assets/question_box_for_two.png');
    	game.load.image('remainingTimeText', 
    		'assets/remaining_time_text.png');    	
    	game.load.image('scoreText', 'assets/score_text.png');
    	game.load.image('sideBar', 'assets/side_bar.png');
    	game.load.image('topBar', 'assets/top_bar.png');

    	game.load.start();
	}
};

function loadStart() {
	this.loadingText.setText("Loading ...");
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	this.loadingText.setText("Loading......" + progress + "%");
}

function loadComplete() {
	game.state.start('menu');
}
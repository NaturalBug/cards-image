// level setting
var ansDistr = {
	level1: {category1: 2, category2: 2},
	level2: {category1: 3, category2: 3},
	level3: {category1: 3, category2: 3},
	level4: {category1: 2, category2: 3},
	level5: {category1: 3, category2: 3},
	level6: {category1: 3, category2: 3},
	level7: {category1: 3, category2: 3},
	level8: {category1: 2, category2: 2, category3: 2},
	level9: {category1: 2, category2: 2, category3: 2},
	level10: {category1: 2, category2: 2, category3: 2}
};
var levelSetting = [
	{category: 2, constraints: 1, cards: 4, timeLimits: 100, answerDistribution: ansDistr['level1']},
	{category: 2, constraints: 1, cards: 8, timeLimits: 150, answerDistribution: ansDistr['level2']},
	{category: 2, constraints: 1, cards: 8, timeLimits: 150, answerDistribution: ansDistr['level3']},
	{category: 2, constraints: 1, cards: 8, timeLimits: 130, answerDistribution: ansDistr['level4']},
	{category: 2, constraints: 2, cards: 10, timeLimits: 200, answerDistribution: ansDistr['level5']},
	{category: 2, constraints: 3, cards: 10, timeLimits: 200, answerDistribution: ansDistr['level6']},
	{category: 2, constraints: 2, cards: 12, timeLimits: 250, answerDistribution: ansDistr['level7']},
	{category: 3, constraints: 3, cards: 12, timeLimits: 250, answerDistribution: ansDistr['level8']},
	{category: 3, constraints: 3, cards: 14, timeLimits: 230, answerDistribution: ansDistr['level9']},
	{category: 3, constraints: 4, cards: 14, timeLimits: 220, answerDistribution: ansDistr['level10']}
];

var currentLevel = 0;
var levelSize = 10;
var currentScore = 0;
var gameBackground;
var question1;
var question2;
var question3;
var questionBox1;
var questionBox2;
var questionBox3;
var questionText1;
var questionText2;
var questionText3;
var rectangleOfBox = [];
var cards;
var cardsGroup;
var answers = [];
var submitAnswerButton;
var prepareTimer;
var gameTimer;
var countdownTimer;
var countdownText;
var howToPlayButton;
var explanationWindow;
var closeButton;
var recid;
var recidIsGet = false;

// Here we use the 'official name' (playState) when defining the state
var playState = {
	create: function() {
		if (!recidIsGet) {
			getUserData();
			recidIsGet = true;
		}

		// main
		gameBackground = game.add.sprite(0, 0, 'fontCoverBackground');
		gameBackground.scale.setTo(game.world.width / gameBackground.width, 
			game.world.height / gameBackground.height);
		
		var topBar = game.add.sprite(game.world.width * 0.6125, game.world.height * 0.05, 'topBar');
		topBar.anchor.setTo(0.5, 0.5);
		topBar.scale.setTo(1.5, 1.5);
		var promptText = game.add.text(game.world.width * 0.6125, 
			game.world.height * 0.05, '請依據畫面中的提示分類', 
			{font: 'bold 32px 微軟正黑體', fill: '#000000'});
		promptText.anchor.setTo(0.5, 0.5);

		// categories
		if (levelSetting[currentLevel].category == 2) {
			questionBox1 = game.add.sprite(game.world.width * 0.7, 
				game.world.height * 0.3125, 'questionBoxForTwo');
			questionBox1.anchor.setTo(0.5, 0.5);
			questionBox1.scale.setTo(1.6, 1.2);
			rectangleOfBox[1] = new Phaser.Rectangle(game.world.width * 0.425, 
				game.world.height * 0.175, game.world.width * 0.55, 
				game.world.height * 0.325);
			questionText1 = game.add.text(game.world.width * 0.7, 
				game.world.height * 0.1375, '', {font: '32px 微軟正黑體', 
				fill: '#000000'});
			questionText1.anchor.setTo(0.5, 0.5);
			answers[1] = [];

			questionBox2 = game.add.sprite(game.world.width * 0.7, 
				game.world.height * 0.775, 'questionBoxForTwo');
			questionBox2.anchor.setTo(0.5, 0.5);
			questionBox2.scale.setTo(1.6, 1.2);
			rectangleOfBox[2] = new Phaser.Rectangle(game.world.width * 0.425, 
				game.world.height * 0.6375, game.world.width * 0.55, 
				game.world.height * 0.325);
			questionText2 = game.add.text(game.world.width * 0.7, 
				game.world.height * 0.6, '', {font: '32px 微軟正黑體', 
				fill: '#000000'});
			questionText2.anchor.setTo(0.5, 0.5);
			answers[2] = [];
		} else { // three categories
			questionBox1 = game.add.sprite(game.world.width * 0.7, 
				game.world.height * 0.25, 'questionBoxForThree');
			questionBox1.anchor.setTo(0.5, 0.5);
			questionBox1.scale.setTo(1.6, 1.2);
			rectangleOfBox[1] = new Phaser.Rectangle(game.world.width * 0.425, 
				game.world.height * 0.175, game.world.width * 0.55, 
				game.world.height * 0.20625);
			questionText1 = game.add.text(game.world.width * 0.7, 
				game.world.height * 0.14375, '', {font: '32px 微軟正黑體', 
				fill: '#000000'});
			questionText1.anchor.setTo(0.5, 0.5);
			answers[1] = [];

			questionBox2 = game.add.sprite(game.world.width * 0.7, 
				game.world.height * 0.55, 'questionBoxForThree');
			questionBox2.anchor.setTo(0.5, 0.5);
			questionBox2.scale.setTo(1.6, 1.2);
			rectangleOfBox[2] = new Phaser.Rectangle(game.world.width * 0.425, 
				game.world.height * 0.475, game.world.width * 0.55, 
				game.world.height * 0.20625);
			questionText2 = game.add.text(game.world.width * 0.7, 
				game.world.height * 0.44375, '', {font: '32px 微軟正黑體', 
				fill: '#000000'});
			questionText2.anchor.setTo(0.5, 0.5);
			answers[2] = [];

			questionBox3 = game.add.sprite(game.world.width * 0.7, 
				game.world.height * 0.85, 'questionBoxForThree');
			questionBox3.anchor.setTo(0.5, 0.5);
			questionBox3.scale.setTo(1.6, 1.2);
			rectangleOfBox[3] = new Phaser.Rectangle(game.world.width * 0.425, 
				game.world.height * 0.775, game.world.width * 0.55, 
				game.world.height * 0.20625);
			questionText3 = game.add.text(game.world.width * 0.7, 
				game.world.height * 0.74375, '', {font: '32px 微軟正黑體', 
				fill: '#000000'});
			questionText3.anchor.setTo(0.5, 0.5);
			answers[3] = [];
		}

		// countdown display
		var emptyCard = game.add.sprite(game.world.width * 0.325, 
			game.world.height * 0.2875, 'emptyCard');
		emptyCard.anchor.setTo(0.5, 0.5);
		emptyCard.scale.setTo(0.65, 0.65);
		countdownText = game.add.text(game.world.width * 0.325, 
			game.world.height * 0.2875, '3', 
			{font: 'bold 256px Arial', fill: '#000000'});
		countdownText.anchor.setTo(0.5, 0.5);
		
		submitAnswerButton = game.add.button(game.world.width * 0.321875, 
			game.world.height * 0.9375, 'submitAnswerButton', 
			submitAnswerOnClick, this);
		submitAnswerButton.anchor.setTo(0.5, 0.5);
		submitAnswerButton.scale.setTo(0.9, 0.9);
		submitAnswerButton.events.onInputOver.add(function() {
			submitAnswerButton.scale.setTo(1, 1);
		});
		submitAnswerButton.events.onInputOut.add(function() {
			submitAnswerButton.scale.setTo(0.9, 0.9);
		});
		submitAnswerButton.input.enabled = false;

		// explanation
		explanationWindow = game.add.sprite(game.world.width * 0.6125, 
			game.world.height * 0.5, 'explanationWindow');
		explanationWindow.anchor.setTo(0.5, 0.5);
		explanationWindow.visible = false;

		closeButton = game.add.button(game.world.width * 0.9375, 
			game.world.height * 0.1125, 'closeButton', closeOnClick, this, 
			0, 1);
		closeButton.input.enabled = false;
		closeButton.visible = false;

		// side
		var sideBar = game.add.sprite(0, 0, 'sideBar');
		sideBar.scale.setTo(300 / sideBar.width, 
			game.world.height / sideBar.height);

		var levelText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.1, 'levelText');
		levelText.scale.setTo(0.5, 0.5);
		levelText.anchor.setTo(0.5, 0.5);
		this.level = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.2, currentLevel + 1, {font: 'bold 50px Arial', 
			fill: '#000000'});
		this.level.anchor.setTo(0.5, 0.5);
		
		var remainingTimeText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.3, 'remainingTimeText');
		remainingTimeText.scale.setTo(0.5, 0.5);
		remainingTimeText.anchor.setTo(0.5, 0.5);
		this.remainingTime = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.4, 
			levelSetting[currentLevel].timeLimits, 
			{font: 'bold 50px Arial', fill: '#000000'});
		this.remainingTime.anchor.setTo(0.5, 0.5);
		
		var scoreText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.5, 'scoreText');
		scoreText.scale.setTo(0.5, 0.5);
		scoreText.anchor.setTo(0.5, 0.5);
		this.score = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.6, (currentScore == 0 ? '0' : currentScore)
			, {font: 'bold 50px Arial', fill: '#000000'});
		this.score.anchor.setTo(0.5, 0.5);

		howToPlayButton = game.add.button(game.world.width * 0.1125, 
			game.world.height * 0.8, 'howToPlayButton', howToPlayOnClick, 
			this);
		howToPlayButton.anchor.setTo(0.5, 0.5);
		howToPlayButton.input.enabled = false;

		// set two timers
		prepareTimer = game.time.create();
		gameTimer = game.time.create();
		countdownTimer = prepareTimer.add(Phaser.Timer.SECOND * 3, 
			function() {
				prepareTimer.stop();
				emptyCard.destroy();
				countdownText.destroy();
				generateQuestionsAndCards();
				game.world.bringToTop(explanationWindow);
				game.world.bringToTop(closeButton);
				submitAnswerButton.input.enabled = true;
				howToPlayButton.input.enabled = true;
				countdownTimer = gameTimer.add(Phaser.Timer.SECOND * 
				levelSetting[currentLevel].timeLimits, loseDisplay, this);	
				gameTimer.start();
			}, this);
		prepareTimer.start();
	},

	update: function() {
		if (prepareTimer.running) {
			countdownText.text = Math.round((countdownTimer.delay - 
				prepareTimer.ms) / 1000);
		}

		if (gameTimer.running) { // update remaining time
			this.remainingTime.text = 
				Math.round((countdownTimer.delay - gameTimer.ms) / 1000);
		}		
	}/*,

	render: function() {
		game.debug.rectangle(rectangleOfBox[1], '#ff0000', false);
		game.debug.rectangle(rectangleOfBox[2], '#ff0000', false);
		if (levelSetting[currentLevel].category == 3)
			game.debug.rectangle(rectangleOfBox[3], '#ff0000', false);
	}*/
};

function onDragStart(sprite, pointer) {
	var box;
	if ((box = cards[sprite.name][4]) != 0) {	// pick card form box
		for (var i = 0; i < answers[box].length; ++i) {
			if (answers[box][i] == sprite)
				break;
		}
		answers[box].splice(i, 1);
		reAligning(box);
	}
}

function reAligning(box) {
	if (answers[box].length != 0) {
		answers[box][0].alignIn(rectangleOfBox[box], Phaser.TOP_LEFT);
		for (var i = 1; i < answers[box].length; ++i) {
			if (i == 8) {
				if (levelSetting[currentLevel].category == 2) {
					answers[box][i].alignTo(answers[box][0], 
						Phaser.BOTTOM_CENTER);
				} else {
					answers[box][i].alignIn(rectangleOfBox[box], 
						Phaser.BOTTOM_LEFT);
				}
			} else {
				answers[box][i].alignTo(answers[box][i - 1], 
				Phaser.RIGHT_CENTER, 4);	
			}
		}
	}
}

function onDragStop(sprite, pointer) {
	if (levelSetting[currentLevel].category == 3 &&
		checkOverlap(sprite, questionBox3)) { // in box three
		if (cards[sprite.name][4] == 0) {
			sprite.scale.setTo(0.25, 0.25);
		}
		cards[sprite.name][4] = 3;
		answers[3].push(sprite);
		reAligning(3);
	} else if (checkOverlap(sprite, questionBox2)) { // in box two
		if (cards[sprite.name][4] == 0) {
			sprite.scale.setTo(0.25, 0.25);
		}
		cards[sprite.name][4] = 2;
		answers[2].push(sprite);
		reAligning(2);
	} else if (checkOverlap(sprite, questionBox1)) { // in box one
		if (cards[sprite.name][4] == 0) {
			sprite.scale.setTo(0.25, 0.25);
		}
		cards[sprite.name][4] = 1;
		answers[1].push(sprite);
		reAligning(1);
	} else { // out of box
		if (cards[sprite.name][4] != 0) {
			sprite.scale.setTo(0.65, 0.65);
			cards[sprite.name][4] = 0;
		}
	}
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function generateQuestionsAndCards() {
	var constraints = [0, 0, 0, 0];	// color, shape, number, content

	// select categories
	for (var i = 0; i < levelSetting[currentLevel].constraints; ++i) {
		var tempConstraint = game.rnd.integerInRange(0, 3);
		while (constraints[tempConstraint] == 1) {
			tempConstraint = game.rnd.integerInRange(0, 3);
		}
		constraints[tempConstraint] = 1;
	}

	// generate questions
	if (levelSetting[currentLevel].category == 3) {
		// question 3
		question3 = [-1, -1, -1, -1];
		generateQuestion(question3, constraints);

		// question 2
		do {
			question2 = [-1, -1, -1, -1];
			generateQuestion(question2, constraints);
		} while (!isDisjoint(question3, question2));

		// question 1
		do {
			question1 = [-1, -1, -1, -1];
			generateQuestion(question1, constraints);
		} while (!isDisjoint(question3, question1) || 
			!isDisjoint(question2, question1));
	} else {	// two categories
		// question 2
		question2 = [-1, -1, -1, -1];
		generateQuestion(question2, constraints);

		// question 1
		do {
			question1 = [-1, -1, -1, -1];
			generateQuestion(question1, constraints);
		} while (!isDisjoint(question2, question1));
	}

	// generate question text
	if (levelSetting[currentLevel].category == 3) {
		generateQuestionText(question3, questionText3, constraints);
	}
	generateQuestionText(question2, questionText2, constraints);
	generateQuestionText(question1, questionText1, constraints);

	// generate cards
	cards = [];
	if (levelSetting[currentLevel].category == 3) {
		generateCardsByQuestion(question3, 
			levelSetting[currentLevel].answerDistribution.category3);
	}
	generateCardsByQuestion(question2, 
		levelSetting[currentLevel].answerDistribution.category2);
	generateCardsByQuestion(question1, 
		levelSetting[currentLevel].answerDistribution.category1);
	while (cards.length < levelSetting[currentLevel].cards) {
		var card = [0, 0, 0, 0, 0]; // color, shape, number, content, position
		card[0] = game.rnd.integerInRange(0, 3);
		card[1] = game.rnd.integerInRange(0, 2);
		card[2] = game.rnd.integerInRange(0, 3);
		card[3] = game.rnd.integerInRange(0, 1) * 3 + 
			game.rnd.integerInRange(0, 2);

		if (levelSetting[currentLevel].category == 3 && 
			isMatch(card, question3)) {
			continue;
		} else if (!isMatch(card, question2) && !isMatch(card, question1)) {
			cards.push(card);
		}
	}

	// create card images
	createCardImages();
}

function generateQuestion(question, constraints) {
	if (constraints[0] != 0) {
		question[0] = game.rnd.integerInRange(0, 3);
	}

	if (constraints[1] != 0) {
		question[1] = game.rnd.integerInRange(0, 2);
	}

	if (constraints[2] != 0) {
		question[2] = game.rnd.integerInRange(0, 3); 
	}

	if (constraints[3] != 0) {
		question[3] = game.rnd.integerInRange(0, 1) * 3 + 
			game.rnd.integerInRange(0, 2); 
	}
}

function isDisjoint (array1, array2) {
	if (array1[3] == 0 && array2[3] == 1 || array1[3] == 0 && array2[3] == 2 
		|| array1[3] == 3 && array2[3] == 4 || 
		array1[3] == 3 && array2[3] == 5 || 
		array2[3] == 0 && array1[3] == 1 || array2[3] == 0 && array1[3] == 2 
		|| array2[3] == 3 && array1[3] == 4 || 
		array2[3] == 3 && array1[3] == 5) {
		return false;
	}

	for (var i = 0; i < 4; ++i) {
		if (array1[i] != array2[i]) {
			return true;
		}
	}

	return false;
}

function generateQuestionText(question, questionText, constraints) {
	var tempText = '';
	if (constraints[0] != 0) {	// color
		switch (question[0]) {
			case 0: tempText = tempText.concat('藍色'); break;
			case 1: tempText = tempText.concat('綠色'); break;
			case 2: tempText = tempText.concat('紅色'); break;
			case 3: tempText = tempText.concat('黃色'); break;
			default: break;
		}
	}

	if (constraints[1] != 0) {	// shape
		switch (question[1]) {
			case 0: tempText = tempText.concat('圓形'); break;
			case 1: tempText = tempText.concat('星形'); break;
			case 2: tempText = tempText.concat('三角形'); break;
			default: break;
		}
	}

	if (constraints[2] != 0) {	// number
		switch (question[2]) {
			case 0: tempText = tempText.concat('數字為1'); break;
			case 1: tempText = tempText.concat('數字為2'); break;
			case 2: tempText = tempText.concat('數字為3'); break;
			case 3: tempText = tempText.concat('數字為4'); break;
			default: break;
		}
	}

	if (constraints[3] != 0) {	// content
		if (constraints[0] != 0 && constraints[1] != 0 && 
			constraints[2] != 0) {
			tempText = tempText.concat('且為');
		}
		switch (question[3]) {
			case 0: tempText = tempText.concat('動物'); break;
			case 1: tempText = tempText.concat('兩隻腳動物'); break;
			case 2: tempText = tempText.concat('四隻腳動物'); break;
			case 3: tempText = tempText.concat('植物'); break;
			case 4: tempText = tempText.concat('蔬菜'); break;
			case 5: tempText = tempText.concat('水果'); break;
			default: break;
		}
	}

	tempText = tempText.concat('的紙牌');
	questionText.text = tempText;
}

function generateCardsByQuestion(question, numberOfCards) {
	for (var i = 0; i < numberOfCards; ++i) {
		var card = [0, 0, 0, 0, 0]; // color, shape, number, content, position
		for (j = 0; j < 4; ++j) {
			if (question[j] == -1) {	// random setting
				switch (j) {
					case 0: case 2:
						card[j] = game.rnd.integerInRange(0, 3);
						break;
					case 1:
						card[j] = game.rnd.integerInRange(0, 2);
						break;
					case 3:
						card[j] = game.rnd.integerInRange(0, 1) * 3 + 
							game.rnd.integerInRange(0, 2);
						break;
					default: 
						break;
				}
			} else {	// specific setting
				card[j] = question[j];
			}
		}
		cards.push(card);
	}
}

function isMatch(card, question) {
	for (var i = 0; i < 4; ++i) {
		if (question[i] != -1 && question[i] != card[i]) {
			if (i != 3) {
				return false;
			} else if (question[i] == 1 && card[i] == 0 || 
				question[i] == 2 && card[i] == 0 ||
				question[i] == 4 && card[i] == 3 ||
				question[i] == 5 && card[i] == 3 ||
				question[i] == 0 && card[i] == 1 ||
				question[i] == 0 && card[i] == 2 ||
				question[i] == 3 && card[i] == 4 ||
				question[i] == 3 && card[i] == 5) {	// for generate card
				return true;
			} else {
				return false;
			}
		}
	}
	return true;
}

function createCardImages() {
	// shuffer the cards
	for (var i = 0; i < levelSetting[currentLevel].cards; ++i) {
		var j = game.rnd.integerInRange(0, 
			levelSetting[currentLevel].cards - 1);
		var tempCard = cards[i];
		cards[i] = cards[j];
		cards[j] = tempCard;
	}

	var colorShapes = [['blueCircle', 'blueStar', 'blueTriangle'], 
		['greenCircle', 'greenStar', 'greenTriangle'], 
		['redCircle', 'redStar', 'redTriangle'], 
		['yellowCircle', 'yellowStar', 'yellowTriangle']];

	var contents = [['bird', 'cat', 'duck', 'horse'], 
		['bird', 'duck'], ['cat', 'horse'],
		['carrot', 'cherry', 'pumpkin', 'watermelon'],
		['carrot', 'pumpkin'], ['cherry', 'watermelon']];

	// create cards in the group
	cardsGroup = game.add.group();
	for (var i = 0; i < levelSetting[currentLevel].cards; ++i) {
		var tempCard = game.add.sprite(game.world.width * 0.325, 
			game.world.height * 0.2875, 'emptyCard');
		tempCard.anchor.setTo(0.5, 0.5);
		tempCard.scale.setTo(0.65, 0.65);
		tempCard.inputEnabled = true;
		tempCard.input.enableDrag(false, true);
		tempCard.input.boundsSprite = gameBackground;
		tempCard.events.onDragStart.add(onDragStart, this);
		tempCard.events.onDragStop.add(onDragStop, this);

		var tempColorShape = 
			game.add.sprite(0, 0, colorShapes[cards[i][0]][cards[i][1]]);
		tempColorShape.anchor.setTo(0.5, 0.5);
		tempColorShape.scale.setTo(1.5, 1.5);
		tempCard.addChild(tempColorShape);

		var tempContentKey = 
			contents[cards[i][3]][game.rnd.integerInRange(0, 
				contents[cards[i][3]].length - 1)];
		switch (cards[i][2]) {	// number
			case 0: // one
				var tempContent = game.add.sprite(0, 0, tempContentKey);
				tempContent.anchor.setTo(0.5, 0.5);
				if (tempContentKey != 'watermelon')
					tempContent.scale.setTo(1.5, 1.5);
				tempCard.addChild(tempContent);
				break;
			case 1: // two
				var tempContent1 = 
					game.add.sprite(0, -tempCard.height / 3, tempContentKey);
				var scaleRate = (tempCard.height / 2.5) / tempContent1.height;
				tempContent1.anchor.setTo(0.5, 1);
				tempContent1.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent1);
				var tempContent2 = 
					game.add.sprite(0, tempCard.height / 3, tempContentKey);
				tempContent2.anchor.setTo(0.5, 0);
				tempContent2.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent2);
				break;
			case 2: // three
				var tempContent1 = 
					game.add.sprite(0, -tempCard.height / 3, tempContentKey);
				var scaleRate = (tempCard.height / 2.5) / tempContent1.height;
				tempContent1.anchor.setTo(0.5, 1);
				tempContent1.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent1);
				var tempContent2 = 
					game.add.sprite(0, 0, tempContentKey);
				tempContent2.anchor.setTo(0.5, 0.5);
				tempContent2.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent2);
				var tempContent3 = 
					game.add.sprite(0, tempCard.height / 3, tempContentKey);
				tempContent3.anchor.setTo(0.5, 0);
				tempContent3.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent3);
				break;
			case 3: // four
				var tempContent1 = 
					game.add.sprite(-tempCard.width / 1.5, 
						-tempCard.height / 1.5, tempContentKey);
				var scaleRate = (tempCard.width / 1.5) / tempContent1.width;
				tempContent1.anchor.setTo(0, 0);
				tempContent1.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent1);
				var tempContent2 = 
					game.add.sprite(tempCard.width / 1.5, 
						-tempCard.height / 1.5, tempContentKey);
				tempContent2.anchor.setTo(1, 0);
				tempContent2.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent2);
				var tempContent3 = 
					game.add.sprite(-tempCard.width / 1.5, 
						tempCard.height / 1.5, tempContentKey);
				tempContent3.anchor.setTo(0, 1);
				tempContent3.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent3);
				var tempContent4 = 
					game.add.sprite(tempCard.width / 1.5, 
						tempCard.height / 1.5, tempContentKey);
				tempContent4.anchor.setTo(1, 1);
				tempContent4.scale.setTo(scaleRate, scaleRate);
				tempCard.addChild(tempContent4);
				break;
			default:
				break;
		}
		// use name to index the card
		tempCard.name = i;
		// add card into group
		cardsGroup.add(tempCard);
	}
}

function submitAnswerOnClick() {
	cardsGroup.setAll('input.enabled', false);
	submitAnswerButton.input.enabled = false;
	howToPlayButton.input.enabled = false;

	if (isAllCorrect()) {
		postData(recid, currentLevel + 1, currentScore + 10, 
			Math.round(gameTimer.ms / 1000), 100);
		gameTimer.stop();
		if (currentLevel < 9) {	// pass
			var passBackground = game.add.sprite(game.world.width * 0.6125, 
				game.world.height * 0.5, 'passBackground');
			passBackground.anchor.setTo(0.5, 0.5);
			passBackground.scale.setTo(1.75, 2.5);
			passBackground.alpha = 0.8;
		
			var part1OfCongratulationText = 
				game.add.sprite(game.world.width * 0.375, 
					game.world.height * 0.45, 'part1OfCongratulationText');
			part1OfCongratulationText.anchor.setTo(0.5, 0.5);
			part1OfCongratulationText.scale.setTo(0.5, 0.5);
			part1OfCongratulationText.visible = false;

			var part2OfCongratulationText = 
				game.add.sprite(game.world.width * 0.525, 
					game.world.height * 0.45, 'part2OfCongratulationText');
			part2OfCongratulationText.anchor.setTo(0.5, 0.5);
			part2OfCongratulationText.scale.setTo(0.5, 0.5);
			part2OfCongratulationText.visible = false;
			
			var part3OfCongratulationText = 
				game.add.sprite(game.world.width * 0.675, 
					game.world.height * 0.45, 'part3OfCongratulationText');
			part3OfCongratulationText.anchor.setTo(0.5, 0.5);
			part3OfCongratulationText.scale.setTo(0.5, 0.5);
			part3OfCongratulationText.visible = false;
			
			var part4OfCongratulationText = 
				game.add.sprite(game.world.width * 0.825, 
					game.world.height * 0.45, 'part4OfCongratulationText');
			part4OfCongratulationText.anchor.setTo(0.5, 0.5);
			part4OfCongratulationText.scale.setTo(0.5, 0.5);
			part4OfCongratulationText.visible = false;

			var nextLevelButton = game.add.button(game.world.width * 0.6125, 
				game.world.height * 0.65, 'nextLevelButton', 
				nextLevelOnClick, this);
			nextLevelButton.anchor.setTo(0.5, 0.5);
			nextLevelButton.events.onInputOver.add(function() {
				nextLevelButton.scale.setTo(1.1, 1.1);
			});
			nextLevelButton.events.onInputOut.add(function() {
				nextLevelButton.scale.setTo(1, 1);
			});
			nextLevelButton.input.enabled = false;
			nextLevelButton.visible = false;

			var fallDownNextLevelButton = 
				game.add.tween(nextLevelButton).from(
					{y: game.world.height * 0.55}, 50, 
					Phaser.Easing.Bounce.Out);

			var fallDownPart4OfCongratulationText = 
				game.add.tween(part4OfCongratulationText).from(
					{y: game.world.height * 0.35}, 50, 
					Phaser.Easing.Linear.None);
			fallDownPart4OfCongratulationText.onComplete.add(function() {
				nextLevelButton.visible = true;
				nextLevelButton.input.enabled = true;
				fallDownNextLevelButton.start();
			});
		
			var fallDownPart3OfCongratulationText = 
				game.add.tween(part3OfCongratulationText).from(
					{y: game.world.height * 0.35}, 50, 
					Phaser.Easing.Linear.None);
			fallDownPart3OfCongratulationText.onComplete.add(function() {
				part4OfCongratulationText.visible = true;
				fallDownPart4OfCongratulationText.start();
			});

			var fallDownPart2OfCongratulationText = 
				game.add.tween(part2OfCongratulationText).from(
					{y: game.world.height * 0.35}, 50, 
					Phaser.Easing.Linear.None);
			fallDownPart2OfCongratulationText.onComplete.add(function() {
				part3OfCongratulationText.visible = true;
				fallDownPart3OfCongratulationText.start();
			});
		
			var fallDownPart1OfCongratulationText = 
				game.add.tween(part1OfCongratulationText).from(
					{y: game.world.height * 0.35}, 50, 
					Phaser.Easing.Linear.None);
			fallDownPart1OfCongratulationText.onComplete.add(function() {
				part2OfCongratulationText.visible = true;
				fallDownPart2OfCongratulationText.start();
			});

			var fallDownPassBackground = game.add.tween(passBackground).from(
				{y: 0}, 300, Phaser.Easing.Bounce.Out, true);
			fallDownPassBackground.onComplete.add(function() {
				part1OfCongratulationText.visible = true;
				fallDownPart1OfCongratulationText.start();
			});
		} else {	// pass all
			currentScore += 10;
			var passAllBackground = 
				game.add.sprite(game.world.width * 0.6125, 
					game.world.centerY, 'passAllBackground');
			passAllBackground.anchor.setTo(0.5, 0.5);
			passAllBackground.scale.setTo(1.75, 1.75);
			passAllBackground.alpha = 0.5;

			var part1OfPassAllText = 
				game.add.sprite(game.world.width * 0.4825, 
					game.world.height * 0.35, 'part1OfPassAllText');
			part1OfPassAllText.anchor.setTo(0.5, 0.5);
			part1OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part2OfPassAllText = 
				game.add.sprite(game.world.width * 0.6125, 
					game.world.height * 0.35, 'part2OfPassAllText');
			part2OfPassAllText.anchor.setTo(0.5, 0.5);
			part2OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part3OfPassAllText = 
				game.add.sprite(game.world.width * 0.7425, 
					game.world.height * 0.35, 'part3OfPassAllText');
			part3OfPassAllText.anchor.setTo(0.5, 0.5);
			part3OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part4OfPassAllText = 
				game.add.sprite(game.world.width * 0.3525, 
					game.world.height * 0.7, 'part4OfPassAllText');
			part4OfPassAllText.anchor.setTo(0.5, 0.5);
			part4OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part5OfPassAllText = 
				game.add.sprite(game.world.width * 0.4825, 
					game.world.height * 0.7, 'part5OfPassAllText');
			part5OfPassAllText.anchor.setTo(0.5, 0.5);
			part5OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part6OfPassAllText = 
				game.add.sprite(game.world.width * 0.6125, 
					game.world.height * 0.7, 'part6OfPassAllText');
			part6OfPassAllText.anchor.setTo(0.5, 0.5);
			part6OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part7OfPassAllText = 
				game.add.sprite(game.world.width * 0.7425, 
					game.world.height * 0.7, 'part7OfPassAllText');
			part7OfPassAllText.anchor.setTo(0.5, 0.5);
			part7OfPassAllText.scale.setTo(0.5, 0.5);
		
			var part8OfPassAllText = 
				game.add.sprite(game.world.width * 0.8725, 
					game.world.height * 0.7, 'part8OfPassAllText');
			part8OfPassAllText.anchor.setTo(0.5, 0.5);
			part8OfPassAllText.scale.setTo(0.5, 0.5);

			var fallDownPart1OfPassAllText = 
				game.add.tween(part1OfPassAllText).from(
					{y: game.world.height * 0.15}, 400, 
					Phaser.Easing.Bounce.Out, true);
		
			var fallDownPart2OfPassAllText = 
				game.add.tween(part2OfPassAllText).from(
					{y: game.world.height * 0.15}, 400, 
					Phaser.Easing.Bounce.Out, true, 100);
		
			var fallDownPart3OfPassAllText = 
				game.add.tween(part3OfPassAllText).from(
					{y: game.world.height * 0.15}, 400, 
					Phaser.Easing.Bounce.Out, true, 200);
		
			var fallDownPart4OfPassAllText = 
				game.add.tween(part4OfPassAllText).from(
					{y: game.world.height * 0.5}, 400, 
					Phaser.Easing.Bounce.Out, true, 300);
		
			var fallDownPart5OfPassAllText = 
				game.add.tween(part5OfPassAllText).from(
					{y: game.world.height * 0.5}, 400, 
					Phaser.Easing.Bounce.Out, true, 400);
		
			var fallDownPart6OfPassAllText = 
				game.add.tween(part6OfPassAllText).from(
					{y: game.world.height * 0.5}, 400, 
					Phaser.Easing.Bounce.Out, true, 500);
		
			var fallDownPart7OfPassAllText = 
				game.add.tween(part7OfPassAllText).from(
					{y: game.world.height * 0.5}, 400, 
					Phaser.Easing.Bounce.Out, true, 600);
		
			var fallDownPart8OfPassAllText = 
				game.add.tween(part8OfPassAllText).from(
					{y: game.world.height * 0.5}, 400, 
					Phaser.Easing.Bounce.Out, true, 700);
		}
	} else {
		loseDisplay();
	}
}

function isAllCorrect() {
	if (levelSetting[currentLevel].category == 3) {
		if (levelSetting[currentLevel].answerDistribution.category3 != 
			answers[3].length) {
			return false;
		}
		for (var i = 0; i < answers[3].length; ++i) {
			if (!isMatch(cards[answers[3][i].name], question3))
				return false;
		}
	}

	if (levelSetting[currentLevel].answerDistribution.category2 != 
		answers[2].length) {
		return false;
	}
	for (var i = 0; i < answers[2].length; ++i) {
		if (!isMatch(cards[answers[2][i].name], question2))
			return false;
	}

	if (levelSetting[currentLevel].answerDistribution.category1 != 
		answers[1].length) {
		return false;
	}
	for (var i = 0; i < answers[1].length; ++i) {
		if (!isMatch(cards[answers[1][i].name], question1))
			return false;
	}

	return true;
}

function nextLevelOnClick() {
	currentLevel++;
	currentScore += 10;
	game.state.start('play');
}

function loseDisplay() {
	gameTimer.stop();
	// lose
	var loseBackground = game.add.sprite(game.world.width * 0.6125, 
		game.world.height * 0.5, 'loseBackground');
	loseBackground.anchor.setTo(0.5, 0.5);
	loseBackground.scale.setTo(1.75, 2.5);
	loseBackground.alpha = 0.7;
		
	var part2OfLoseText = game.add.sprite(game.world.width * 0.7125, 
		game.world.height * 0.475, 'part2OfLoseText');
	part2OfLoseText.anchor.setTo(0.5, 0.5);
	part2OfLoseText.scale.setTo(0.6, 0.6);
	part2OfLoseText.visible = false;
		
	var part1OfLoseText = game.add.sprite(game.world.width * 0.5125, 
		game.world.height * 0.475, 'part1OfLoseText');
	part1OfLoseText.anchor.setTo(0.5, 0.5);
	part1OfLoseText.scale.setTo(0.6, 0.6);
	part1OfLoseText.visible = false;

	var replayButton = game.add.button(game.world.width * 0.6125, 
		game.world.height * 0.675, 'replayButton', replayOnClick, this);
	replayButton.anchor.setTo(0.5, 0.5);
	replayButton.scale.setTo(0.9, 0.9);
	replayButton.alpha = 0;
	replayButton.input.enabled = false;
	replayButton.events.onInputOut.add(function() {
		replayButton.scale.setTo(0.9, 0.9);
	});
	replayButton.events.onInputOver.add(function() {
		replayButton.scale.setTo(1, 1);
	});

	var fadeInReplayButton = game.add.tween(replayButton).to({alpha: 1}, 100, 
		Phaser.Easing.Linear.None);

	var movePart1OfLoseTextLeft = game.add.tween(part1OfLoseText).from(
		{x: game.world.width * 0.6125}, 200, Phaser.Easing.Linear.None, 
		false, 400);

	var movePart2OfLoseTextRight = game.add.tween(part2OfLoseText).from(
		{x: game.world.width * 0.6125}, 200, Phaser.Easing.Linear.None, 
		false, 400);
	movePart2OfLoseTextRight.onComplete.add(function() {
		replayButton.input.enabled = true;
		fadeInReplayButton.start();
	});

	var moveLoseBackgroundLeft = game.add.tween(loseBackground).from(
		{x: game.world.width * 1.5}, 500, Phaser.Easing.Linear.None, 
		true);
	moveLoseBackgroundLeft.onComplete.add(function() {
		part1OfLoseText.visible = true;
		movePart1OfLoseTextLeft.start();
		part2OfLoseText.visible = true;
		movePart2OfLoseTextRight.start();
	});
}

function replayOnClick() {
	game.state.start('play');
}

function howToPlayOnClick() {
	cardsGroup.setAll('input.enabled', false);
	explanationWindow.visible = true;
	closeButton.visible = true;
	closeButton.input.enabled = true;
	howToPlayButton.input.enabled = false;
	submitAnswerButton.input.enabled = false;
	gameTimer.pause();
}

function closeOnClick() {
	cardsGroup.setAll('input.enabled', true);
	explanationWindow.visible = false;
	closeButton.visible = false;
	closeButton.input.enabled = false;
	howToPlayButton.input.enabled = true;
	submitAnswerButton.input.enabled = true;
	gameTimer.resume();	
}
(function () {

    var level = {
        current: 1,
        maxLevel: 3
    }
    var isGameOver = false;
	var isGameWin = false;

    var wronganswer = Math.floor((Math.random()*100)+1);
    var firstNumber=0;
	var secondNumber=0;

	var possible="/+-*";
	var text="";

	var questions =""; 
	var answer=0;
			
	text=possible.charAt(Math.floor(Math.random()*possible.length));
	
//numbers
	firstNumber=Math.floor((Math.random()*20)+1);
	secondNumber=Math.floor((Math.random()*10)+1);

// to make easy examples
	if ((text=="/") && (secondNumber>firstNumber)){
    	var x=firstNumber;
    	firstNumber=secondNumber; 
    	secondNumber=x;
    	questions=firstNumber+text+secondNumber;
	} else{
    	questions=firstNumber+text+secondNumber;
	}
		
	if ((text=="/") && ((firstNumber % secondNumber)>0)){
		for(var a=secondNumber; a=0; a--){
		secondNumber--;
		}
	}		
	question=firstNumber+text+secondNumber;
		
//answer		
	switch(text) {
		case "+":
			answer=(firstNumber+secondNumber);
		break;

		case "/":
			answer=(firstNumber/secondNumber);
		break;

		case "*":
			answer=(firstNumber*secondNumber);
		break;

		case "-":
            answer=(firstNumber-secondNumber);
		break;
	}
		
// time setting for animation
	var pict = -1;
	var time = 500;
	
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

// Create canvas
    var canvas = document.createElement("canvas");
    var c = canvas.getContext("2d");
    canvas.width = windowWidth * 0.95;
    if (canvas.width > 1200) {
        canvas.width = 1200;
    }
    canvas.height = 600;
    document.body.appendChild(canvas);

// Background image
    var testImage = new Image();
    testImage.addEventListener("load", init, false);
    testImage.src = "foto/bgtest.png";

// Game over image
    var background2 = new Image();
    background2.addEventListener("load", init, false);
    background2.src = "foto/background2.png";
	
	var backgroundWin = new Image();
	backgroundWin.addEventListener("load", init, false);
	backgroundWin.src= "foto/youwin.png";

    var sharkReady3 = false;
    var sharkImage3 = new Image();
    sharkImage3.onload = function () {
        sharkReady3 = true;
    };
    sharkImage3.src = "foto/shark7.png";

// Shark image
    var sharkReady = false;
    var sharkImage = new Image();
    sharkImage.onload = function () {
        sharkReady = true;
    };
    sharkImage.src = "foto/shark7.png";

// // Shark image 2
    var sharkReady2 = false;
    var sharkImage2 = new Image();
    sharkImage2.onload = function () {
        sharkReady2 = true;
    };
    sharkImage2.src = "foto/lShark.png";

	// Shark Animated - right -
	var sharkAnimReady = false;
    var sharkAnimR = new Image();
    sharkAnimR.onload = function () {
        sharkAnimReady = true;
    };
    sharkAnimR.src = "foto/shark22.png";
	
	// Shark Animated - left -
	var sharkAnimReady2 = false;
    var sharkAnimL = new Image();
    sharkAnimL.onload = function () {
        sharkAnimReady2 = true;
    };
    sharkAnimL.src = "foto/shark22left.png";
	
// Fish image
    var fishReady = false;
    var fishImage = new Image();
    fishImage.onload = function () {
        fishReady = true;
    };
    fishImage.src = "foto/fish_question.png";

// Fish 2 image
    var fish2Ready = false;
    var fish2Image = new Image();
    fish2Image.onload = function () {
        fish2Ready = true;
    };
    fish2Image.src = "foto/fish_question.png";

// Bonus fish image
    var bonusFishReady = false;
    var bonusFishImage = new Image ();
    bonusFishImage.onload = function () {
        bonusFishReady = true;
    };
    bonusFishImage.src = "foto/fish_bonus.png";

// Penalty fish image
    var penaltyFishReady = false;
    var penaltyFishImage = new Image ();
    penaltyFishImage.onload = function () {
        penaltyFishReady = true;
    };
    penaltyFishImage.src = "foto/fish_penalty.png";

// Bomb image
    var bombReady = false;
    var bombImage = new Image ();
    bombImage.onload = function () {
        bombReady = true;
    };
    bombImage.src = "foto/bomb.png";


    var randomizeCoordinate = function (maxValue) {
        return 32 + (Math.random() * (maxValue - 32));
    };

// Game objects
    var shark = {
        speed: 250, // Movement in pixels per second
      

    };
	function mainFish(speed, x, y){
	this.speed=speed;
	this.x=x;
	this.y=y;
	
	}
    var fish = new mainFish(1.25,randomizeCoordinate(canvas.width),randomizeCoordinate(canvas.height));
    var fish2 = new mainFish(1.25,randomizeCoordinate(canvas.width),randomizeCoordinate(canvas.height));
    var bonusFish = new mainFish(2,randomizeCoordinate(canvas.width),randomizeCoordinate(canvas.height));
    var penaltyFish = new mainFish(2,randomizeCoordinate(canvas.width),randomizeCoordinate(canvas.height));
    var bomb = new mainFish(1.5,randomizeCoordinate(canvas.width),randomizeCoordinate(canvas.height));
	
	

    var fishesCaught = 0;

    // Timer bar definitions
    var pt1 = {x: canvas.width-200, y: 560};    // gradient start point
    var pt2 = {x: canvas.width-50, y: 560};    // gradient end point
    var gradient = c.createLinearGradient(pt1.x, pt1.y, pt2.x, pt2.y);

    gradient.addColorStop(0, "#ff0000");   // Red
    gradient.addColorStop(1 / 3, "#ffa500"); // Orange
    gradient.addColorStop(2 / 3, "#ffff00"); // Yellow
    gradient.addColorStop(1, "#00ff00");   // Green


// Handle keyboard controls
    var keysPressed = {};

    addEventListener("keydown", function (e) {
        keysPressed[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysPressed[e.keyCode];
    }, false);


// Reset the game when the player catches a fish
    var reset = function (fishObject) {
        // Throw the fish somewhere on the screen randomly
        fishObject.x = c.canvas.width + 5;
        fishObject.y = randomizeCoordinate(c.canvas.height);
    };
	
    var checkLevelAdvance = function() {
        if(level.current == 1 && fishesCaught == 5) {
            level.current++;
        } else if(level.current == 2 && fishesCaught == 10) {
            // won the game!
			level.current++;
			}else if (level.current==3 && fishesCaught==15){
			gameWin();
        }
    }

	var questionAnswer= function(fceAns){		
		//defining sign
		text=possible.charAt(Math.floor(Math.random()*possible.length));
		
		//numbers
		firstNumber=Math.floor((Math.random()*50)+1);
		secondNumber=Math.floor((Math.random()*10)+1);
		
		if (text=="/") {
            firstNumber=Math.floor((Math.random()*20)+1);
            secondNumber=Math.floor((Math.random()*5)+1);
		}
		// to make easy examples
		if ((text=="/") && (secondNumber>firstNumber)){
    		var x=firstNumber;
    		firstNumber=secondNumber;
    		secondNumber=x;
    		questions=firstNumber+text+secondNumber;
    	} else {
            questions=firstNumber+text+secondNumber;
		}
			
		//answer		
		switch(text) {
		case "+":
    		answer=(firstNumber+secondNumber);
		break;

		case "/":
            answer=(firstNumber/secondNumber);
		break;

		case "*":
            answer=(firstNumber*secondNumber);
		break;

		case "-":
            answer=(firstNumber-secondNumber);
		break;
		}
	};

	var sharkAnimation= function (animation){
		pictures = ["sharkFinal.png","shark3.png","shark22.png","shark3.png","sharkFinal.png"];
		if (pict+1==pictures.length) pict=0;
		else pict++;
		obrazek.src = pictures[pict];
		window.setTimeout('animation()',time);
    }

// Update game objects

    var update = function (modifier) {
        
        shark.x--; // Makes the shark move to the left (with the current) if none of the keys are being pressed

        // Shark speed change by level
        var maxLevelEffect = 0.2;
        var levelBasedModifier = 1 - (level.current-1) * (maxLevelEffect/(level.maxLevel-1));
        modifier *= levelBasedModifier;

        // Keyboard controls for shark-movement

        if (38 in keysPressed) {
            // Player holding up
            shark.y -= shark.speed * modifier;
            if (shark.y < -200)  // If shark goes out of canvas (top of screen) ...... //
            {
                shark.y = 580; 		// ^^ return it to bottom of screen //
            }
		}

        if (40 in keysPressed) {
            // Player holding down
            shark.y += shark.speed * modifier;
            if (shark.y > 580)  // If shark goes out of canvas (bottom of screen) ...... //
            {
                shark.y = -100; // return it from top of screen
            }
        }

        if (37 in keysPressed) { // Player holding left
            shark.x -= shark.speed * modifier;
        }


        if (39 in keysPressed) { // Player holding right
            shark.x += shark.speed * modifier * 2;
        }

        if (32 in keysPressed) { // Player holding space
            shark.speed = 450;
        } else {
            shark.speed = 250;
        }

        if (shark.x < 0) // Stops shark from going over the left side
        {
            shark.x = 0;
        }
        if (shark.x > c.canvas.width) // If shark goes over the right side of canvas, return it from the left..
        {
            shark.x = -5;
        }

        // Handle shark and fish collision here
        if (shark.x <= (fish.x + 105)
            && fish.x <= (shark.x + 105)
            && shark.y <= (fish.y + 105)
            && fish.y <= (shark.y + 105)
            ) {
            ++fishesCaught;
            soundFX.play();
            reset(fish);
			questionAnswer(questions);
			//sharkImage = sharkAnimR;
            checkLevelAdvance();
        }

        if (fish.x < 0) // If fish goes out of screen on the left side, reset it's position
        {
            reset(fish);
        }


        // Handle shark and fish2 collision here
        if (shark.x <= (fish2.x + 105)
            && fish2.x <= (shark.x + 105)
            && shark.y <= (fish2.y + 105)
            && fish2.y <= (shark.y + 105)
            ) {
            --fishesCaught; // Minus one fish if you catch wrong one!
            soundFX.play();
            reset(fish2);
            wronganswer = null; 
			//sharkImage = sharkAnimR;			
			// Resets wronganswer when it is caught
            if (wronganswer == null)
            {
                 wronganswer = Math.floor((Math.random()*100)+1);
            }


        }

        if (fish2.x < 0) // If fish2 goes out of screen on the left side, reset it's position
        {
            reset(fish2); // Resets wronganswer when fish goes out of screen
            wronganswer = null;
            if (wronganswer == null)
            {
                wronganswer = Math.floor((Math.random()*100)+1);
            }
        }



        // Handle shark and bonusFish collision here
        if (level.current==2
			&& shark.x <= (bonusFish.x + 105)
            && bonusFish.x <= (shark.x + 105)
            && shark.y <= (bonusFish.y + 105)
            && bonusFish.y <= (shark.y + 105)
            ) {
           // ++fishesCaught;
            soundFX.play();
            timer.changeRemaninigTimeBy(3);
            reset(bonusFish);
			//sharkImage = sharkAnimR;
        }

        if (bonusFish.x < 0) {
            reset(bonusFish);
        }

          // Handle shark and penaltyFish collision here
        if (level.current==2
			&& shark.x <= (penaltyFish.x + 105)
            && penaltyFish.x <= (shark.x + 105)
            && shark.y <= (penaltyFish.y + 105)
            && penaltyFish.y <= (shark.y + 105)
            ) {
            soundFX.play();
            timer.changeRemaninigTimeBy(-3);
            reset(penaltyFish);
		//	sharkImage = sharkAnimR;
        }

        if (penaltyFish.x < 0) {
            reset(penaltyFish);
        }

        if (level.current == 2
            && bomb.x <= (shark.x + 200)
            && bomb.x + 63 >= shark.x
            && bomb.y <= (shark.y + 100)
            && bomb.y + 63 >= (shark.y)
            ) {
            soundFX.play();
            gameOver();
        }

        if (bomb.x < 0) {
            reset(bomb);
        }
    };


    // Timer
    var timer = {
        gameDuration: 30,  // if you want to change the time you need to change both gameDuration
        remainingTime: 30, // and remainingTime and they should be same.
        isStarted: false,
        handle: null,
        startTimer: function () {
            if (timer.isStarted == false) {
                timer.isStarted = true;
                timer.handle = setInterval(timer.tick, 1000);
            }
        },
        stopTimer: function () {
            timer.isStarted = false;
            clearInterval(timer.handle);
        },
        tick: function () {
            timer.remainingTime -= 1;
            if (timer.remainingTime < 0) {
                timer.remainingTime = 0;
                timer.stopTimer();

                gameOver();
            }
        },
        convertTime: function () {
            var minutes = Math.floor(timer.remainingTime / 60);
            var seconds = timer.remainingTime - minutes * 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return minutes + ":" + seconds;
        },
        getFillColor: function () {
            var fillStyle;
            if (timer.remainingTime <= timer.gameDuration / 4) {
                fillStyle = "rgb(255, 0, 0)";
            } else if (timer.remainingTime <= timer.gameDuration / 2) {
                fillStyle = "rgb(255, 165, 0)";
            } else if (timer.remainingTime <= timer.gameDuration * 3 / 4) {
                fillStyle = "rgb(255, 255, 0)";
            } else {
                fillStyle = "rgb(0, 255, 0)";
            }
            return fillStyle;
        },
        isTimeUp: function () {
            return timer.remainingTime == 0;
        },
        getRemainingPercentage: function () {
            return timer.remainingTime / timer.gameDuration;
        },
        changeRemaninigTimeBy: function (seconds) {
            timer.remainingTime += seconds; 
            if (timer.remainingTime > timer.gameDuration) {
                timer.remainingTime = timer.gameDuration;
            } 
            if (timer.remainingTime < 0) {
                timer.remainingTime = 0;
            }
        }
    };

    timer.startTimer();

    function init() {
        // Reset game button!
        document.getElementById('play-again').addEventListener('click', function () {
            window.location.reload(true);
        });

        // Add functionality to pause button
        document.getElementById("pause-button").addEventListener("click", pauseGame);

		document.getElementById("mute-button").addEventListener("click", pauseSound);
		
        // Variables for background image

        var velocity = 100; // pixels/second ( !)
        var distance = 0;
        var lastFrameRepaintTime = 0;

        // Time between each frame calculated here
        function calculateOffset(time) {
            var frameGapTime = time - lastFrameRepaintTime;
            lastFrameRepaintTime = time;
            var translateX = velocity * (frameGapTime / 1000);
            return translateX;
        }

        // Background drawn & scrolled here
        function draw(time) {
            if (isGameOver || isGameWin) {
                return;
            } else if (!timer.isTimeUp() && !isPaused) {
                // Request this method to be invoked when interface is to be refreshed again
                requestAnimationFrame(draw);
            }

            distance -= calculateOffset(time);
            if (Math.abs(distance) > testImage.width) {
                distance = 0;
            }
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.save();
            c.translate(distance, 0);
            c.drawImage(testImage, 0, 0);
            c.drawImage(testImage, testImage.width + 0, 0);

            c.restore(); // If canvas restored here, everything scrolls!!

            // Fish drawn here
            if (fishReady) {
		        fish.x -= fish.speed;
                c.drawImage(fishImage, fish.x, fish.y);
                c.fillStyle = "rgb(0, 0, 250)";
                c.font = "22px Arial";
                answer = Math.round(answer * 100) / 100;
                c.fillText(answer, fish.x+70, fish.y+70);
				}
            

            // Fish 2 drawn here
            if (fish2Ready) {
                fish2.x -= fish2.speed;
                c.drawImage(fish2Image, fish2.x, fish2.y);
                c.fillStyle = "rgb(0, 0, 250)";
                c.font = "22px Arial";
                c.fillText(wronganswer, fish2.x+70, fish2.y+70);
            }

            // Shark drawn here
            if (sharkReady && sharkReady2 && sharkReady3) {
                if (37 in keysPressed) {
                    sharkImage = sharkImage2;

                }
                if (39 in keysPressed) {
                    sharkImage = sharkImage3;
                }

                c.drawImage(sharkImage, shark.x, shark.y);
            }

            // Bonus fish drawn here
            if(bonusFishReady && level.current ==2) {
                bonusFish.x -= bonusFish.speed;
                c.drawImage(bonusFishImage, bonusFish.x, bonusFish.y);
            }

            // Penalty fish drawn here
            if(penaltyFishReady && level.current == 2) {
                penaltyFish.x -= penaltyFish.speed;
                c.drawImage(penaltyFishImage, penaltyFish.x, penaltyFish.y);
            }

            // Bomb drawn here
            if(bombReady && level.current == 3) {
                bomb.x -= bomb.speed;
                c.drawImage(bombImage, bomb.x, bomb.y);
            }

            // Score printed here
            c.fillStyle = "rgb(250, 250, 250)";
            c.font = "32px Arial";
            c.textAlign = "left";
            c.textBaseline = "top";
            c.fillText("Fishes caught: " + fishesCaught, 32, 75);
			
			//instuction printed here
			c.fillStyle = "rgb(0, 0, 0)";
            c.font = "22px Arial";
            c.textAlign = "center";
            c.textBaseline = "top";
            c.fillText("Use arrow-keys to control the shark and catch the fishes!", canvas.width/2, 50);

            // Questions printed here
			c.fillStyle = "rgb(250, 250, 250)";
            c.font = "32px Arial";
            c.textAlign = "center";
            c.textBaseline = "bottom";
            c.fillText(questions, canvas.width/2, 580);

            // Current level printed here
            c.fillStyle = "rgb(250, 250, 250)";
            c.font = "32px Arial";
            c.textAlign = "center";
            c.textBaseline = "bottom";
            c.fillText("Level " + level.current, canvas.width-100, 86);

            // Timer printed here
            c.fillStyle = timer.getFillColor();
            c.font = "32px Arial";
            c.fillText(timer.convertTime(), pt1.x+120, 545);

            // Timer bar drawn here
            var barLength = pt2.x - pt1.x;
            barLength *= timer.getRemainingPercentage();

            c.fillStyle = gradient;
            c.fillRect(pt1.x, pt1.y, barLength, 25);

            c.fillStyle = "rgb(0, 0, 0)";
            c.rect(pt1.x, pt1.y, pt2.x - pt1.x, 25);
            c.stroke();
        }

        var isPaused = false;
        // Pause button function
        function pauseGame() {
            var btn = document.getElementById("pause-button");
            if (!isPaused) {
                isPaused = true;
                timer.stopTimer();
                btn.innerHTML = "Resume";
                bgmusic.pause();
            } else {
                isPaused = false;
                timer.startTimer();
                requestAnimationFrame(draw);
				
                btn.innerHTML = "Pause";
                bgmusic.play();
            }
        }
		
		var sound= false;

		function pauseSound() {
			var mte = document.getElementById("mute-button");
			if(!sound) {
				sound= true;
				bgmusic.pause();
                document.getElementById("soundFX").src='none';
                mte.innerHTML = "Unmute";
				}
			else{
				sound = false;
				mte.innerHTML = "Mute";
				bgmusic.play();
                document.getElementById("soundFX").src='soundFX.wav';

				}
		}
		
        function start() {
            isGameOver = false;
			isGameWin = false;
            shark.x = 5;
            shark.y = canvas.height / 2;
            lastFrameRepaintTime = window.performance.now();
            requestAnimationFrame(draw);
        }

        start();

    }

// The main game loop
    var main = function () {
        if (isGameOver || isGameWin) {
            clearInterval(main);
            return;
        }
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000); // Pushes this value to update-function

        then = now;
    };


    var then = Date.now();
    setInterval(main, 1); // Execute as fast as possible

    function gameOver() {
        isGameOver = true;
        clearInterval(main);
        timer.stopTimer();

        c.fillRect(0, 0, c.width, c.height);
        c.drawImage(background2, 0, 0);
        c.fillStyle = "rgb(250, 250, 250)";
        c.font = "48px Arial";
        c.textAlign = "left";
        c.textBaseline = "top";

        // Stops background music once timer has run out
        var bgmusic = document.getElementById("bgmusic");
        bgmusic.pause();
    }
	
	function gameWin() {
        isGameWin = true;
        clearInterval(main);
        timer.stopTimer();

        c.fillRect(0, 0, c.width, c.height);
        c.drawImage(backgroundWin, 0, 0);
        c.fillStyle = "rgb(250, 250, 250)";
        c.font = "48px Arial";
        c.textAlign = "left";
        c.textBaseline = "top";

        // Stops background music once timer has run out
        var bgmusic = document.getElementById("bgmusic");
        bgmusic.pause();
    }

//Run init-function once document is fully loaded
    window.addEventListener('load', init, false);
}()); //self invoking function

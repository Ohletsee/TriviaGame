$(document).ready(function() {
	var answeredRight = 0;
	var answeredWrong = 0;
	var answered = 0;
	var countDownTimer = 180;
	var convertedTime = 0;
	var intervalId;
	var correctAnswers = ["true", "true", "false", "true", "false", "true", "true", "true", "true", "true"];	
	var userAnswers = [];

	// Start the game when the user clicks the start button
	function newGame() {

		answeredRight = 0;
		answeredWrong = 0;
		answerd = 0;

		// Hide the start button
		$("#startButton").css("display", "none");

		// Show the time remaining, questions and done button on the webpage
		$("#displayCountDown").css("display", "visible");
		$("#questions").css("display", "block");
		$("#doneButton").css("display", "block");

		// start the time remaining counter
		setOneSecondTimer();
	}

	// Runs when the user clicks the done button or the time remaining = 0
	function showGameResults() {

		clearInterval(intervalId);

		var checkedButton = document.forms[0];

		// Determine the radio buttons that were selected and store their values in an array
		var i;
		for (i = 0; i < checkedButton.length; i++) {

			if (checkedButton[i].checked) {
				userAnswers[answered] = checkedButton[i].value;
				answered++;
			}
		}

		// Determine whether the questions were answered correctly or incorrectly
		for (i = 0; i < userAnswers.length; i++) {

			if (correctAnswers[i] === userAnswers[i]) {
				answeredRight++;
			}
			else {
				answeredWrong++;
			}
		}

		unanswered = correctAnswers.length - answered;

		// Hide the time remaining, start button, questions and done button
		$("#displayCountDown").css("display", "none");
		$("#startButton").css("display", "none");
		$("#questions").css("display", "none");
		$("#doneButton").css("display", "none");

		// Show the game results area
		$("#showUserResults").css("display", "block");

		// Populate the game results area
		$("#displayRightAnswers").html("Correct Answers: " + answeredRight);
		$("#displayWrongAnswers").html("Incorrect Answers: " + answeredWrong);
		$("#displayUnanswered").html("Unanswered: " + unanswered);
	}

	// Start the time remaining when the game is started
	function setOneSecondTimer() {

		intervalId = setInterval(decrement, 1000);
	}

	// Display and decrement the time remaining every second
	function decrement() {

		convertedTime = convertTime(countDownTimer);

		$("#displayCountDown").html("Time Remaining: " + convertedTime);

		countDownTimer--;

		if (countDownTimer === 0) {
			showGameResults();
		}
	}

	// Convert the time remaining from seconds into minutes and seconds
	function convertTime(theTime) {

    var minutes = Math.floor(theTime / 60);
    var seconds = theTime - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }

  // Start a new game when the start button is clicked
	$("#startButton").on("click", function() {

		newGame();
	})

	// Show the game results when the done button is clicked
	$("#doneButton").on("click", function() {
		
		showGameResults();
	})

})

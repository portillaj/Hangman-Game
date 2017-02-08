//Words to guess
var wordsToGuess = ["inception", "interstellar", "gladiator", 
"transformers", "avatar", "jumanji", "juno", "braveheart", "jaws", 
"scarface", "goodfellas", "hannibal", "zombieland", "superbad", 
"twister", "gravity", "valkyrie", "ghostbusters"];

var winCounter = document.getElementById('wins');
var lossCounter = document.getElementById('losses');
var decreaseGuess = document.getElementById('guessesRemaining');
var myGuessedLetters = document.getElementById('guessedLetters');
var guessesLeft = 9;
var wins = 0;
var losses = 0;
var answerArray = [];
var word = "";
var guessedLetters = [];
var goodGuess = false;

//start of game letters
resetGame();


//***********FUNCTIONS BELOW*************

//Function that sets the game up with a random word and displays _ to match the word
function initialGameSetup(){
	winCounter.innerHTML = "Wins: " + wins;
	lossCounter.innerHTML = "Losses: " + losses;
	//word gets random word from array
	var getWord = Math.floor(Math.random() * wordsToGuess.length);
	word = wordsToGuess[getWord];

	//loop through word to display hidden word
	for(var i = 0; i < word.length; i++) {
		answerArray[i] = "_";
	}
	console.log(word);

	//combines the answerArray as a single string
	document.getElementById('mystery-word').innerHTML = answerArray.join(" ");
}//end function

//Function that starts the game and you guess the word
function game() {
	document.onkeyup = function(event){
		//variable that stores message when user guesses the word
		var winMessage = "";
		var loseMessage = "";
		//keyPressed is what the player types
		var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
		
		//loop through word and if key pressed matches any letter in the word, 
		//it replaces the _ with the letter and it is stored in the answerArray[]
		for(var i = 0; i < word.length; i++) {

				if(word[i] === keyPressed) {
					answerArray[i] = keyPressed;
					goodGuess = true;
				}
		}//end for loop

		if(!goodGuess) {
			console.log(goodGuess);
			decreaseGuess.innerHTML = "Number of Guesses Remaining: " + --guessesLeft;

			//when user guesses wrong, display each part of the hangman
			if(guessesLeft == 8){
				document.getElementById('head').style.display ='block';
			}else if(guessesLeft == 7){
				document.getElementById('body').style.display ='block';
			}else if(guessesLeft == 6){
				document.getElementById('left-leg').style.display ='block';
			}else if(guessesLeft == 5){
				document.getElementById('right-leg').style.display ='block';
			}else if(guessesLeft == 4){
				document.getElementById('right-arm').style.display ='block';
			}else if(guessesLeft == 3){
				document.getElementById('left-arm').style.display ='block';
			}else if(guessesLeft == 2){
				document.getElementById('eye1').style.display ='block';
			}else if(guessesLeft == 1){
				document.getElementById('eye2').style.display ='block';
			}else if(guessesLeft == 0){
				document.getElementById('mouth').style.display ='block';
			}
			if(!goodGuess && guessesLeft == 0){
				loseMessage = "SORRY!, You did not guess the word!";
				lossCounter.innerHTML = "Losses: " + ++losses;
				document.getElementById('theWord').innerHTML = "The Word was: " + word;
				showButtonElement();
			}//end if
		}//end outer if

		goodGuess = false;

		//keep track of letters remaining to be guess 
		var lettersRemaining = answerArray.length;
		//go through loop to count the remaining letters not guessed
		for(var i = 0; i < answerArray.length; i++) {
			if(answerArray[i] !== '_'){
				lettersRemaining -= 1;
			}
		}//end for loop
		console.log(lettersRemaining);

		//if statement that shows a winning message when the user guesses the correct word
		//showsElement() is also activated
		if(lettersRemaining == 0){
			winMessage = "NICE!, You guessed the word!";
			winCounter.innerHTML = "Wins: " + ++wins;
			showButtonElement();
		}//end if statement


		//will display letter to guessed letter list when user presses a letter
		myGuessedLetters.innerHTML += keyPressed + ", ";

		//this will write to the screen the upated array with guessed letters
		document.getElementById("mystery-word").innerHTML = answerArray.join(" ");

		//display winning message to document when user guesses the correct word
		document.getElementById('you-win').innerHTML = winMessage;
		document.getElementById('you-lose').innerHTML = loseMessage;
	}//end keyup function
	
}//end game() function

//Function that resets the game 
function resetGame(){
	guessesLeft = 9;
	decreaseGuess.innerHTML = "Number of Guesses Remaining: " + guessesLeft;
	myGuessedLetters.innerHTML = " ";
	answerArray = [];
	document.getElementById('theWord').innerHTML = "";
	hideButtonElement();
	initialGameSetup();
	hideHangman();
	game();
}//end function

//function that shows the play again button when user guesses the word
function showButtonElement(){
	document.getElementById('resetButton').style.display ='inline';
}//end function

//function that hides the play again button
function hideButtonElement() {
	document.getElementById('resetButton').style.display ='none';
}//end function

//function that hides each part of the hangman
function hideHangman() {
		document.getElementById('head').style.display ='none';
		document.getElementById('mouth').style.display ='none';
		document.getElementById('body').style.display ='none';
		document.getElementById('right-arm').style.display ='none';
		document.getElementById('left-arm').style.display ='none';
		document.getElementById('left-leg').style.display ='none';
		document.getElementById('right-leg').style.display ='none';
		document.getElementById('eye1').style.display ='none';
		document.getElementById('eye2').style.display ='none';
}//end function

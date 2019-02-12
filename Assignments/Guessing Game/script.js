var randomNumber = Math.floor(Math.random()*51);
var userGuess = "";
var numOfTry = 3;
function myFunction(){
	num = document.getElementById("guessNum").value;
	txt = document.getElementById("guessNum");
	userGuess += num + " ";
	if(num==randomNumber){	
		alert("Congratulation, you win the game! The random number was: " + randomNumber + ". You guesses were: " + userGuess);
		txt.value ="";
		txt.focus();
		numOfTry = 3;
		randomNumber = Math.floor(Math.random()*51);
		userGuess = "";
	} else {
		if(num>randomNumber && numOfTry != 1){
			numOfTry--;
			alert("Wrong guess!! The correct number is lower then " + num + ". You have " + numOfTry + " try left.");
			txt.value ="";
			txt.focus();
		} else if(num<randomNumber && numOfTry != 1){
			numOfTry--;
			alert("Wrong guess!! The correct number is higher then " + num + ". You have " + numOfTry + " try left.");
			txt.value ="";
			txt.focus();	
		} else {
			alert("Sorry you are out of try! The correct number was: " + randomNumber + ". Your guesses were: " + userGuess + ". Please try again.");
			txt.value ="";
			txt.focus();
			numOfTry = 3;
			randomNumber = Math.floor(Math.random()*51);	
			userGuess = "";
		}
	}
}
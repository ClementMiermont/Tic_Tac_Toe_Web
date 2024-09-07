document.addEventListener("DOMContentLoaded", () => {

let isXTurn = true;
let gameOver = false;
const squares = document.querySelectorAll(".square");
const currentPlayerDisply = document.querySelector(".current_player");
const playerXScoreDisplay = document.querySelector(".PlayerOneScore");
const playerYScoreDisplay = document.querySelector(".PlayerTwoScore");
const restartButton = document.getElementById("restart");

let playerXScore = 0;
let playerYScore = 0;

// first you need to declare an array of winning patterns

let winPatterns = [
	[0,1,2], // line 1
	[3,4,5], // line 2
	[6,7,8], // line 3
	[0,3,6], // column 1
	[1,4,7], // column 2
	[2,5,8], // column 3
	[0,4,8], // diagonal 1
	[2,4,6] // diagonal 2

];

// this function is the main game loop
mainGameLoop();

function mainGameLoop(){
	squares.forEach(square => {
		square.addEventListener("click", function() {

		const span = this.querySelector(".value");

		// the advantage of using the * is that we already know if the square has been clicked or not
		if(span.textContent ==="*")				
			{
				if(isXTurn)
				{
					span.textContent = "X";
					currentPlayerDisply.textContent = "O";
				}
				else
				{
					span.textContent = "O";
					currentPlayerDisply.textContent = "X";
				}
				// ----- we check if we have a winner and increment the score
				if (checkForWin())
				{
					if(isXTurn)
					{
						playerXScore++;
						playerXScoreDisplay.textContent = playerXScore;

					}
					else
					{
						playerYScore++;
						playerYScoreDisplay.textContent = playerYScore;
					}
				}
				isXTurn = !isXTurn;

			}
		});
	});

}

function resetBoard(){
	squares.forEach(square => {
		square.querySelector(".value").textContent = "*";
	});
	isXTurn = true;
	currentPlayerDisply.textContent = "X";

	// we reset the winning patterns

	winPatterns = [
		[0,1,2], // horizontal line 1
		[3,4,5], // horizontal line 2
		[6,7,8], // horizontal line 3
		[0,3,6], // column 1
		[1,4,7], // column 2
		[2,5,8], // column 3
		[0,4,8], // diagonal 1
		[2,4,6] // diagonal 2

	];

}
	
// as javascript is dynamic type language, we can assign a return to a func without the need to specify
// the returned type
// so we dynamically turn our funct into a func that returns a boolean

function checkForWin(){

	// we loop through the winning patterns and check if the current player has won
	// regarding if squareA and squareB and squareC are equal and not empty
	const  winningPatternIndex = winPatterns.findIndex(pattern => {
		const [a, b, c] = pattern;
		const squareA = squares[a].querySelector(".value").textContent;
		const squareB = squares[b].querySelector(".value").textContent;
		const squareC = squares[c].querySelector(".value").textContent;
		return squareA !== "*" && squareA === squareB && squareB === squareC;

	
	})

	if (winningPatternIndex !== -1){
		winPatterns.splice(winningPatternIndex, 1);
		return true;
	}

	return false;
}


restartButton.addEventListener("click", resetBoard);


});
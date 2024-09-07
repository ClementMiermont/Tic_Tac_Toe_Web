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

let winPatterns = [
	[0,1,2], // ligne horizontale 1
	[3,4,5], // ligne horizontale 2
	[6,7,8], // ligne horizontale 3
	[0,3,6], // colonne 1
	[1,4,7], // colonne 2
	[2,5,8], // colonne 3
	[0,4,8], // diagonale 1
	[2,4,6] // diagonale 2

];
// on nomme mainGameLoop la boucle principale du jeu
mainGameLoop();

function mainGameLoop(){
	squares.forEach(square => {
		square.addEventListener("click", function() {

		const span = this.querySelector(".value");

		// l'avantage de cette méthode c'est qu'on sait déjà si la case est vide ou pas	
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
				// ----- ici on va check si on a un gagnant
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

				// ---- ici on va check si on a un match nul
				else if (checkForDraw())
				{
						alert("It's a draw");
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

	// réinitialisation des patterns de victoire

	winPatterns = [
		[0,1,2], // ligne horizontale 1
		[3,4,5], // ligne horizontale 2
		[6,7,8], // ligne horizontale 3
		[0,3,6], // colonne 1
		[1,4,7], // colonne 2
		[2,5,8], // colonne 3
		[0,4,8], // diagonale 1
		[2,4,6] // diagonale 2

	];

}
	
// rappel que le javascript est à typage dynamique dont on peut changer le type de ce que retourne une fonction à tout moment
function checkForWin(){
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

function checkForDraw() {
	return Array.from(squares).every(square => { square.querySelector(".value").textContent !== "*"; });
}

restartButton.addEventListener("click", resetBoard);


});
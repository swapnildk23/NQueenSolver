// JavaScript program to solve N Queen Problem using Branch and Bound
document.querySelector('#button').addEventListener('click', function () {
	m = document.getElementById("iNNput").value;
	m = Number(document.querySelector('#iNNput').value);

	let N = m;
	// A utility function to print solution
	function printSolution(board) {
		let N = board.length;
		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++)
				document.write(board[i][j] + " ");
			document.write("<br>");
		}
	}

	// A Optimized function to check if a queen can be placed on board[row][col]
	function isSafe(row, col, slashCode, backslashCode, rowLookup, slashCodeLookup, backslashCodeLookup) {
		if (slashCodeLookup[slashCode[row][col]] ||
			backslashCodeLookup[backslashCode[row][col]] ||
			rowLookup[row])
			return false;

		return true;
	}

	// A recursive utility function to solve N Queen problem
	function solveNQueensUtil(board, col, slashCode,
		backslashCode, rowLookup, slashCodeLookup, backslashCodeLookup) {
		// Base case: If all queens are placed then return true
		if (col >= N)
			return true;

		// Consider this column and try placing
		// this queen in all rows one by one
		for (let i = 0; i < N; i++) {
			// Check if queen can be placed on board[i][col]
			if (isSafe(i, col, slashCode, backslashCode,
				rowLookup, slashCodeLookup,
				backslashCodeLookup)) {

				// Place this queen in board[i][col]
				board[i][col] = 1;
				rowLookup[i] = true;
				slashCodeLookup[slashCode[i][col]] = true;
				backslashCodeLookup[backslashCode[i][col]] = true;

				// recur to place rest of the queens
				if (solveNQueensUtil(
					board, col + 1, slashCode,
					backslashCode, rowLookup,
					slashCodeLookup,
					backslashCodeLookup))
					return true;

				// If placing queen in board[i][col] doesn't
				// lead to a solution, then backtrack

				// Remove queen from board[i][col]
				board[i][col] = 0;
				rowLookup[i] = false;
				slashCodeLookup[slashCode[i][col]] = false;
				backslashCodeLookup[backslashCode[i][col]] = false;
			}
		}

		// If queen can not be place in any row
		// in this column col then return false
		return false;
	}

	/*
	* This function solves the N Queen problem using Branch
	* and Bound. It mainly uses solveNQueensUtil() to solve
	* the problem. It returns false if queens cannot be
	* placed, otherwise return true and prints placement of
	* queens in the form of 1s. Please note that there may
	* be more than one solutions, this function prints one of the feasible solutions.*/
	function solveNQueens() {
		let board = new Array(N);
		// Helper matrices
		let slashCode = new Array(N);
		let backslashCode = new Array(N);
		for (let i = 0; i < N; i++) {
			board[i] = new Array(N);
			slashCode[i] = new Array(N);
			backslashCode[i] = new Array(N);
			for (let j = 0; j < N; j++) {
				board[i][j] = 0;
				slashCode[i][j] = 0;
				backslashCode[i][j] = 0;
			}
		}
		// Arrays to tell us which rows are occupied
		let rowLookup = new Array(N);
		for (let i = 0; i < N; i++)
			rowLookup[i] = false;

		// Keep two arrays to tell us
		// which diagonals are occupied
		let slashCodeLookup = new Array(2 * N - 1);
		let backslashCodeLookup = new Array(2 * N - 1);
		for (let i = 0; i < 2 * N - 1; i++) {
			slashCodeLookup[i] = false;
			backslashCodeLookup[i] = false;
		}
		for (let r = 0; r < N; r++)
			for (let c = 0; c < N; c++) {
				slashCode[r][c] = r + c;
				backslashCode[r][c] = r - c + (N - 1);
			}
		if (solveNQueensUtil(board, 0, slashCode,
			backslashCode, rowLookup,
			slashCodeLookup,
			backslashCodeLookup) == false) {

			//document.write("Solution does not exist");
			document.querySelector('#Result').textContent = "Solution does not exist";
			return false;
		}
		// Solution found
		let Div = document.getElementById("Result");
		var html = `<div><br><br></div>`;
		for (i = 0; i < m; i++) {
			let s = "";
			var tmp = '';
			for (j = 0; j < m; j++) {
				if (board[i][j] == 1) {
					tmp = "Q     ";
				}
				else {
					tmp = "0     ";
				}
				s += tmp;
			}
			html += `<div>${s}</div>`;
		}
		Div.innerHTML = html;
		return true;
	}
	// Driver code
	let proj = document.getElementById("proje");
	proj.innerHTML = "A project by:"
	let team = document.getElementById("teammem");
	team.innerHTML = "Muhammed Musaddique k --- USN:1MV20CS068";
	let teamm = document.getElementById("teammemm");
	teamm.innerHTML = "Swapnil Deepak Kore --- USN:1MV20CS118";
	let team3 = document.getElementById("teammem3");
	team3.innerHTML = "Ravi Ranjan Maurya --- USN:1MV20CS086";

	let q = solveNQueens();
}
)
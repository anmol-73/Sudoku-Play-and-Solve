function isSafe(grid, row, col, num) {
	const N = grid.length;

	// Check if the same number exists in the row
	for (let i = 0; i < N; i++) {
		if (grid[row][i] === num && i !== col) {
			return false;
		}
	}

	// Check if the same number exists in the column
	for (let i = 0; i < N; i++) {
		if (grid[i][col] === num && i !== row) {
			return false;
		}
	}

	// Check if the same number exists in the 3x3 subgrid
	const subgridSize = Math.sqrt(N);
	const startRow = Math.floor(row / subgridSize) * subgridSize;
	const startCol = Math.floor(col / subgridSize) * subgridSize;
	for (let i = 0; i < subgridSize; i++) {
		for (let j = 0; j < subgridSize; j++) {
			if (
				grid[startRow + i][startCol + j] === num &&
				(startRow + i !== row || startCol + j !== col)
			) {
				return false;
			}
		}
	}
	return true;
}

function findEmptyCell(grid) {
	const N = grid.length;

	for (let row = 0; row < N; row++) {
		for (let col = 0; col < N; col++) {
			if (grid[row][col] === 0) {
				return [row, col];
			}
		}
	}

	return null;
}

function validate(grid) 
{
    for(let row = 0; row < grid.length; row++)
    {
        for(let col = 0; col < grid.length; col++)
        {
            if(grid[row][col] === 0)
                continue;
            if(!isSafe(grid, row, col, grid[row][col]))
                return false;
        }
    }
    return true;
}

function solveSudoku(grid) {

    if(!validate(grid))
        return null;

	function solve() {
		const emptyCell = findEmptyCell(grid);

		// Base case: All cells are filled, puzzle solved
		if (emptyCell === null) {
			return true;
		}

		const [row, col] = emptyCell;
		const N = grid.length;
	
		for (let num = 1; num <= N; num++) {
			if (isSafe(grid, row, col, num)) {
				grid[row][col] = num;

				// Recursively solve the puzzle with the updated cell
				if (solve()) {
					return true;
				}

				// Backtrack if the current configuration is not valid
				grid[row][col] = 0;
			}
		}

		// No valid number can be placed in the current cell, backtrack
		return false;
	}
	let b = solve();

    if(b === false)
        return null;
    else
        return grid;
}

function hasUniqueSolution(grid) {

	const N = grid.length;
	let solutionCount = 0;

	// Helper function to solve Sudoku using backtracking
	function solveSudoku(row, col) 
    {
		if (row === N) {
			// All cells filled, puzzle solved
			solutionCount++;
			return;
		}

		// Calculate the next row and column indices
		let nextRow = row;
		let nextCol = col + 1;
		if (nextCol === N) {
			nextRow += 1;
			nextCol = 0;
		}

		// Skip the filled cells
		if (grid[row][col] !== 0) 
        {
			solveSudoku(nextRow, nextCol);
			return;
		}

		for (let num = 1; num <= N; num++) 
        {
			if (isSafe(grid, row, col, num)) 
            {
				grid[row][col] = num;
				solveSudoku(nextRow, nextCol);
				grid[row][col] = 0; // Backtrack

				// Terminate early if more than one solution found
				if (solutionCount > 1) {
					return;
				}
			}
		}
	}

	// Clone the puzzle to avoid modifying the original grid
	const clonedGrid = grid.map((row) => [...row]);

	// Start solving the puzzle from the first cell
	solveSudoku(0, 0);

	// Return true if only one solution found, otherwise false
	return solutionCount === 1;
}

function getRandomSolution(grid) {
	const stack = [];

	const solve = () => {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (grid[row][col] === 0) {
					const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
					shuffle(numbers); // Randomize the order of numbers

					for (const num of numbers) {
						if (isSafe(grid, row, col, num)) {
							grid[row][col] = num;
							stack.push({ row, col });

							if (solve()) {
								return true; // Found a solution
							}

							// Backtrack if the solution is not valid
							grid[row][col] = 0;
							stack.pop();
						}
					}

					return false; // No valid numbers can be placed, backtrack
				}
			}
		}

		return true; // All cells are filled, puzzle solved
	};

	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	solve();
	return grid;
}

module.exports = { solveSudoku, hasUniqueSolution, getRandomSolution };

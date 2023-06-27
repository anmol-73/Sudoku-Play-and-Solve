const {solveSudoku, hasUniqueSolution, getRandomSolution} = require("./sudokuSolver");

function getRandomInteger(x, y) 
{
	const range = y - x + 1;
	const randomNumber = Math.floor(Math.random() * range) + x;

	return randomNumber;
}

function generateSudoku(difficulty) {
	
	// Initialize an empty Sudoku grid
	const grid = Array.from({ length: 9 }, () =>
		Array.from({ length: 9 }, () => 0)
	);

	// Generate a solved Sudoku grid
	getRandomSolution(grid);

	// Remove some numbers to create the puzzle

	if (difficulty === null || difficulty === undefined) 
        difficulty = "easy";

	let filledCellsCount = 0;
	if (difficulty === "easy") 
        filledCellsCount = getRandomInteger(41, 45);
	else if (difficulty === "medium") 
        filledCellsCount = getRandomInteger(36, 40);
	else if (difficulty === "hard") 
        filledCellsCount = getRandomInteger(31, 35);
	else if (difficulty === "expert") 
        filledCellsCount = getRandomInteger(26, 30);

	let count = 81;

	while (count > filledCellsCount) 
    {
		const row = Math.floor(Math.random() * 9);
		const col = Math.floor(Math.random() * 9);

		if (grid[row][col] !== 0) 
        {
			const temp = grid[row][col];
			grid[row][col] = 0;

			// Check if the puzzle still has a unique solution
			const tempGrid = cloneGrid(grid);
			const solutions = hasUniqueSolution(tempGrid);
			if (solutions === 0) 
            {
				grid[row][col] = temp; // Revert the change if puzzle is not unique
			} 
            else 
            {
				count--;
			}
		}
	}
	return grid;
}

function cloneGrid(grid) {

	const clonedGrid = [];

	for (let row = 0; row < grid.length; row++) 
    {
		const newRow = [];

		for (let col = 0; col < grid[row].length; col++) 
        {
			newRow.push(grid[row][col]);
		}

		clonedGrid.push(newRow);
	}

	return clonedGrid;
}

module.exports = { generateSudoku };

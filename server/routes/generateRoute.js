const express = require("express");
const router = express.Router();

const { generateSudoku } = require("../controllers/sudokuGenerator");


router.get("/generate", (req, res) => {
	// console.log("Generate Sudoku was called with difficulty: " + req.query.difficulty);

	try 
    {
		const { difficulty } = req.query;
		const grid = generateSudoku(difficulty);
		const fixedCells = [];
        
		for (let i = 0; i < grid.length; i++) {
			fixedCells[i] = [];
			for (let j = 0; j < grid.length; j++) {
				fixedCells[i][j] = grid[i][j] !== 0 ? 1 : 0;
			}
		}

		res.json({ grid: grid, fixedCells: fixedCells });
	} 
    catch (err) 
    {
		console.log(err.message);
		res
			.status(500)
			.json({ error: "An error occurred while generating the puzzle" });
	}
});

module.exports = router;

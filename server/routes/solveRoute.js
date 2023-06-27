const express = require("express");
const router = express.Router();

const { solveSudoku } = require("../controllers/sudokuSolver");


router.post("/solve", (req, res) => {
	try 
    {
		
		const puzzle = req.body.puzzle;
		const solution = solveSudoku(puzzle);

		res.json({ solution });
	} 
    catch (error) 
    {
		console.error("Error solving Sudoku:", error.message);
		res.status(500).send({ error: "Could not solve sudoku" });
	}
});

module.exports = router;

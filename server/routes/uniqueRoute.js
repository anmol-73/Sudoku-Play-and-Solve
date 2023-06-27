const express = require("express");
const router = express.Router();

const { hasUniqueSolution } = require("../controllers/sudokuSolver");

router.post("/unique", (req, res) => {
	try 
    {
		const puzzle = req.body.puzzle;
		const unique = hasUniqueSolution(puzzle);

		res.json({ unique });
	} 
    catch (err) 
    {
		console.log(err.message);
		res.status(500).send({ error: "Could not solve sudoku" });
	}
});

module.exports = router;

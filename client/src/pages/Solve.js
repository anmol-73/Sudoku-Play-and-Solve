import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, Container } from "@mui/material";
import SudokuGrid from "../components/SudokuGrid";
import GridColorButtons from "../components/GridColorButtons";
import ResetButton from "../components/ResetButton";
import SolveButton from "../components/SolveButton";
import RevealButton from "../components/RevealButton";
import ValidateButton from "../components/ValidateButton";
import axios from "axios";
import "../style/solve.css";

const Solve = () => {
    
	// const defaultGrid = [
	// 	[0, 0, 0, 8, 0, 1, 0, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 0, 4, 3],
	// 	[5, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 7, 0, 8, 0, 0],
	// 	[0, 0, 0, 0, 0, 0, 1, 0, 0],
	// 	[0, 2, 0, 0, 3, 0, 0, 0, 0],
	// 	[6, 0, 0, 0, 0, 0, 0, 7, 5],
	// 	[0, 0, 3, 4, 0, 0, 0, 0, 0],
	// 	[0, 0, 0, 2, 0, 0, 6, 0, 0],
	// ];

	const defaultGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

	const [grid, setGrid] = useState(defaultGrid);
	const [fixedCells, setFixedCells] = useState(defaultGrid);
	const [isRunning, setIsRunning] = useState(false);
	const [gridColor, setGridColor] = useState("black");
	const [feedback, setFeedback] = useState("This tool helps you to solve a sudoku");
	const [solvingState, setSolvingState] = useState(-1);

    const solvingStates = ["Solving", "Solving.", "Solving..", "Solving..."];
	useEffect(() => {
		let interval;

		if (isRunning) 
        {
			interval = setInterval(() => {
				setSolvingState((prevState) => (prevState + 1) % solvingStates.length);
			}, 700);
		} 
        else 
        {
			setSolvingState(0);
		}

		return () => {
			clearInterval(interval);
		};

	}, [isRunning]);

    useEffect(() => {
        if (isRunning) {
          setFeedback(solvingStates[solvingState]);
        }
    }, [solvingState, isRunning]);

	const handleColorSelect = (color) => {
		setGridColor(color);
	};

	const handleResetClick = () => {
		if (isRunning === false) {
			setGrid(defaultGrid);
			setFixedCells(defaultGrid);
			setFeedback("Sudoku was reset");
		}
	};

	const getFixedCells = () => {
		const newGrid = [...grid];
		for (let i = 0; i < newGrid.length; i++) {
			for (let j = 0; j < newGrid.length; j++) {
				if (grid[i][j] !== 0 && grid[i][j] !== 1) newGrid[i][j] = 1;
			}
		}
		return newGrid;
	};

	const fetchSolution = (newGrid) => {
		return new Promise((resolve, reject) => {
			setIsRunning(true);
			axios
				.post("/api/solve", { puzzle: newGrid })
				.then((response) => {
					setIsRunning(false);
					const solution = response.data.solution;
					resolve(solution);
				})
				.catch((error) => {
					console.error("Error fetching Sudoku solution:", error.message);
					reject(error);
				});
		});
	};

	const getGrid = () => {
		const newGrid = grid.map((row) => [...row]);
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid.length; j++) {
				if (newGrid[i][j] === "-") newGrid[i][j] = 0;
			}
		}
		return newGrid;
	};

	const handleSolveClick = () => {
		if (isRunning === true) return;

		let newGrid = getGrid();
		fetchSolution(newGrid)
			.then((solution) => {
				if (solution === null) {
					setFeedback("No solution exists");
				} else {
					setFixedCells(getFixedCells());
					setGrid(solution);
					setFeedback("Atleast one solution exists");
				}
			})
			.catch((err) => {
				console.error("Error fetching Sudoku solution: ", err.message);
			});
	};

	const handleRevealClick = () => {
		if (isRunning === true) return;

		let newGrid = grid.map((row) => [...row]);
		let currGrid = getGrid();
		fetchSolution(currGrid)
			.then((solution) => {
				if (solution === null) 
                {
					setFeedback("No solution exists");
				} 
                else 
                {
                    let flag = 0;
					for (let i = 0; i < grid.length; i++) 
                    {
						for (let j = 0; j < grid.length; j++) 
                        {
							if (newGrid[i][j] === "-") 
                            {
                                flag = 1;
								newGrid[i][j] = solution[i][j];
							}
						}
					}
                    if(flag === 1)
                        setFeedback('Cells marked with - have been replaced');
                    else
                        setFeedback("Mark cells with - to reveal them");

					setGrid(newGrid);
				}
			})
			.catch((err) => {
				console.error("Error fetching Sudoku solution: ", err.message);
			});
	};

	const handleValidateClick = () => {
		if (isRunning === true) return;

		let newGrid = getGrid();
		fetchSolution(newGrid)
			.then((solution) => {
				if (solution === null) {
					setFeedback("No solution exists");
				} else {
					setFeedback("Atleast one solution exists");
				}
			})
			.catch((err) => {
				console.error("Error fetching Sudoku solution: ", err.message);
			});
	};

	return (
		<Grid container direction="column" alignContent="center" spacing={2} padding="1rem">
			<Grid item className="solve-grid-item" sx={{ display: { xs: 'none', sm: 'block' } }}>
				<GridColorButtons onColorSelect={handleColorSelect} />
			</Grid>
            <Grid item justifyContent="center" sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Grid container item >
                    <GridColorButtons onColorSelect={handleColorSelect} availableColors={["black", "blue", "green"]}/>
                </Grid>
            </Grid>
			{feedback && (
				<Grid item className="solve-grid-item">
					<Typography
						align="center"
						sx={{
							fontFamily: "Roboto Slab, Serif",
							fontSize: "20px",
						}}
					>
						{feedback}
					</Typography>
				</Grid>
			)}
			<Grid item className="solve-grid-item">
				<SudokuGrid grid={grid} fixedCells={fixedCells} version={gridColor} />
			</Grid>
			<Grid item className="solve-grid-item">
				<Box>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<SolveButton onClick={handleSolveClick} />
						</Grid>
						<Grid item xs={3}>
							<RevealButton onClick={handleRevealClick} />
						</Grid>
						<Grid item xs={3}>
							<ValidateButton onClick={handleValidateClick} />
						</Grid>
						<Grid item xs={3}>
							<ResetButton onClick={handleResetClick} />
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Solve;

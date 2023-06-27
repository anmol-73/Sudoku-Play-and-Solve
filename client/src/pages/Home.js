import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import GridColorButtons from "../components/GridColorButtons";
import GridDifficultyButtons from "../components/GridDifficultyButtons";
import SGrid from "../components/SGrid";
import UtilityButtons from "../components/UtilityButtons";
import Numpad from "../components/Numpad";
import SolutionNewGameGrid from "../components/SolutionNewGameGrid";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import NewGrid from "../components/NewGrid";
import Timer from "../components/Timer";
import "../style/home.css";
import LoadingScreen from "../components/LoadingScreen";
import CongratulationMessage from "../components/CongratulationMessage";

const Home = () => {
    
	const [gridColor, setGridColor] = useState("black");
	const [difficulty, setDifficulty] = useState("easy");
    const [tempDifficulty, setTempDifficulty] = useState("easy");
	const [sudoku, setSudoku] = useState(null);
	const [fixedCells, setFixedCells] = useState(null);
	const [selectedCell, setSelectedCell] = useState(null);
	const [gridHistory, setGridHistory] = useState([]);
	const [sudokuSolution, setSudokuSolution] = useState(null);
	const [solutionAlert, setSolutionAlert] = useState(false);
	const [newGameAlert, setNewGameAlert] = useState(false);
    const [remainingHints, setRemainingHints] = useState(3);
    const [hintOn, setHintOn] = useState(false);
    const [hintCell, setHintCell] = useState(null);
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(0);
    const [checkOn, setCheckOn] = useState(false);
    const [checkedCells, setCheckedCells] = useState(null);
    const [clickedSolve, setClickedSolve] = useState(false);
    const [solved, setSolved] = useState(false);
    const [congratulations, setCongratulations] = useState(false);

    useEffect(() => {
		fetchGeneratedSudoku("easy");
	}, []);

    useEffect(() => {
        if(!isRunning)
        {
            setSelectedCell(null);
            setCheckOn(false);
        }
    }, [isRunning])

    useEffect(() => {

        if(sudoku && JSON.stringify(sudoku) === JSON.stringify(sudokuSolution) && !solved && !clickedSolve)
        {
            setTimeout(() => {
                setCongratulations(true);
                setSolved(true);
                setIsRunning(false);
            }, 500)
        }

    }, [sudoku]);

    useEffect(() => {

        if(sudoku === null || sudokuSolution === null || checkOn === false)
            return;

        let newCheckedCells = [];
        for(let row = 0; row<sudoku.length; row++)
        {
            for(let col = 0; col<sudoku.length; col++)
            {
                if(fixedCells[row][col] === 1)
                    continue;

                if(sudoku[row][col] === 0)
                    continue;

                if(sudoku[row][col] !== sudokuSolution[row][col])
                    newCheckedCells.push({row, col});
            }
        }
        setCheckedCells(newCheckedCells);

    }, [sudoku]);

	const handleColorSelect = (color) => {
		setGridColor(color);
	};

	const handleDifficultySelect = (difficulty) => {
		setTempDifficulty(difficulty);
		setNewGameAlert(true);
	};

	const fetchGeneratedSudoku = (difficulty) => {
		axios
			.get(`/api/generate?difficulty=${difficulty}`)
			.then((response) => {
				const generatedSudoku = response.data.grid;
				const newFixedCells = response.data.fixedCells;
				setSudoku(generatedSudoku);
				setFixedCells(newFixedCells);

				const newSudoku = JSON.parse(JSON.stringify(generatedSudoku));
				setGridHistory([newSudoku]);

				axios
					.post("/api/solve", { puzzle: generatedSudoku })
					.then((response) => {
						const solution = response.data.solution;
						setSudokuSolution(solution);
					})
					.catch((error) => {
						console.error(
							"Error fetching Sudoku solution:",
							error.message
						);
					});
			})
			.catch((error) => {
				console.error(
					"Error fetching generated Sudoku:",
					error.message
				);
			});
	};

	const handleCellClick = (row, col) => {
		setSelectedCell({ row, col });
	};

	const handleNumberInput = (number) => {
		if (selectedCell && isRunning) 
        {
			const { row, col } = selectedCell;
			if (fixedCells[row][col] === 0) 
            {
				const updatedGrid = [...sudoku];
                if(updatedGrid[row][col] === number)
                {
                    handleEraseClick();
                }
                else
                {
                    updatedGrid[row][col] = number;
                    setSudoku(updatedGrid);
                    const newGrid = JSON.parse(JSON.stringify(updatedGrid));
                    setGridHistory((prevHistory) => [...prevHistory, newGrid]);
                }
			}
		}
	};

	const handleEraseClick = () => {
		if (selectedCell && selectedCell.row != null && selectedCell.col != null && isRunning) {
			const updatedGrid = [...sudoku];
			if (!fixedCells[selectedCell.row][selectedCell.col]) 
            {
				updatedGrid[selectedCell.row][selectedCell.col] = 0;
				setSudoku(updatedGrid);
				const newGrid = JSON.parse(JSON.stringify(updatedGrid));
				setGridHistory((prevHistory) => [...prevHistory, newGrid]);
			}
		}
	};

	const handleUndoClick = () => {
		if (gridHistory.length > 1 && isRunning) {
			const newHistory = [...gridHistory];
			newHistory.pop();
			let previousGrid = [...newHistory[newHistory.length - 1]];
			previousGrid = JSON.parse(JSON.stringify(previousGrid));
			setSudoku(previousGrid);
			setGridHistory(newHistory);
		}
	};

	const handleSolutionClick = () => {
		setSolutionAlert(true);
	};

	const handleNewGameClick = () => {
		setNewGameAlert(true);
	};

	const handleSolutionAlertClose = () => {
		setSolutionAlert(false);
	};

	const handleSolutionAlertConfirm = () => {
		setSolutionAlert(false);
        setClickedSolve(true);
		setSudoku(sudokuSolution);
	};

	const handleNewGameAlertClose = () => {
		setNewGameAlert(false);
        setTempDifficulty(difficulty);
	};

	const handleNewGameAlertConfirm = () => {
		setNewGameAlert(false);
        setClickedSolve(false);
        setSolved(false);
        setRemainingHints(3);
        setTime(0);
        setIsRunning(true);
        setCheckOn(false);
        setDifficulty(tempDifficulty);
		fetchGeneratedSudoku(tempDifficulty);
	};

    const handleHintClick = () => {

        if(remainingHints !== 0 && isRunning && sudoku !== sudokuSolution)
        {
            while(true)
            {
                const row = Math.floor(Math.random() * (sudoku.length));
                const col = Math.floor(Math.random() * (sudoku.length));
                if(fixedCells[row][col] === 1)
                    continue;
                if(sudoku[row][col] === sudokuSolution[row][col])
                    continue;
                
                setHintOn(true);
                setHintCell({row,col});
                const updatedGrid = [...sudoku];
                updatedGrid[row][col] = sudokuSolution[row][col];
                setSudoku(updatedGrid);
                const newGrid = JSON.parse(JSON.stringify(updatedGrid));
                setGridHistory((prevHistory) => [...prevHistory, newGrid]);
                setRemainingHints(remainingHints - 1);
                setTimeout(() => {
                    setHintOn(false);
                }, 1000);

                break;
            }
        }
    }

    const handleCheckClick = () => {
        if(isRunning)
        {
            setCheckOn(!checkOn);
        }
    }

    const handleGridChange = (grid) => {
        setSudoku(grid);
    }

	return (
		<>
            {
                sudoku ? 
                (
                    <Grid container padding="1rem" direction="column" spacing={1.1} >

                        <Grid item justifyContent="center" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Grid container item >
                                <GridColorButtons onColorSelect={handleColorSelect}/>
                            </Grid>
                        </Grid>

                        <Grid item justifyContent="center" sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <Grid container item >
                                <GridColorButtons onColorSelect={handleColorSelect} availableColors={["black", "blue", "green"]}/>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Grid container item>
                                <GridDifficultyButtons onDifficultySelect={handleDifficultySelect} currentDifficulty={difficulty}/>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <Grid container item>
                                <GridDifficultyButtons onDifficultySelect={handleDifficultySelect} currentDifficulty={difficulty} availableDifficulties={["easy", "medium", "hard"]}/>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container spacing={3}  alignItems="center">
                                <Grid item xs={12} lg={4} sm={7} xl={3.5}>
                                    <SGrid
                                        // key={JSON.stringify(sudoku)}
                                        grid={sudoku}
                                        fixedCells={fixedCells}
                                        version={gridColor}
                                        onCellClick={handleCellClick}
                                        gridHistory={gridHistory}
                                        setGridHistory={setGridHistory}
                                        isHintOn={hintOn}
                                        hintCell={hintCell}
                                        isRunning={isRunning}
                                        checkOn={checkOn}
                                        checkedCells={checkedCells}
                                        onGridChange={handleGridChange}
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={5} lg={3.5} xl={3}>
                                    <Grid container direction="column" spacing={1.75}>
                                        <Grid item className="">
                                            <Box display="flex" justifyContent="flex-end" mb="16px">
                                                <Timer isRunning={isRunning} setIsRunning={setIsRunning} time={time} setTime={setTime}/>    
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <UtilityButtons
                                                color={gridColor}
                                                onEraseClick={handleEraseClick}
                                                onUndoClick={handleUndoClick}
                                                onHintClick={handleHintClick}
                                                onCheckClick={handleCheckClick}
                                                checkOn={checkOn}
                                                hints={remainingHints}
                                                className="home-utilitybuttons"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Numpad
                                                color={gridColor}
                                                onPress={handleNumberInput}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <SolutionNewGameGrid
                                                onSolveClick={handleSolutionClick}
                                                onNewGameClick={handleNewGameClick}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <CustomAlert
                            open={solutionAlert}
                            onClose={handleSolutionAlertClose}
                            onConfirm={handleSolutionAlertConfirm}
                            text="solve"
					    />
                        <CustomAlert
                            open={newGameAlert}
                            onClose={handleNewGameAlertClose}
                            onConfirm={handleNewGameAlertConfirm}
                            text="newGame"
                        />

                        <CongratulationMessage open={congratulations} setOpen={setCongratulations} time={time}/>
                    </Grid>

                ) : 
                (
                    <LoadingScreen/>
                )
            }
            
		</>
	);
};

export default Home;

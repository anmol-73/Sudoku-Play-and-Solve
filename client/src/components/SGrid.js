import React, { useEffect, useState } from "react";
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Typography} from "@mui/material";
import { validateGrid as validateGridUtil } from "../utils/Gridutils/validateGrid";
import { getCellBackgroundColor as getCellBackgroundColorUtil } from "../utils/Gridutils/getCellBackgroundColor";
import { getCellTextColor as getCellTextColorUtil } from "../utils/Gridutils/getCellTextColor";
import { getCellBorderColor } from "../utils/Gridutils/getCellBorderColor";

const SGrid = ({grid, fixedCells, version, onCellClick, gridHistory, setGridHistory, isHintOn, hintCell, isRunning, checkOn, checkedCells, onGridChange, selectedCell}) => {

	const [editableGrid, setEditableGrid] = useState(grid);
	const [clickedCell, setClickedCell] = useState(null);
	const [invalidCells, setInvalidCells] = useState([]);

	useEffect(() => {
		setEditableGrid(grid);
		validateGrid(grid);
	}, [grid]);

    useEffect(() => {
        if(!isRunning)
        {
            setClickedCell(null);
        }
    }, [isRunning]);

	if (version !== "black" && version !== "green" && version !== "red" && version !== "blue")
    {
		version = "black";
    }

	const handleCellClick = (rowIndex, colIndex) => {
        if(isRunning)
        {
            onCellClick(rowIndex, colIndex);
            setClickedCell({ row: rowIndex, col: colIndex });
        }
	};

	const validateGrid = (currGrid) => {
		const newInvalidCells = validateGridUtil(currGrid);
		setInvalidCells(newInvalidCells);
	};

	const handleCellChange = (event, rowIndex, colIndex) => {
		const value = event.target.value;
		if (/^[1-9]$/.test(value) || value === "" ) 
        {
            if(isRunning)
            {
                const updatedGrid = [...editableGrid];
                updatedGrid[rowIndex][colIndex] =
                    value === "" ? 0 : parseInt(value, 10);
                setEditableGrid(updatedGrid);
                setClickedCell({ row: rowIndex, col: colIndex });
                onGridChange(updatedGrid);
                validateGrid(updatedGrid);
    
                const newGrid = JSON.parse(JSON.stringify(updatedGrid));
                setGridHistory([...gridHistory, newGrid]);
            }
		}
	};

	const isCellFixed = (rowIndex, colIndex) => {
		return fixedCells[rowIndex][colIndex] !== 0;
	};

	const getCellBackgroundColor = (rowIndex, colIndex) => {
		return getCellBackgroundColorUtil(editableGrid, fixedCells, clickedCell, invalidCells, rowIndex, colIndex, version, isHintOn, hintCell, checkOn, checkedCells);
	};

	const getCellTextColor = (row, col) => {
		return getCellTextColorUtil(fixedCells, row, col);
	};

	const borderColor = getCellBorderColor(version);
	const gridSize = Math.floor(Math.sqrt(grid.length));

	return (    
		<Box display="flex" justifyContent="center">
			<TableContainer
				component={Paper}
				elevation={0}
				sx={{ overflow: "hidden" }}
			>
				<Table>
                <TableBody>
                    {editableGrid.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            sx={{
                                borderTop:
                                    rowIndex % gridSize === 0
                                        ? `2.5px solid ${borderColor}`
                                        : `1px solid ${borderColor}`,
                                borderBottom:
                                    rowIndex === grid.length - 1
                                        ? `2.5px solid ${borderColor}`
                                        : "undefined",
                                display: "flex"
                            }}
                        >
                            {row.map((cell, colIndex) => (
                                <TableCell
                                    key={colIndex}
                                    align="center"
                                    sx={{
                                        aspectRatio: 1/1,
                                        padding: "0",
                                        // border: `1px solid ${borderColor}`,
                                        borderLeft:
                                            colIndex % gridSize === 0
                                                ? `2.5px solid ${borderColor}`
                                                : `1px solid ${borderColor}`,
                                        borderRight:
                                            colIndex === grid.length - 1
                                                ? `2.5px solid ${borderColor}`
                                                : "undefined",
                                        backgroundColor:
                                            getCellBackgroundColor(
                                                rowIndex,
                                                colIndex
                                            ),
                                    }}
                                    onClick={() =>
                                        handleCellClick(rowIndex, colIndex)
                                    }
                                >
                                    <input
                                        type="text"
                                        value={cell !== 0 ? cell : ""}
                                        onChange={(event) =>
                                            handleCellChange(
                                                event,
                                                rowIndex,
                                                colIndex
                                            )
                                        }
                                        readOnly={isCellFixed(
                                            rowIndex,
                                            colIndex
                                        )}
                                        maxLength={1}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            textAlign: "center",
                                            fontFamily: "Roboto Slab, Serif",
                                            border: "none",
                                            outline: "none",
                                            backgroundColor: "transparent",
                                            color: getCellTextColor(
                                                rowIndex,
                                                colIndex
                                            ),
                                            fontSize: "1.7rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            verticalAlign: "middle",
                                            visibility: (isRunning) ? "visible" : "hidden"
                                        }}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

SGrid.defaultProps = {
	grid: [
		[5, 3, 0, 0, 7, 0, 0, 0, 0],
		[6, 0, 0, 1, 9, 5, 0, 0, 0],
		[0, 9, 8, 0, 0, 0, 0, 6, 0],
		[8, 0, 0, 0, 6, 0, 0, 0, 3],
		[4, 0, 0, 8, 0, 3, 0, 0, 1],
		[7, 0, 0, 0, 2, 0, 0, 0, 6],
		[0, 6, 0, 0, 0, 0, 2, 8, 0],
		[0, 0, 0, 4, 1, 9, 0, 0, 5],
		[0, 0, 0, 0, 8, 0, 0, 7, 9],
	],
	fixedCells: [
		[1, 1, 0, 0, 1, 0, 0, 0, 0],
		[1, 0, 0, 1, 1, 1, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 0, 1, 0],
		[1, 0, 0, 0, 1, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 1, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 1],
		[0, 1, 0, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 1, 1, 1, 0, 0, 1],
		[0, 0, 0, 0, 1, 0, 0, 1, 1],
	],
	version: "black",
};

export default SGrid;

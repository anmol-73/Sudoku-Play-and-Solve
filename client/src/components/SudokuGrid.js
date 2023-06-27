import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Typography } from '@mui/material';
import { validateGrid as validateGridUtil} from '../utils/Gridutils/validateGrid';
import { getCellBackgroundColor as getCellBackgroundColorUtil } from '../utils/Gridutils/getCellBackgroundColor';
import { getCellTextColor as getCellTextColorUtil } from '../utils/Gridutils/getCellTextColor';
import { getCellBorderColor} from '../utils/Gridutils/getCellBorderColor';

const SudokuGrid = ({ grid, fixedCells, version}) => {

	const [editableGrid, setEditableGrid] = useState(grid);
	const [clickedCell, setClickedCell] = useState(null);
	const [invalidCells, setInvalidCells] = useState([]);

    useEffect(() => {
        setEditableGrid(grid);
        validateGrid(grid);
      }, [grid]);

	if(version !== "black" && version !== "green" && version !== "red" && version !== "blue")
	{
		version = "black";
	}

	const handleCellClick = (rowIndex, colIndex) => {
		setClickedCell({ row: rowIndex, col: colIndex });
	};

	const validateGrid = (currGrid) => {
		const newInvalidCells = validateGridUtil(currGrid);
		setInvalidCells(newInvalidCells);
	};

	const handleCellChange = (event, rowIndex, colIndex) => {
		const value = event.target.value;
		if (/^[1-9]$/.test(value) || value === '' || value === '-') {
            const updatedGrid = [...editableGrid];
            if(value === '-')
                updatedGrid[rowIndex][colIndex] = '-';
            else
                updatedGrid[rowIndex][colIndex] = value === '' ? 0 : parseInt(value, 10);

            // console.log(updatedGrid);
            setEditableGrid(updatedGrid);
            setClickedCell({row: rowIndex, col: colIndex});
            validateGrid(updatedGrid);
		}
	};

	const getCellBackgroundColor = (rowIndex, colIndex) => {
		return getCellBackgroundColorUtil(editableGrid, fixedCells, clickedCell, invalidCells, rowIndex, colIndex, version);
	};

    const getCellTextColor = (row, col) => {
        return getCellTextColorUtil(fixedCells, row, col);
    }
    
	const borderColor = getCellBorderColor(version);
	const gridSize = Math.sqrt(grid.length);

	return (
		<Box display="flex" justifyContent="center">
		<TableContainer component={Paper} elevation={0} sx={{ overflow: 'hidden' }}>
			<Table>
			<TableBody>
				{editableGrid.map((row, rowIndex) => (
                    <TableRow key={rowIndex} 
                    sx={{borderTop: rowIndex % gridSize === 0 ? `2px solid ${borderColor}` : 'undefined', 
					borderBottom: rowIndex === grid.length - 1 ? `2px solid ${borderColor}` : 'undefined',
                    display: 'flex',
                }}
                >
					{row.map((cell, colIndex) => (
                        <TableCell
                            key={colIndex}
                            align="center"
                            sx={{
                                aspectRatio: 1/1,
                                padding: "0",
                                border: `1px solid ${borderColor}`,
                                borderLeft: colIndex % gridSize === 0 ? `2px solid ${borderColor}` : 'undefined',
                                borderRight: colIndex === grid.length - 1 ? `2px solid ${borderColor}` : 'undefined',
                                backgroundColor: getCellBackgroundColor(rowIndex, colIndex),
                            }}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            <input
                            type="text"
                            value={cell !== 0 ? cell : ''}
                            onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
                            maxLength={1}
                            style={{
                                width: '100%',
                                height: '100%',
                                fontFamily: "Roboto Slab, serif",
                                border: "none", 
                                outline: "none",
                                textAlign: 'center',
                                backgroundColor: 'transparent',
                                color: getCellTextColor(rowIndex, colIndex),
                                fontSize: "1.7rem",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                verticalAlign: 'middle',
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

SudokuGrid.defaultProps = {
    version: "black"
};

export default SudokuGrid;

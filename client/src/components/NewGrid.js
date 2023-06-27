import React, { useEffect, useState } from "react";
import {Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box} from "@mui/material";
import { validateGrid as validateGridUtil } from "../utils/Gridutils/validateGrid";
import { getCellBackgroundColor as getCellBackgroundColorUtil } from "../utils/Gridutils/getCellBackgroundColor";
import { getCellTextColor as getCellTextColorUtil } from "../utils/Gridutils/getCellTextColor";
import { getCellBorderColor } from "../utils/Gridutils/getCellBorderColor";

const NewGrid = ({
    grid,
    fixedCells,
    version,
    isNoteAllowed,
    onCellClick,
    gridHistory,
    setGridHistory,
  }) => {

    const [editableGrid, setEditableGrid] = useState(grid);
    const [clickedCell, setClickedCell] = useState(null);
    const [invalidCells, setInvalidCells] = useState([]);
    const [noteGrid, setNoteGrid] = useState([]);

    useEffect(() => {
      setEditableGrid(grid);
      validateGrid();
      setNoteGrid(createEmptyNoteGrid(grid));
    }, [grid]);
  
    if (
      version !== "black" &&
      version !== "green" &&
      version !== "red" &&
      version !== "blue"
    ) {
      version = "black";
    }
  
    const handleCellClick = (rowIndex, colIndex) => {
      onCellClick(rowIndex, colIndex);
      setClickedCell({ row: rowIndex, col: colIndex });
    };
  
    const validateGrid = () => {
      const newInvalidCells = validateGridUtil(editableGrid);
      setInvalidCells(newInvalidCells);
    };
  
    const handleCellChange = (event, rowIndex, colIndex) => {
      const value = event.target.value;
      if (/^[1-9]$/.test(value) || value === "") {
        const updatedGrid = [...editableGrid];
        updatedGrid[rowIndex][colIndex] = value === "" ? 0 : parseInt(value, 10);
        setEditableGrid(updatedGrid);
        setClickedCell({ row: rowIndex, col: colIndex });
        validateGrid();
  
        const newGrid = JSON.parse(JSON.stringify(updatedGrid));
        setGridHistory([...gridHistory, newGrid]);
      }
    };
  
    const isCellFixed = (rowIndex, colIndex) => {
      return fixedCells[rowIndex][colIndex] !== 0;
    };
  
    const getCellBackgroundColor = (rowIndex, colIndex) => {
      return getCellBackgroundColorUtil(
        editableGrid,
        fixedCells,
        clickedCell,
        invalidCells,
        rowIndex,
        colIndex,
        version
      );
    };
  
    const getCellTextColor = (row, col) => {
      return getCellTextColorUtil(fixedCells, row, col);
    };
  
    const borderColor = getCellBorderColor(version);
    const gridSize = Math.floor(Math.sqrt(grid.length));
  
    const noteGridSize = Math.floor(Math.sqrt(gridSize));
  
    const createEmptyNoteGrid = (grid) => {
        const noteGrid = [];
        const gridSize = Math.sqrt(grid.length);
    
        for (let i = 0; i < gridSize; i++) {
          const noteRow = [];
          for (let j = 0; j < gridSize; j++) {
            noteRow.push([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
          }
          noteGrid.push(noteRow);
        }
    
        return noteGrid;
      };
  
    const handleNoteChange = (event, rowIndex, colIndex, noteRowIndex, noteColIndex) => {
      const value = event.target.value;
      const updatedNoteGrid = [...noteGrid];
      updatedNoteGrid[rowIndex][colIndex][noteRowIndex][noteColIndex] =
        value === "" ? 0 : parseInt(value, 10);
      setNoteGrid(updatedNoteGrid);
    };
  
    const getCellNoteBackgroundColor = (rowIndex, colIndex, noteRowIndex, noteColIndex) => {
      // Use the same color as normal numbers
      return getCellBackgroundColorUtil(
        editableGrid,
        fixedCells,
        clickedCell,
        invalidCells,
        rowIndex,
        colIndex,
        version
      );
    };

    const getCellNoteTextColor = (rowIndex, colIndex, noteRowIndex, noteColIndex) => {
      // Use the same color as normal numbers
      return getCellTextColorUtil(fixedCells, rowIndex, colIndex);
    };
  
    return (
      <Box
        sx={{
          aspectRatio: 1 / 1,
          m: "2rem",
          mt: "1rem",
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper} elevation={0} sx={{ overflow: "hidden" }}>
          <Table sx={{ aspectRatio: 1 / 1 }}>
            <TableBody>
              {editableGrid.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    borderTop:
                      rowIndex % gridSize === 0 ? `2px solid ${borderColor}` : "undefined",
                    borderBottom:
                      rowIndex === grid.length - 1 ? `2px solid ${borderColor}` : "undefined",
                  }}
                >
                  {row.map((cell, colIndex) => (
                    <TableCell
                      key={colIndex}
                      align="center"
                      sx={{
                        fontFamily: "Roboto Slab, Serif",
                        fontWeight: "800",
                        padding: 0,
                        border: `1px solid ${borderColor}`,
                        borderLeft:
                          colIndex % gridSize === 0 ? `2px solid ${borderColor}` : "undefined",
                        borderRight:
                          colIndex === grid.length - 1 ? `2px solid ${borderColor}` : "undefined",
                        backgroundColor: getCellBackgroundColor(rowIndex, colIndex),
                      }}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {isNoteAllowed ? (
                        <TableContainer component={Paper} elevation={0} sx={{ overflow: "hidden" }}>
                          <Table>
                            <TableBody>
                              {noteGrid.map((noteRow, noteRowIndex) => (
                                <TableRow key={noteRowIndex}>
                                  {noteRow.map((noteCell, noteColIndex) => (
                                    <TableCell
                                      key={noteColIndex}
                                      align="center"
                                      sx={{
                                        fontFamily: "Roboto Slab, Serif",
                                        fontWeight: "800",
                                        padding: 0,
                                        border: `1px solid ${borderColor}`,
                                        backgroundColor: getCellNoteBackgroundColor(
                                          rowIndex,
                                          colIndex,
                                          noteRowIndex,
                                          noteColIndex
                                        ),
                                      }}
                                    >
                                      <input
                                        type="text"
                                        value={
                                          noteCell !== 0 ? noteCell : ""
                                        }
                                        onChange={(event) =>
                                          handleNoteChange(
                                            event,
                                            rowIndex,
                                            colIndex,
                                            noteRowIndex,
                                            noteColIndex
                                          )
                                        }
                                        maxLength={1}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          textAlign: "center",
                                          border: "none",
                                          outline: "none",
                                          backgroundColor: "transparent",
                                          color: getCellNoteTextColor(
                                            rowIndex,
                                            colIndex,
                                            noteRowIndex,
                                            noteColIndex
                                          ),
                                          fontSize: "1.2rem",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          verticalAlign: "middle",
                                        }}
                                      />
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <input
                          type="text"
                          value={cell !== 0 ? cell : ""}
                          onChange={(event) =>
                            handleCellChange(event, rowIndex, colIndex)
                          }
                          readOnly={isCellFixed(rowIndex, colIndex)}
                          maxLength={1}
                          style={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent",
                            color: getCellTextColor(rowIndex, colIndex),
                            fontSize: "1.2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
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
  
  NewGrid.defaultProps = {
    isNoteAllowed: true
  }

  export default NewGrid;
  

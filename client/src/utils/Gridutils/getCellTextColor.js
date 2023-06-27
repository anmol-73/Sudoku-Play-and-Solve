
export const getCellTextColor = (fixedCells, row, col) => {

    if(fixedCells[row][col] !== 0)
        return "#333333";
    else
        return "#336699";
}
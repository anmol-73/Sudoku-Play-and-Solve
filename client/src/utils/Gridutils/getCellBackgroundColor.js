export const getCellBackgroundColor = (editableGrid, fixedCells, clickedCell, invalidCells, rowIndex, colIndex, version, isHintOn, hintCell, checkOn, checkedCells) => {

	if (checkOn) 
    {
		if (checkedCells && checkedCells.some((cell) => cell.row === rowIndex && cell.col === colIndex)) {
			if (version === "red") return "#FFFF00";
			else return "#ff9999";
		}
	}

	if (isHintOn) 
    {
		if (hintCell.row === rowIndex && hintCell.col === colIndex)
			return "#FFA500";
	}

	if (isCellClicked(clickedCell, rowIndex, colIndex)) 
    {
		return version === "black"
			? "#b7b7b7"
			: version === "blue"
			? "#a7c5e5"
			: version === "red"
			? "#f8a5a5"
			: version === "green"
			? "#a8d8b6"
			: "";
	} 
    else if (invalidCells.some((cell) => cell.row === rowIndex && cell.col === colIndex) && !checkOn) 
    {
		return version === "black"
			? "#ff9999"
			: version === "blue"
			? "#ff9999"
			: version === "red"
			? "#FFFF00"
			: version === "green"
			? "#ff9999"
			: "";
	} 
    else if (clickedCell) 
    {
		const clickedRow = clickedCell.row;
		const clickedCol = clickedCell.col;
		const subgridSize = Math.sqrt(editableGrid.length);
		const clickedCellValue = editableGrid[clickedRow][clickedCol];

		const isClickedRow = clickedRow === rowIndex;
		const isClickedCol = clickedCol === colIndex;
		const isClickedSubgrid =
			Math.floor(clickedRow / subgridSize) ===
				Math.floor(rowIndex / subgridSize) &&
			Math.floor(clickedCol / subgridSize) ===
				Math.floor(colIndex / subgridSize);

		const hasSameValue =
			clickedCellValue !== 0 &&
			editableGrid[rowIndex][colIndex] === clickedCellValue;

		if (hasSameValue) 
        {
			return version === "black"
				? "#a0a0a0"
				: version === "blue"
				? "#b6cee3"
				: version === "red"
				? "#f1a0a0"
				: version === "green"
				? "#b3d8c4"
				: "";
		} 
        else if (isClickedRow || isClickedCol || isClickedSubgrid) 
        {
			return version === "black"
				? "#dddddd"
				: version === "blue"
				? "#e2ecf5"
				: version === "red"
				? "#fbe6e6"
				: version === "green"
				? "#e2f5ed"
				: "";
		}
	}

	if (isCellFixed(rowIndex, colIndex, fixedCells)) 
    {
		return version === "black"
			? "#F2F2F2"
			: version === "blue"
			? "#f0f6fa"
			: version === "red"
			? "#FFF4F4"
			: version === "green"
			? "#f0fdfa"
			: "";
	}

	return "transparent";
};

const isCellClicked = (clickedCell, rowIndex, colIndex) => {
	return (
		clickedCell && clickedCell.row === rowIndex && clickedCell.col === colIndex
	);
};

const isCellFixed = (rowIndex, colIndex, fixedCells) => {
	return fixedCells[rowIndex][colIndex] !== 0;
};

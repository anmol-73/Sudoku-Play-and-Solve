
export const validateGrid = (grid) => {
    
    const newInvalidCells = [];

    for (let row = 0; row < grid.length; row++) 
    {
        for (let col = 0; col < grid[row].length; col++) 
        {
            const value = grid[row][col];
            if (value !== 0 && !isCellValid(grid, row, col)) 
            {
                newInvalidCells.push({ row, col });
            }
        }
    }

    return newInvalidCells;
};

const isCellValid = (grid, row, col) => {
    const value = grid[row][col];

    // Check if value already exists in the same row
    for (let i = 0; i < grid.length; i++) 
    {
        if (i !== col && grid[row][i] === value) 
        {
            return false;
        }
    }

    // Check if value already exists in the same column
    for (let i = 0; i < grid.length; i++) 
    {
        if (i !== row && grid[i][col] === value) 
        {
            return false;
        }
    }

    // Check if value already exists in the same subgrid
    const gridSize = Math.sqrt(grid.length);
    const subgridRowStart = Math.floor(row / gridSize) * gridSize;
    const subgridColStart = Math.floor(col / gridSize) * gridSize;

    for (let i = subgridRowStart; i < subgridRowStart + gridSize; i++) 
    {
        for (let j = subgridColStart; j < subgridColStart + gridSize; j++) 
        {
            if (i !== row && j !== col && grid[i][j] === value) 
            {
                return false;
            }
        }
    }

    return true;
};

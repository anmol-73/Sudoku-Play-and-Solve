import React, { useState } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

const GridDifficultyButtons = ({availableDifficulties, onDifficultySelect, currentDifficulty}) => {

	const handleDifficultyChange = (difficulty) => {
		onDifficultySelect(difficulty);
	};

	function getColor(difficulty) 
    {
		let color;
		if (difficulty === "easy") 
            color = "#228B22";
		else if (difficulty === "medium") 
            color = "#FF8C00";
		else if (difficulty === "hard") 
            color = "#FF0800";
		else if (difficulty === "expert") 
            color = "#8A2BE2";

		return color;
	}

	return (
		<Grid container spacing={0.5}>
            <Grid item>
                <Typography
                    sx={{
                        display: "flex",
                        fontFamily: "Roboto Slab, Serif",
                        fontSize: "21px",
                        alignItems: "center",
                        height: "min-content",
                        // mb: "0.2rem",
                    }}
                >
                    Difficulty:
                </Typography>
            </Grid>
			
			{availableDifficulties.map((difficulty) => (
                <Grid item key={difficulty}>
                    <Button
                        key={difficulty}
                        variant={
                            currentDifficulty === difficulty
                                ? "contained"
                                : "outlined"
                        }
                        size="small"
                        sx={{
                            color:
                                currentDifficulty === difficulty
                                    ? "white"
                                    : getColor(difficulty),
                            backgroundColor:
                                currentDifficulty === difficulty
                                    ? getColor(difficulty)
                                    : "transparent",
                            borderColor: getColor(difficulty),
                            // ml: "11px",
                            // mb: "5px",
                            ":hover": {
                                backgroundColor:
                                currentDifficulty === difficulty
                                    ? getColor(difficulty)
                                    : "transparent",
                                borderColor: getColor(difficulty),
                            }
                        }}
                        onClick={() => handleDifficultyChange(difficulty)}
				    >
                        <Typography
                            sx={{
                                display: "flex",
                                fontFamily: "Roboto Slab, Serif",
                                alignItems: "center",
                                height: "min-content",
                                textTransform:"capitalize"
                            }}
                        >
                            {difficulty}
                        </Typography>
				    </Button>
                </Grid>
				
			))}
		</Grid>
	);
};

GridDifficultyButtons.defaultProps = {
	availableDifficulties: ["easy", "medium", "hard", "expert"],
};

export default GridDifficultyButtons;

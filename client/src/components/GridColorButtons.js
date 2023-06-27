import React, { useState } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";

const GridColorButtons = ({ availableColors, onColorSelect }) => {

	const [selectedColor, setSelectedColor] = useState("black");

	const handleColorChange = (color) => {
		setSelectedColor(color);
		onColorSelect(color);
	};

	return (
		<Grid container spacing={1}>
            <Grid item>
                <Typography
                    sx={{
                        display: "flex",
                        fontFamily: "Roboto Slab, Serif",
                        fontSize: "21px",
                        alignItems: "center",
                        height: "min-content",
                    }}
                >
                    Color:
                </Typography>
            </Grid>
			

			{availableColors.map((color) => (
                <Grid item key={color}>
                    <Button
                        key={color}
                        variant={selectedColor === color ? "contained" : "outlined"}
                        size="small"
                        sx={{
                            color: selectedColor === color ? "white" : color,
                            backgroundColor:
                                selectedColor === color ? color : "transparent",
                            borderColor: color,
                            ":hover": {
                                backgroundColor:
                                    selectedColor === color ? color : "transparent",
                                borderColor: color,
                            }
                        }}
                        onClick={() => handleColorChange(color)}
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
                            {color}
                        </Typography>
                    </Button>
                </Grid>
				
			))}
		</Grid>
	);
};

GridColorButtons.defaultProps = {
	availableColors: ["black", "blue", "red", "green"],
};

export default GridColorButtons;

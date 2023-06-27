import React, { useState } from "react";
import { Button, Box, Typography, Grid, MenuItem, Select, NativeSelect, FormControl, InputLabel } from "@mui/material";

const GridColorSelector = ({ availableColors, onColorSelect }) => {

	const [selectedColor, setSelectedColor] = useState("Black");

	const handleColorChange = (color) => {
		setSelectedColor(color);
		onColorSelect(color);
	};

	return (
		<Grid container spacing alignItems="center">
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
			
            <Grid item>
                <FormControl fullWidth>
                    <NativeSelect
                        value={selectedColor}
                        onChange={(event) => handleColorChange(event.target.value)}
                        sx={{fontSize:"18px"}}
                    >
                        {availableColors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Grid>
		</Grid>
	);
};

GridColorSelector.defaultProps = {
	availableColors: ["Black", "Blue", "Red", "Green"],
};

export default GridColorSelector;

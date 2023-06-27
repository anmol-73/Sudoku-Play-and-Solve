import React from "react";
import { Grid, Button, useTheme, Typography } from "@mui/material";

const Numpad = ({ onPress, color }) => {
    
	const handleClick = (number) => {
		onPress(number);
	};

	return (
		<Grid container justifyContent="center">
			<Grid container spacing={1}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
					<Grid item xs={4} sm={4} md={4} lg={4} key={number}>
						<Button
							variant="outlined"
							sx={{
								width: "100%",
								height: "100%",
								borderRadius: "8px",
								fontSize: "20px",
								pt: "8px",
								pb: "8px",
								border: "2px solid",
								transition: "background-color 0.3s",
								color: color,
								"&:hover": {
									"@media (min-width: 600px)": {
										backgroundColor: color,
										borderColor: color,
										color: "white",
									},
									"@media (max-width: 599.99px)": {
										border: "2px solid",
										borderColor: color,
										color: color,
										backgroundColor: "transparent",
									},
								},
							}}
							onClick={() => handleClick(number)}
						>
							<Typography
								sx={{
									display: "flex",
									fontFamily: "Roboto Slab, Serif",
									fontSize: "1.7rem",
									alignItems: "center",
									height: "min-content",
								}}
							>
								{number}
							</Typography>
						</Button>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};

export default Numpad;

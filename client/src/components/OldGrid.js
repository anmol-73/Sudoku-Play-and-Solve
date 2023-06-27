import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
	sudokuGrid: {
		width: "100%",
		"@media (min-width: 960px)": {
			width: "33.33%",
		},
	},
	sudokuCell: {
		position: "relative",
		width: "calc(100% / 9)",
		padding: 0,
		aspectRatio: 1 / 1,
		border: "1px solid black",
		boxSizing: "border-box",
	},
	sudokuInputContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		padding: 0,
		aspectRatio: 1 / 1,
	},
	sudokuInput: {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "Roboto Slab, serif",
		textAlign: "center",
		fontSize: "1.7rem",
		padding: 0,
		"& .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
	},
}));

const OldGrid = () => {
	const classes = useStyles();

	return (
		<Box margin={2}>
			<Box className={classes.sudokuGrid}>
				<Grid container spacing={0}>
					{[...Array(9)].map((_, rowIndex) => (
						<Grid item container key={rowIndex} spacing={0}>
							{[...Array(9)].map((_, colIndex) => (
								<Grid item key={colIndex} className={classes.sudokuCell}>
									<Box className={classes.sudokuInputContainer}>
										<TextField
											variant="outlined"
											size="small"
											inputProps={{
												maxLength: 1,
												style: { textAlign: "center" },
											}}
											className={classes.sudokuInput}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default OldGrid;

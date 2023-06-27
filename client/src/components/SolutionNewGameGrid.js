import React from "react";
import { Grid, Button, Typography } from "@mui/material";

const GridWithSolutionNewGame = ({ onSolveClick, onNewGameClick }) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<Button
					variant="contained"
					color="primary"
					fullWidth
					sx={{ height: "3rem" }}
					onClick={onSolveClick}
				>
					<Typography
						sx={{
							display: "flex",
							fontFamily: "Roboto Slab, Serif",
							alignItems: "center",
							height: "min-content",
							textTransform: "capitalize",
						}}
					>
						Solve
					</Typography>
				</Button>
			</Grid>
			<Grid item xs={6}>
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					sx={{ height: "3rem" }}
					onClick={onNewGameClick}
				>
					<Typography
						sx={{
							display: "flex",
							fontFamily: "Roboto Slab, Serif",
							alignItems: "center",
							height: "min-content",
							textTransform: "capitalize",
						}}
					>
						New Game
					</Typography>
				</Button>
			</Grid>
		</Grid>
	);
};

export default GridWithSolutionNewGame;

import React from "react";
import { Button, Tooltip, Typography } from "@mui/material";

const SolveButton = ({ onClick }) => {
	return (
		<Tooltip arrow title="Solves the board">
			<Button
				variant="contained"
				color="primary"
				fullWidth
				sx={{
					height: "3rem",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
				onClick={onClick}
			>
				<Typography
					sx={{
						fontFamily: "Roboto Slab, Serif",
                        textTransform: "none"
					}}
				>
					Solve
				</Typography>
			</Button>
		</Tooltip>
	);
};

export default SolveButton;

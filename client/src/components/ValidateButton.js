import React from "react";
import { Button, Tooltip, Typography } from "@mui/material";

const ValidateButton = ({ onClick }) => {
	return (
		<Tooltip arrow title="Checks if the puzzle has a solution">
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
					Validate
				</Typography>
			</Button>
		</Tooltip>
	);
};

export default ValidateButton;

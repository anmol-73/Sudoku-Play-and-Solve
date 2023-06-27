import React from "react";
import { Button, Tooltip, Typography } from "@mui/material";

const RevealButton = ({ onClick }) => {
	return (
		<Tooltip arrow title="Reveals cells marked with -">
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
					Reveal
				</Typography>
			</Button>
		</Tooltip>
	);
};

export default RevealButton;

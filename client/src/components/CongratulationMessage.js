import React, { useState, useEffect } from "react";
import { Snackbar, Box, Typography, Button } from "@mui/material";

const CongratulationMessage = ({ open, setOpen, time, duration }) => {

	const handleClose = () => {
		setOpen(false);
	};

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;

		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};
    
	return (
		<Snackbar
			open={open}
			autoHideDuration={duration}
			onClose={handleClose}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
		>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				p={2}
				sx={{
					background: "linear-gradient(to right, #4CAF50, #81C784)",
					borderRadius: "10px",
				}}
			>
				<Typography
					variant="h6"
					align="center"
					mb={2}
					sx={{ fontFamily: "Roboto Slab, serif" }}
				>
					Congratulations!
				</Typography>
				<Typography
					variant="body1"
					align="center"
					mb={2}
					sx={{ fontFamily: "Roboto Slab, serif" }}
				>
					You have successfully solved the Sudoku puzzle in {formatTime(time)}.
				</Typography>
				<Button variant="contained" onClick={handleClose}>
					<Typography
						variant="body1"
						align="center"
						sx={{ fontFamily: "Roboto Slab, serif", textTransform: "none" }}
					>
						Close
					</Typography>
				</Button>
			</Box>
		</Snackbar>
	);
};

CongratulationMessage.defaultProps = {
	duration: 10000,
};

export default CongratulationMessage;

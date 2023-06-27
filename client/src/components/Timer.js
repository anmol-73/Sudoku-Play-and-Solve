import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

const Timer = ({ isRunning, setIsRunning, time, setTime }) => {
    
	const pageVisibilityRef = useRef(true);

	useEffect(() => {
		let intervalId;

		const handleVisibilityChange = () => {
			pageVisibilityRef.current = document.visibilityState === "visible";
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		if (isRunning) {
			intervalId = setInterval(() => {
				if (pageVisibilityRef.current) {
					setTime((prevTime) => prevTime + 1);
				}
			}, 1000);
		}

		return () => {
			clearInterval(intervalId);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [isRunning]);

	const handlePlayPauseClick = () => {
		setIsRunning((prevIsRunning) => !prevIsRunning);
	};

	const resetTimer = () => {
		setTime(0);
		setIsRunning(false);
	};

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;

		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<Box display="flex" alignItems="center">
			<Box mr={1} sx={{ fontSize: "1.25rem" }}>
				<Typography
					sx={{
						display: "flex",
						fontFamily: "Roboto Slab, Serif",
						fontSize: "21px",
						alignItems: "center",
						height: "min-content",
					}}
				>
					Timer:
				</Typography>
			</Box>
			<Box
				display="flex"
				alignItems="center"
				borderRadius="50px"
				pl="0.5rem"
				bgcolor="#e0e0e0"
			>
				<Box sx={{ fontSize: "1.1rem" }}>
                    <Typography sx={{
                        display: "flex",
                        fontFamily: "Roboto Slab, Serif",
                        fontSize: "18px",
                        alignItems: "center",
                        height: "min-content",
                    }}>
                        {formatTime(time)}

                    </Typography>
                </Box>
				<IconButton
					sx={{
						padding: "6px",
						borderRadius: "50%",
						backgroundColor: "#e0e0e0",
						fontSize: "1.5rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					onClick={handlePlayPauseClick}
				>
					{isRunning ? (
						<Pause sx={{ fontSize: "inherit" }} />
					) : (
						<PlayArrow sx={{ fontSize: "inherit" }} />
					)}
				</IconButton>
			</Box>
		</Box>
	);
};

export default Timer;

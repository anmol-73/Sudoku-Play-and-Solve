import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingScreen = () => {
	const [dots, setDots] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDots((prevDots) => (prevDots + 1) % 4);
		}, 700);

		return () => clearInterval(intervalId);
	}, []);

	const loadingText = `Loading${".".repeat(dots)}`;

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="85vh"
		>
			<Box textAlign="center">
				<CircularProgress color="primary" size={64} />
				<Typography variant="h6" color="textSecondary" mt={2}>
					{loadingText}
				</Typography>
			</Box>
		</Box>
	);
};

export default LoadingScreen;

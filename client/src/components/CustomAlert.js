import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CustomAlert = ({ open, onClose, onConfirm, text }) => {

    const getText = (text) => {
        let output;
        if(text === "solve")
            output = "Do you really want to solve the puzzle?";
        else if(text === "newGame")
            output = "Do you really want to start a new game?";

        return output;
    }

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirmation</DialogTitle>
			<DialogContent>
				<p>{getText(text)}</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="primary">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CustomAlert;

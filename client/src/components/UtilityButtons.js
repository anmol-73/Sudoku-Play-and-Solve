import React, { useState } from 'react';
import { Box, IconButton, Badge, Typography, Grid, Tooltip } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const UtilityButtons = ({onEraseClick, onUndoClick, onHintClick, onCheckClick, hints, color, checkOn}) => {

    const handleEraseClick = () => {
        onEraseClick();
    }

    const handleUndoClick = () => {
        onUndoClick();
    }

    const handleHintClick = () => {
        onHintClick();
    }

    const handleCheckClick = () => {
        onCheckClick();
    }

    return (
        <Grid container spacing={2}>

            <Grid item xs={3} container direction="column" alignItems="center" spacing={1}>
                <Tooltip arrow placement='top' title="Reverts the previous change made">
                    <IconButton onClick={handleUndoClick} sx={{ backgroundColor: color, color: 'white', ":hover":{backgroundColor:color}}}>
                        <ReplayIcon sx = {{fontSize:"40px"}} />
                    </IconButton>
                </Tooltip>
                
                <Typography variant="body1" sx = {{mt:"5px", fontFamily:"Roboto Slab, Serif"}}>Undo</Typography>
            </Grid>

            <Grid item xs={3} container direction="column" alignItems="center" spacing={1}>
                <Tooltip arrow placement='top' title="Erases the contents of the selected cell">
                    <IconButton onClick={handleEraseClick} sx={{ backgroundColor: color, color: 'white',":hover":{backgroundColor:color} }}>
                        <DeleteIcon sx = {{fontSize:"40px"}}/>
                    </IconButton>
                </Tooltip>
                
                <Typography variant="body1" sx = {{mt:"5px", fontFamily:"Roboto Slab, Serif"}}>Erase</Typography>
            </Grid>

            <Grid item xs={3} container direction="column" alignItems="center" spacing={1}>
                <Tooltip arrow placement='top' title="Check mode highlights incorrect cells for easy error identification.">
                    <IconButton onClick={handleCheckClick} sx={{ backgroundColor: color, color: 'white',":hover":{backgroundColor:color} }}>
                        <CheckIcon sx = {{fontSize:"40px"}} />
                        <Badge
                            badgeContent={(checkOn) ? "ON": "OFF"}
                            color="secondary"
                            overlap="circular"
                            sx={{ position: 'absolute', top: '4px', right: '4px', '& .MuiBadge-badge': {
                                backgroundColor: checkOn ? '#FF8F00' : undefined
                            }, }}
                        />
                </IconButton>
                </Tooltip>

                <Typography variant="body1" sx = {{mt:"5px", fontFamily:"Roboto Slab, Serif"}}>Check</Typography>
            </Grid>

            <Grid item xs={3} container direction="column" alignItems="center" spacing={1}>
                <Tooltip arrow placement='top' title="Corrects errors or reveals value for new cells.">
                    <IconButton onClick={handleHintClick} sx={{ backgroundColor: color, color: 'white',":hover":{backgroundColor:color} }}>
                        <LightbulbIcon sx = {{fontSize:"40px"}} />
                            <Badge
                            badgeContent={`${hints}/3`}
                            color="secondary"
                            overlap="circular"
                            sx={{ position: 'absolute', top: '4px', right: '4px' }}
                            />
                    </IconButton>
                </Tooltip>
                
                <Typography variant="body1" sx = {{mt:"5px", fontFamily:"Roboto Slab, Serif"}}>Hint</Typography>
            </Grid>
        </Grid>
    );
};

export default UtilityButtons;

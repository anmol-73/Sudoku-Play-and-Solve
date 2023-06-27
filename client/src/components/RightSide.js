import React from 'react';
import { Grid } from '@mui/material';
import UtilityButtons from './UtilityButtons';
import Numpad from './Numpad';
import SGrid from './SGrid';

const RightSide = ({color}) => {

  return (
    <Grid container>
      <Grid item lg={5} md = {6}>
        <SGrid version={color}/>
      </Grid>
      <Grid item lg={4} md = {5} sx = {{mx: "2rem", my:"2rem"}}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <UtilityButtons />
          </Grid>
          <Grid item>
            <Numpad />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RightSide;

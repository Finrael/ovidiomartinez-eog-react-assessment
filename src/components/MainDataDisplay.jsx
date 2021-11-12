import * as React from 'react';
import Paper from '@mui/material/Paper';

const MainDataDisplay = ({ metricName, currentValue }) => (
  <div className='mainDataDisplay'>
    <Paper variant='outlined'>{metricName}</Paper>
    <Paper variant='outlined'>{currentValue}</Paper>
  </div>
);
export default MainDataDisplay;

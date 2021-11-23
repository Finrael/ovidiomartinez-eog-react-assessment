import * as React from 'react';
import Paper from '@mui/material/Paper';
/**
 *
 * @param {string} metricname
 * @param {number} currentValue
 * @returns react component
 */
const MainDataDisplay = ({ metricName, currentValue }) => (
  <span className='mainDataDisplay'>
    <Paper variant='outlined'>{metricName}</Paper>
    <Paper variant='outlined'>{currentValue}</Paper>
  </span>
);
export default MainDataDisplay;

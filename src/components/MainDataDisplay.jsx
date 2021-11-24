import * as React from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(20),
    height: theme.spacing(10),
  },
  text: {
    primary: '#1963D5',
  },

}));

/**
 *
 * @param {string} metricname
 * @param {number} currentValue
 * @returns react component
 */
const MainDataDisplay = ({ metricName, currentValue }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper variant='outlined' className={classes.text}> <Typography style={{ backgroundColor: 'black', color: 'white' }}><div>{metricName}</div><div> Value:{currentValue}</div></Typography></Paper>
    </div>
  );
};
export default MainDataDisplay;

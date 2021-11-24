import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DataDisplay from './MainDataDisplay';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
}));

const RealTimeComp = () => {
  const graphicValues = useSelector((state) => state.metrics.realTime);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {graphicValues.map((element) => (
        <Grid style={{ borderRadius: '25px' }} key={element.metric}>
          <DataDisplay
            metricName={element.metric}
            currentValue={element.value}
          />
        </Grid>
      ))}
    </div>
  );
};
export default RealTimeComp;

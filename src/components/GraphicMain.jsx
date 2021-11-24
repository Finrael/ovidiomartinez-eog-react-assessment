import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Metrics from './Metrics';
import GraphicComponent from './Graphic';
import DataDisplay from './MainDataDisplay';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
}));

const GraphicMain = () => {
  const graphicValues = useSelector((state) => state);
  const [realTimeValues, setRealTimeValues] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    setRealTimeValues(graphicValues.metrics.realTime);
    // setRealTimeValues([{ metric: 'oilTemp', value: '129.92' }]);
  }, [graphicValues.metrics.realTime]);

  return (
    <div>
      <Metrics />
      <div className={classes.root}>
        {realTimeValues.map((element) => (
          <Grid style={{ borderRadius: '25px' }}>
            <DataDisplay
              metricName={element.metric}
              currentValue={element.value}
            />
          </Grid>
        ))}
      </div>

      <GraphicComponent />
    </div>
  );
};
export default GraphicMain;

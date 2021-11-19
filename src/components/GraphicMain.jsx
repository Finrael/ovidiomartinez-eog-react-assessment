import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Metrics from './Metrics';
import GraphicComponent from './Graphic';
import DataDisplay from './MainDataDisplay';

const GraphicMain = () => {
  const graphicValues = useSelector((state) => state);
  const [realTimeValues, setRealTimeValues] = useState([]);
  useEffect(() => {
    setRealTimeValues(graphicValues.metrics.realTime);
    console.log('graphicValues realtime', graphicValues.metrics.realTime);
  }, [graphicValues.metrics.realTime]);

  return (
    <div>
      <Metrics />
      {realTimeValues.map((element) => (
        <DataDisplay
          metricName={element.metrics}
          currentValue={element.value}
        />
      ))}
      <GraphicComponent />
    </div>
  );
};
export default GraphicMain;

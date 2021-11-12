import React from 'react';
import Metrics from './Metrics';
import GraphicComponent from './Graphic';
import DataDisplay from './MainDataDisplay';

const GraphicMain = () => (
  <div>
    HELLO GRAPHIC
    <Metrics />
    <DataDisplay metricName='Wather' currentValue='19.20' />
    <GraphicComponent />
  </div>
);
export default GraphicMain;

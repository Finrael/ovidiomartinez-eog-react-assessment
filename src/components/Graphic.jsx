import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { getMeasurementsAction } from '../redux/Sagas/getValuesSaga';

// const data = [{
//   at: '1637010007304', temp: 185.52,
// }, {
//   at: '1637010008605', temp: 190.93,
// }];

const Graphic = () => {
  const [graphData, setGraphData] = useState([]);
  // const [graphName, setGraphName] = useState();
  const dispatch = useDispatch();
  const graphicValues = useSelector((state) => state);
  const graphicValuesParser = (dataToParse) => {
    let resultData = [];
    console.log('DATA TO PARSE', dataToParse);
    // eslint-disable-next-line
    resultData = dataToParse.map((element) => {
      return {
        at: element.at,
        temp: element.value,
      };
    });
    console.log('THIS IS THE RESULTING DATA', resultData);
    setGraphData(resultData);
    console.log('GRAPHDATA', graphData);
  };
  useEffect(() => {
    dispatch(getMeasurementsAction());
    // console.log('GRAPHIC VALUES', graphicValues.metrics.chartData);
    if (graphData.length < 1) {
      if (graphicValues.metrics.chartData.length && graphicValues.metrics.chartData.length > 0) {
        graphicValuesParser(graphicValues.metrics.chartData);
      } else {
        console.log('no value', graphicValues.metrics.chartData);
      }
    }
  });
  return (
    <LineChart
      width={600}
      height={300}
      data={graphData}
      margin={{
        top: 5, right: 20, bottom: 5, left: 0,
      }}
    >
      {/* {graphicValuesParser(graphicValues)} */}
      <Line type="monotone" dataKey="temp" stroke="#8884d8" dot={false} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="at" />
      <YAxis datakey="temp" />
      <Tooltip />
    </LineChart>
  );
};
export default Graphic;

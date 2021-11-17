import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';
import { useSelector } from 'react-redux';
// import { KeyboardReturnSharp } from '@material-ui/icons';
// import { getMeasurementsAction } from '../redux/Sagas/getValuesSaga';
// import { getMultiMeasurementsAction } from '../redux/Sagas/getMultipleValuesSaga';

const Graphic = () => {
  const [graphData, setGraphData] = useState([]);
  // const [graphName, setGraphName] = useState();
  // const dispatch = useDisetGraphDataspatch();
  const graphicValues = useSelector((state) => state);
  // const lineDrawer = () => (graphData.map((element) =>
  //   <Line type="monotone" dataKey={element.elementName} stroke="#8884d8" dot={false} />;
  // ));
  // const auxFlattener = (dataArr) => {
  //   console.log('DATA ARR', dataArr);
  //   return dataArr.map((element) => (
  //     { at: element.at, [element.metric]: element.value }));
  // };

  const graphicValuesParser = (dataToParse) => {
    // const resultData = [];
    let multipleResultData = [];
    console.log('DATA TO PARSE', dataToParse);

    multipleResultData = dataToParse.reduce((accumulator, measure) => {
      if (accumulator.length) {
        return measure.measurements.map((record, i) => ({
          ...accumulator[i],
          at: record.at,
          [record.metric]: record.value,
        }));
      }
      return measure.measurements.map((record) => ({
        date: record.at,
        [record.metric]: record.value,
      }));
    }, []);
    console.log('THIS IS THE RESULTING DATA', multipleResultData);
    setGraphData(multipleResultData);
    return (
      <Line type="monotone" dataKey={multipleResultData} stroke="#8884d8" dot={false} />
    );
  };
  useEffect(() => {
    console.log('graph data', graphicValues.metrics);
    graphicValuesParser(graphicValues.metrics.chartMultipleData);
  }, [graphicValues.metrics.chartMultipleData]);
  return (
    <LineChart
      width={600}
      height={300}
      data={graphData}
      margin={{
        top: 5, right: 20, bottom: 5, left: 0,
      }}
    >
      {graphicValues.metrics.chosenMetric.map((element) => <Line type="monotone" dataKey={element} stroke="#8884d8" dot={false} />)}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="at" />
      <YAxis datakey="temp" />
      <Tooltip />
    </LineChart>
  );
};
export default Graphic;

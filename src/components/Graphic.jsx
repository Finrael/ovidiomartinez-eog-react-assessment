import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';
import { useSelector } from 'react-redux';

const Graphic = () => {
  const [graphData, setGraphData] = useState([]);
  const graphicValues = useSelector((state) => state);
  const graphicValuesParser = (dataToParse) => {
    let multipleResultData = [];

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
    setGraphData(multipleResultData);
    return (
      <Line type="monotone" dataKey={multipleResultData} stroke="#8884d8" dot={false} />
    );
  };
  useEffect(() => {
    graphicValuesParser(graphicValues.metrics.chartMultipleData);
  }, [graphicValues.metrics.chartMultipleData]);
  const timeParser = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const ampm = hours > 12 ? hours - 12 : hours;
    const formatHour = ampm < 10 ? `0${ampm}` : ampm;
    const minutes = date.getMinutes();
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const pm = hours > 11;
    return `${formatHour}:${formatMinutes} ${pm ? 'pm' : 'am'}`;
  };
  const lineColorSelector = (lineName) => {
    let colorHex = '';
    switch (lineName) {
      case ('waterTemp'):
        colorHex = '#8884d8';
        break;
      case ('oilTemp'):
        colorHex = '#522411';
        break;
      case ('injValveOpen'):
        colorHex = '#4d1359';
        break;
      case ('flareTemp'):
        colorHex = '#c91212';
        break;
      case ('turbingPRessure'):
        colorHex = '#a7b812';
        break;
      case ('casingPressure'):
        colorHex = '#b812a7';
        break;
      default:
        colorHex = '#000000';
        break;
    }
    return colorHex;
  };
  return (
    <LineChart
      width={600}
      height={300}
      data={graphData}
      margin={{
        top: 5, right: 20, bottom: 5, left: 0,
      }}
    >
      {graphicValues.metrics.chosenMetric.map((element) => <Line type="monotone" key={element} dataKey={element} stroke={lineColorSelector(element)} dot={false} />)}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="at" tickFormatter={timeParser} />
      <YAxis datakey="temp" />
      <Tooltip />
    </LineChart>
  );
};
export default Graphic;

import * as React from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch } from 'react-redux';
// import { useSubscription } from '@apollo/client';
import {
  getChosenMetrics,
} from '../redux/Slices/mainSlice';
import { getMultiMeasurementsAction } from '../redux/Sagas/getMultipleValuesSaga';
import { subscriptionAction } from '../redux/Sagas/subscriptionSaga';
// import subsQuery from '../GraphQL/queries/subscriptionQuery';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, metricName, theme) {
  return {
    fontWeight:
      metricName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MetricSelector = ({ metricsAvailable }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [metricName, setmetricName] = React.useState(metricsAvailable);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setmetricName(
      typeof value === 'string' ? value.split(',') : value,
    );
    dispatch(getChosenMetrics(metricName));
  };
  useEffect(() => {
    dispatch(getMultiMeasurementsAction(metricName));
    dispatch(subscriptionAction());
  }, [metricName]);
  // const { data } = useSubscription(subsQuery);
  // console.log('SUIBS ', data);
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="selector-multiple-chip-label">Metrics</InputLabel>
        <Select
          labelId="selector-multiple-chip-label"
          id="metric-selector"
          multiple
          value={metricName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Metrics" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {metricsAvailable.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, metricName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default MetricSelector;

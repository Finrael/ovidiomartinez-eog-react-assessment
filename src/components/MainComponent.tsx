import React, { ChangeEvent } from 'react';
import NowWhat from './NowWhat';
import GraphicMain from './GraphicMain';

const MainComponent = () => {
  const [visualization, setVisualization] = React.useState('now_What');
  const visualizationManager = () => (visualization === 'now_What' ? <NowWhat /> : <GraphicMain />);
  const onChangeVisualization = (e:ChangeEvent<HTMLInputElement>) => {
    setVisualization(e.target.value);
  };
  return (
    <div className='mainComponent' onChange={onChangeVisualization}>
      <select>
        <option value='now_What'>Now What</option>
        <option value='graphic'>Graphic</option>
      </select>
      {visualizationManager()}
    </div>
  );
};
export default MainComponent;

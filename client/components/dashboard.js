import React from 'react'
import MyMap from './myMap'
import PvWatts from './pvWatts'
import UtilityUsage from './utilityUsage'
import ROI from './roi';
import Prospect from '../components/prospect';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ROI value={1456} />
        <Prospect {...this.props} />
        <PvWatts {...this.props.pvwatt}/>
        <UtilityUsage />
      </div>
    );
  }
}

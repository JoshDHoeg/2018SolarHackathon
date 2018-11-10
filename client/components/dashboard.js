import React from 'react'
import MyMap from './myMap'
import PvWatts from './pvWatts'
import UtilityUsage from './utilityUsage'
import ROI from './roi';
import Prospect from '../components/prospect';
import CircularIndeterminate from './loader'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.address != null) {
      if(this.props.ready) {
        return (
          <div>
            <ROI value={1200} />
            <Prospect {...this.props} />
            <UtilityUsage pvwatt={this.props.pvwatt} expenditure={this.props.expenditure} utilityRates={this.props.utilityRates}/>
          </div>
        );
      }
      else if(this.props.loading) {
        return (
        <CircularIndeterminate></CircularIndeterminate>
        );
      }
      else {
        return (<div></div>);
      }
    }
    else {
      return (<div></div>);
    }
  }
}

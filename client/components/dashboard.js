import React from 'react'
import MyMap from './myMap'
import PvWatts from './pvWatts'
import UtilityUsage from './utilityUsage'
import ROI from './roi';
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

            <p>Address: {this.props.address}</p>
            <p>Latitude: {this.props.lat}</p>
            <p>Longitude: {this.props.lon}</p>
            <p>ZipCode: {this.props.zip}</p>
            <p>State: {this.props.state}</p>
            <p>City: {this.props.city}</p>
            <PvWatts {...this.props.pvwatt}/>
            <UtilityUsage />
            <MyMap {...this.props}/>
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

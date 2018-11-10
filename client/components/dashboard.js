import React from 'react'
import MyMap from './myMap'
import PvWatts from './pvWatts'
import UtilityUsage from './utilityUsage'


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Address: {this.props.address}</p>
        <p>Latitude: {this.props.lat}</p>
        <p>Longitude: {this.props.lon}</p>
        <p>ZipCode: {this.props.zip}</p>
        <p>State: {this.props.state}</p>
        <p>City: {this.props.city}</p>
        <UtilityUsage pvwatt={this.props.pvwatt} expenditure={this.props.expenditure} utilityRates={this.props.utilityRates}/>
        <MyMap lat={this.props.lat} lon={this.props.lon}/>
      </div>
    );
  }
}

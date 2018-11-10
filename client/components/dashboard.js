import React from 'react'
import MyMap from './myMap'
import PvWatts from './pvWatts'


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Address: {this.props.address.address}</p>
        <p>Latitude: {this.props.address.lat}</p>
        <p>Longitude: {this.props.address.lng}</p>
        <p>ZipCode: {this.props.address.zip}</p>
        <p>State: {this.props.address.state}</p>
        <p>City: {this.props.address.city}</p>
        <PvWatts />
        <MyMap lat={this.props.lat} long={this.props.lng}/>
      </div>
    );
  }
}

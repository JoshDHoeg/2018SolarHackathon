import React from 'react'
import MyMap from './myMap'


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        console.log(this.props.address);
        <p>Address: {this.props.address.address}</p>
        <p>Latitude: {this.props.address.lat}</p>
        <p>Longitude: {this.props.address.lng}</p>
        <p>ZipCode: {this.props.address.zip}</p>
        <p>State: {this.props.address.state}</p>
        <p>City: {this.props.address.city}</p>
        <MyMap lat={this.props.lat} long={this.props.lng}/>
      </div>
    );
  }
}

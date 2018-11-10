import React from 'react'

export default class Prospect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.address);
    return (
      <div>
        <p>Address: {this.props.address.address}</p>
        <p>Latitude: {this.props.address.lat}</p>
        <p>Longitude: {this.props.address.lng}</p>
        <p>ZipCode: {this.props.address.zip}</p>
        <p>State: {this.props.address.state}</p>
        <p>City: {this.props.address.city}</p>
      </div>
    );
  }
}

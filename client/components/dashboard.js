import React from 'react'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.address);
    return (
      <div>
        <p>Address: {this.props.address}</p>
        <p>Latitude: {this.props.lat}</p>
        <p>Longitude: {this.props.lon}</p>
        <p>ZipCode: {this.props.zip}</p>
        <p>State: {this.props.state}</p>
        <p>City: {this.props.city}</p>
      </div>
    );
  }
}

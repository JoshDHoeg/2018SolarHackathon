import React from 'react'
import MyMap from './myMap'


export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <MyMap lat={this.props.lat} long={this.props.lng}/>
      </div>
    );
  }
}

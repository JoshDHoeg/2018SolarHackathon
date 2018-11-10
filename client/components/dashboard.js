import React from 'react'
import MyMap from './myMap'

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <MyMap/>
      </div>
    );
  }
}

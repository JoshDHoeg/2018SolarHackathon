import React from 'react'
import GoogleMapReact from 'google-map-react'

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {center:{}}
  }

  componentDidMount(){
    this.setState({center:{lat: this.props.lat, lng: this.props.lon}});
  }

  render() {
      let center = {lat: this.props.lat, lng: this.props.lon};
      return (
      <div className='google-map' style={{ height: '100vh', width: '80%' , margin: '10%'}}>
          <h1>Map {this.props.lat} {this.props.lon}</h1>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCnzBSpHacGXihBxlceazNT2dWoXRBz750'}}
              defaultCenter={ this.state.center }
              defaultZoom={ 11 }>
          </GoogleMapReact>
      </div>
      )
    }
};

import React from 'react'
import GoogleMapReact from 'google-map-react'

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.setState({center:{lat: this.props.lat, lng: this.props.lon}});
  }

  render() {
    if(this.props.lat != null) { 
      let center = {lat: this.props.lat, lng: this.props.lon};
      return (
        <div className='google-map' style={{ height: '100vh', width: '80%' , margin: '10%'}}>
            <h1>Map {this.props.lat} {this.props.lon}</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCnzBSpHacGXihBxlceazNT2dWoXRBz750'}}
                defaultCenter={ center }
                defaultZoom={ 11 }>
            </GoogleMapReact>
        </div>
      );
    }
    else {
        return (
            <div>
            </div>
        );
    }
  }
};

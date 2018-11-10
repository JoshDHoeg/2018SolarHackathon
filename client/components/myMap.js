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
        <div className='google-map' style={{ width: 400, height: 400, boxShadow: `0px 0px 20px grey`}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCnzBSpHacGXihBxlceazNT2dWoXRBz750'}}
                defaultCenter={ center }
                defaultZoom={ 12 }>
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

import React from 'react'
import GoogleMapReact from 'google-map-react'

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.setState({center:{lat: this.props.lat, lng: this.props.lon}});
  }

  renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: {lat: this.props.lat, lng: this.props.lon},
      map,
      title: 'Hello World!'
    });
  }

  render() {
    if(this.props.lat != null) { 
      let center = {lat: this.props.lat, lng: this.props.lon};
      return (
        <div className='google-map' style={{ width: 400, height: 400, boxShadow: `0px 0px 20px grey`}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: ''}}
                defaultCenter={ center }
                defaultZoom={ 12 }
                onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
            >
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

const Marker = props => {
  return <div className="SuperAwesomePin"></div>
}

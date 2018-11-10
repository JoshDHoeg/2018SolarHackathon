import React from 'react'
import GoogleMapReact from 'google-map-react'

export default class MyMap extends React.Component {

    center = {lat: this.props.lat, lng: this.props.lng};

    render() {
        return (
        <div className='google-map' style={{ height: '100vh', width: '80%' , margin: '10%'}}>
            <h1>Map {this.props.lat} {this.props.lng}</h1>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCnzBSpHacGXihBxlceazNT2dWoXRBz750'}}
                defaultCenter={ this.center }
                defaultZoom={ 11 }>
            </GoogleMapReact>
        </div>
        )
    }
};
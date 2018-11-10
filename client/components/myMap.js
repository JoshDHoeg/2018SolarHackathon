import React from 'react'

export default class MyMap extends React.Component {
    render() {
        return (
            <h1>{this.props.lat} {this.props.long}</h1>
        );
    }
};
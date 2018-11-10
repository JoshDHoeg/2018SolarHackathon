import React from 'react'

export default class PvWatts extends React.Component {

    render() {
        return (
        <div>
            <h1>PvWatts Data: {this.props.data}</h1>
        </div>
        );
    }
};
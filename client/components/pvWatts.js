import React from 'react'

export default class PvWatts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.ac_monthly != null) { 
            return (
                <div>
                    <h1>PvWatts Average Data For Your Area:</h1>
                    <p>Amount Produced Annually (MWH): {parseFloat(this.props.ac_annual) * 0.001}</p>
                    <p>Amount Produced In Peak Month (MWH): {parseFloat(this.props.ac_monthly.sort()[0]) * 0.001}</p>
                    <p>Amount Produced In Lowest Month (MWH): {parseFloat(this.props.ac_monthly.sort()[this.props.ac_monthly.length - 1]) * 0.001}</p>
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
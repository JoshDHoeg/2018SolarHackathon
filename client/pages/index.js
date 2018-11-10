import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Dashboard from '../components/dashboard'

import {GetGeocodeFromAddress} from '../lib/google';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {address: '', lat: '', lng: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData = async () => {
    const result = await GetGeocodeFromAddress(this.state.address)

    let location = result.data.results[0].geometry.location;
    this.setState({lat: location.lat, lng: location.lng});

    let address = result.data.results[0].address_components
    // console.log(address);
    for (let j = 0; j < address.length; j++) {
      if (address[j].types[0] == 'postal_code'){
        this.setState({zip: address[j].short_name});
        // console.log("Zip Code: " + this.state.zip);
      }
      else if (address[j].types[0] == 'locality'){
        this.setState({city: address[j].short_name});
        // console.log("City: " + this.state.city);
      }
      else if (address[j].types[0] == 'administrative_area_level_1'){
        this.setState({state: address[j].short_name});
        // console.log("State: " + this.state.state);
      }

      // console.log(this.state);
    }
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    this.loadData();
    event.preventDefault();
  }


  render() {
    return (
      <div>
        <Head title="Home" />
        <Nav />


        <header className="App-header" >
          <div className="App-header-info">
            <h1 className="App-title">Welcome to Daddy</h1>
            <p>Enter an address to find the cost of a solar plan</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input className="input-zip" type="text" value={this.state.address} onChange={this.handleChange} />
              </label>
              <input className="input-submit" type="submit" value="Submit" />
            </form>
          </div>
        </header>

        <Dashboard />

      </div>
    );
  }
}

import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Dashboard from '../components/dashboard'

import {GetGeocodeFromAddress} from '../lib/google';
import {GetExpendituresGHGBySector} from '../lib/nrel';

const styles = {
  errorText: {
    color: 'red'
  }
}

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {error: '', address: '', lat: '', lon: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData = async () => {
    if (this.state.address == '') {
      this.setState({error: 'Please enter a valid address'})
      return
    }

    let geocodeResult = null;
    try {
      geocodeResult = await GetGeocodeFromAddress(this.state.address);
    } catch (e) {
      this.setState({error: 'NREL servers are unavailable at the moment.'})
      return;
    }
    
    // (!) Looks like geocode always gives an address, so assume we found it! 
    
    let location = geocodeResult.data.results[0].geometry.location;
    this.setState({lat: location.lat, lon: location.lng});
    let addressComponents = geocodeResult.data.results[0].address_components

    // Parse Geocode
    if (addressComponents.length == 0) {
      this.setState({error: "We couldn't find that address!"})
      return
    }

    let zip = null;
    let city = null;
    let state = null;
    let expenditure = null;

    for (let j = 0; j < addressComponents.length; j++) {
      if (addressComponents[j].types[0] == 'postal_code'){
        zip = addressComponents[j].short_name;
      }
      else if (addressComponents[j].types[0] == 'locality'){
        city = addressComponents[j].short_name
      }
      else if (addressComponents[j].types[0] == 'administrative_area_level_1'){
        state = addressComponents[j].short_name
      }
    }

    // Get Expenditure data
    try {
      const {data: {errors, result}} = await GetExpendituresGHGBySector({zip, city, state_abbr: state})

      if (errors.length > 0) {
        this.setState({error: 'Error getting expenditure data.'})
        return;
      }

      expenditure = result;
    } catch (e) {
      this.setState({error: 'Expenditure data is not available.'})
      return;
    }
    

    this.setState({
      zip, city, state, expenditure
    })
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    this.loadData();
    event.preventDefault();
  }


  render() {
    const {error, zip, address, city, state, expenditure} = this.state;
    
    return (
      <div>
        <Head title="Home" />
        <Nav />


        <header className="App-header" >
          <div className="App-header-info">

            <h1 className="App-title">Welcome to Daddy</h1>
            <p>Enter an address to find the cost of a solar plan</p>

            {(error && error != '') ? <p style={styles.errorText}>{error}</p> : null}

            <form onSubmit={this.handleSubmit}>
              <label>
                <input className="input-zip" type="text" value={this.state.address} onChange={this.handleChange} />
              </label>
              <input className="input-submit" type="submit" value="Submit" />
            </form>
          </div>
        </header>

        <Dashboard {...this.state}/>

      </div>
    );
  }
}

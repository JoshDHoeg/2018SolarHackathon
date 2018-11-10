import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Dashboard from '../components/dashboard'

import {GetGeocodeFromAddress} from '../lib/google';
import {GetExpendituresGHGBySector, GetPVWatts} from '../lib/nrel';

const styles = {
  errorText: {
    color: 'red'
  }
}

export default class Home extends React.Component {

  state= {
    error: '', 
    ready: false, 
    address: null, 
    lat: null, 
    lon: null,
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData = async () => {
    // Set ready to false when starting a new load
    this.setState({ready: false})

    let zip = null;
    let city = null;
    let state = null;
    let expenditure = null;
    let lat = null;
    let lon = null;
    let pvwatt = null

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
    
    // Get latitude and longitude
    let location = geocodeResult.data.results[0].geometry.location;
    lat = location.lat;
    lon = location.lng;
    
    let addressComponents = geocodeResult.data.results[0].address_components

    // If no results for address, we probably hit an error
    if (addressComponents.length == 0) {
      this.setState({error: "We couldn't find that address!"})
      return
    }

    // Parse out components of address
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

    console.log("LAT: ", lat)
    console.log("LON: ", lon)

    // Get PVWatts Data
    try {
      const {data} = await GetPVWatts({
        lat, 
        lon, 
        system_capacity: 40, 
        module_type: 0, // standard, 
        losses: 0, 
        array_type: 0, // fixed open rack 
        tilt: 45, 
        azimuth: 45, 
      })

      if (data.errors.length > 0) {
        this.setState({error: 'No PV Watt data available for this address.'});
        return;
      }

      pvwatt = data.outputs;
    } catch (e) {
      this.setState({error: 'Error fetching PV Watt data.'});
      return;
    }
    
    // Update state with loaded data
    // Set ready to true once all the data is loaded
    this.setState({
      zip, city, state, expenditure,
      lat, lon, 
      pvwatt,
      ready: true
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

import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Dashboard from '../components/dashboard'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {GetGeocodeFromAddress} from '../lib/google';
import {GetExpendituresGHGBySector, GetPVWatts, GetUtilityRates} from '../lib/nrel';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  errorText: {
    color: 'red'
  },
  searchFormGrid: {
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 70
  },
  textField: {
    marginLeft: 0,
    marginRight: 0,
    width: '100%'
  },
  submitButton: {
    width: '100%'
  },
})

class Home extends React.Component {

  state= {
    error: '', 
    ready: false,
    loading: false,
    address: null, 
    lat: null, 
    lon: null 
  };

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData = async () => {
    // Set ready to false when loading new data
    this.setState({ready: false});
    this.setState({loading: true});

    let zip = null;
    let city = null;
    let state = null;
    let lat = null;
    let lon = null;
    let pvwatt = null;
    let expenditure = null;
    let utilityRates = null;

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

    // Get Utility Rates
    try {
      const {data: {errors, outputs}} = await GetUtilityRates({
        lat,
        lon,
        radius: 10
      })
      
      if (errors.length > 0) {
        this.setState({error: 'Error getting utility rate data.'})
        return;
      }

      utilityRates = outputs;
    } catch(e) {
      this.setState({error: 'Error fetching Utility Rate data.'});
      return;
    }

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
    // Set ready to true and loading to false once data is loaded
    this.setState({
      zip, 
      city, 
      state, 
      expenditure,
      lat, 
      lon, 
      pvwatt,
      utilityRates,
      ready: true,
      loading: false
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit (event) {
    this.loadData();
    event.preventDefault();
  }


  render() {
    const {error, zip, address, city, state, expenditure} = this.state;
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Head title="Home" />
        <Nav />

        <p>{error}</p>

        <Grid container spacing={12} direction="row" className={classes.searchFormGrid}>
          <Grid item xs={3} className={classes.searchFormGrid}></Grid>

          <Grid item xs={6} className={classes.searchFormGrid}>

              <TextField
                id="outlined-name"
                label="Enter an Address"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('address')}
                margin="normal"
                variant="outlined"
              />

              {(error && error != '') ? <p style={classes.errorText}>{error}</p> : null}

              <Button variant="contained" color="primary" onClick={this.loadData} className={classes.submitButton}>
                Search
              </Button>

          </Grid>
        </Grid>

        <Dashboard {...this.state}/>

      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home)
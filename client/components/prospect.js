import React from 'react'
import PropTypes from 'prop-types';

import MyMap from '../components/myMap';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  infoGridContainer: {
    alignContent: 'center'
  }
});

class Prospect extends React.Component {
  render() {
    const {lat, lon, classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} direction="row" className={classes.searchFormGrid}>
        
          <Grid item xs={1} />

          <Grid item xs={5} className={classes.searchFormGrid}>
            <MyMap {...{lat, lon}}/>
          </Grid>

          <Grid item xs={1} />

          <Grid item xs={5} className={classes.searchFormGrid}>
            <Grid container spacing={16} direction="column" className={classes.infoGridContainer}>
            <Typography className={classes.greenText} component="h2" variant="h6" gutterBottom>
                <p>Address: {this.props.address}</p>
                <p>Latitude: {this.props.lat}</p>
                <p>Longitude: {this.props.lon}</p>
                <p>ZipCode: {this.props.zip}</p>
                <p>State: {this.props.state}</p>
                <p>City: {this.props.city}</p>
                </Typography>
            </Grid>
          </Grid>
        </Grid>

        
      </div>
    );
  }
}

Prospect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Prospect);

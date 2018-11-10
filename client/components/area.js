import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BarChart from 'react-d3-components/lib/BarChart';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    textAlign: 'center',
    alignItems: 'center'
  },
});

class ROI extends React.Component {
  render() {
    const {classes, name, avg, cost, costPer} = this.props;

    var data = [{
      label: name,
      values: [{x: 'Average', y: avg}, {x: 'Cost', y: cost}, {x: 'Cost Per', y: costPer}]
    }];

    return (
      <Grid item xs={6} className={classes.searchFormGrid}>
        <Paper className={classes.root} elevation={1}>
          <Typography className={classes.greenText} component="h1" variant="h4" gutterBottom>
            <p>{name}</p>
          </Typography>
          <BarChart
            data={data}
            width={400}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
        </Paper>
      </Grid>
    );
  }
}

ROI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ROI);
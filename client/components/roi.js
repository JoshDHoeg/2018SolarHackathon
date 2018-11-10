import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    // width: '100%',
  },
  gridContainer: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  greenText: {
    color: '#2ecc71'
  }
});

class ROI extends React.Component {
  render() {
    const { classes, value } = this.props;
      return (
      <div className={classes.root}>
        <Grid container spacing={12} direction="column" className={classes.gridContainer}>
            <Grid item xs={12}>
              <Typography className={classes.greenText} component="h2" variant="h6" gutterBottom>
                Return on Investment
              </Typography>
              <Typography className={classes.greenText} component="h2" variant="h1" gutterBottom>
                ${value}
              </Typography>
            </Grid>
          </Grid>
      </div>
      );
  }
}

ROI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ROI);
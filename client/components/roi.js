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
    textAlign: 'center',
    padding: '24px'
  },
  gridItem: {
    padding: '24px'
  },
  greenText: {
    color: '#2ecc71'
  }
});

class ROI extends React.Component {
  render() {
    const { classes, ready, value } = this.props;

    return (
        <Grid className={classes.gridItem} item xs={12} lg={4}>
          <Typography className={classes.greenText} component="h2" variant="h6" gutterBottom>
            {this.props.roiText}
          </Typography>
          <Typography className={classes.greenText} component="h2" variant="h1" gutterBottom>
            ${value}
          </Typography>
        </Grid>
    );
  }
}

ROI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ROI);
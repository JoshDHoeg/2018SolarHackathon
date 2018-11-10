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
    color: '#2e42cc'
  }
});

class PROD extends React.Component {
  render() {
    const { classes, ready, value, text } = this.props;

    // // Don't show anything if
    // if (value == null) {
    //   return null
    // }
    // if (!ready) {
    //   // TODO - show loading screen
    // }

    return (
        <Grid container spacing={16} xs={12} lg={4} direction="column" className={classes.gridContainer}>
            <Grid item xs={12}>
              <Typography className={classes.greenText} component="h2" variant="h6" gutterBottom>
                {text}
              </Typography>
              <Typography className={classes.greenText} component="h2" variant="h1" gutterBottom>
                {value}
              </Typography>
            </Grid>
          </Grid>
    );
  }
}

PROD.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PROD);

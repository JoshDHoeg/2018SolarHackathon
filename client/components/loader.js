import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {   
    marginLeft: '47.5%',
    marginRight: 'auto',
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} color="primary" />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
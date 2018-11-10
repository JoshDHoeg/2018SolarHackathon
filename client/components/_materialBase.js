import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {

  },
});

class ROI extends React.Component {
  render() {
      return (
      <div>
          <h1>PvWatts Data: {this.props.data}</h1>
      </div>
      );
  }
}

ROI.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ROI);
import React from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    cursor: 'pointer',
    width: 100
  }
};

const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = (props) => {

  const { classes } = props;

  return (
  <div className={classes.root}>
        <AppBar 
          position="static"
          title={<img src="/static/logo.png"/>}
        >
          <Toolbar>
            <img src="/static/logo.png" width={200}/>

            
              <div className={classes.grow}>
                  
              </div>

              <Button onClick={() => {window.location='https://github.com/JoshDHoeg/2018SolarHackathon'}}color="inherit">GitHub</Button>
            
          </Toolbar>
        </AppBar>
      </div>
  )
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav)

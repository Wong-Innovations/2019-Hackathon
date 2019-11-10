import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/SheetLearnLogo.png"
            width="200px"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Tooltip title="Share Us On Facebook!" aria-label="Share Us On Facebook!">
            <a href="https://facebook.com" style={{color: "white"}}>
              <FontAwesomeIcon size="2x" icon={faFacebook} style={{marginLeft:"20px"}} />
            </a>
          </Tooltip>
          <Tooltip title="Share Us On Twitter!" aria-label="Share Us On Twitter!">
            <a href="https://twitter.com" style={{color: "white"}}>
              <FontAwesomeIcon size="2x" icon={faTwitter} style={{marginLeft:"20px"}} />
            </a>
          </Tooltip>
          <Tooltip title="Share Us On Insta!" aria-label="Share Us On Insta!">
            <a href="https://insta.com" style={{color: "white"}}>
              <FontAwesomeIcon size="2x" icon={faInstagram} style={{marginLeft:"20px"}} />
            </a>
          </Tooltip>
          <Tooltip title="Star Us On GitHub!" aria-label="Star Us On GitHub!">
            <a href="https://github.com/Wong-Innovations/2019-Hackathon" style={{color: "white"}}>
              <FontAwesomeIcon size="2x" icon={faGithub} style={{marginLeft:"20px"}} />
            </a>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;

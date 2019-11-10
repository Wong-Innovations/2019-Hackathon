import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';


import { Profile, SidebarNav, UpgradePlan } from './components';

// Icons 
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  flex: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Learn',
      href: '/learn',
      icon: <MusicNoteIcon />
    },
    {
      title: 'Stats',
      href: '/stats',
      icon: <InsertChartIcon />
    },
    {
      title: 'Help',
      href: '/help',
      icon: <HelpIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    },
    {
      title: 'About',
      href: '/about',
      icon: <InfoIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        {/* <Profile /> 
        <Divider className={classes.divider} /> */}
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        <div className={classes.flex}/>
        <UpgradePlan className={classes.nav} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;

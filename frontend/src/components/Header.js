import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// Icons 
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import SidebarNav from './SidebarNav/SidebarNav';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    nav: {
        marginBottom: theme.spacing(2)
      }
}));

export default function Header() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const pages = [
        {
          title: 'Dashboard',
          href: '/dashboard',
          icon: <MusicNoteIcon />
        },
        {
          title: 'Users',
          href: '/users',
          icon: <InsertChartIcon />
        },
        {
          title: 'Products',
          href: '/products',
          icon: <HelpIcon />
        },
        {
          title: 'Authentication',
          href: '/sign-in',
          icon: <SettingsIcon />
        },
        {
          title: 'Typography',
          href: '/typography',
          icon: <InfoIcon />
        }
      ];
    

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Piano Learning
          </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}</Drawer>
        </div>
    );
}
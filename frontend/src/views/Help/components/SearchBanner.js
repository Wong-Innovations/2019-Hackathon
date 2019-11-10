import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { faFacebook, faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    img: {
        width: '100%',
        // filter: 'blur(5px)'

    },
    inside: {
        position: 'absolute',
        top: 10
    },
    container: {
        position: 'relative',
        textAlign: 'center',
        color: 'white'
    },
    centered: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

export default function ProfileCard(props) {
    const classes = useStyles();


    return (
        <div className={classes.container}>
            <img src="https://images.unsplash.com/photo-1547631785-dada59885aab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" className={classes.img} alt="piano" />
            <div className={classes.centered}>
                <h1>We are here to help.</h1>
                <h5>Contact us at <a href="mailto:Suppot@SheetLearn.com">Support@SheetLearn.com</a></h5>
            </div>

        </div>
    );
}
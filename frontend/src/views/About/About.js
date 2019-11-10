import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';

import ProfileCard from './components'

//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    firstBox: {
        margin: 'auto',
        width: '80%',
        textAlign: "center",
        marginTop: 40,
        marginBottom: 40
    },
    secondBox: {
        margin: 'auto',
        width: '80%',
        textAlign: "center",
        marginTop: 40,
        marginBottom: 40
    },
    actions: {
        justifyContent: 'flex-end'
    },
    profileBox: {
        display: 'inline'
    },
    fullWidth: {
        width: '100%'
    }
}));


function About() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.firstBox}>
                <h1>
                    We are a small team of programers, designers, and musicians participating in a Hackathon.
                </h1>
                <h4>
                    We want to improve our skills and help others learn sheet music
                </h4>
            </div>
            <Divider />
            <div className={classes.secondBox}>
                <h1>Our Team</h1>
                <div className={classes.fullWidth}>
                    <div className={classes.profileBox}><ProfileCard /></div>
                    <div className={classes.profileBox}><ProfileCard /></div>
                    <div className={classes.profileBox}><ProfileCard /></div>
                
                </div>
            </div>
            <div className={classes.secondBox}>
                <h1>Join Us</h1>
                <h4>
                    We always need talent. Reach us at <a href="mailto:Hello@SheetLearn.com">Hello@SheetLearn.com</a>
                </h4>

            </div>
        </div>
    );
}

export default About;
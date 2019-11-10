import React from 'react';

import '../../App.css';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import SheetMusicDisplay from './components/SheetMusicDisplay';
import PianoComponent from './components/Piano';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    spacing: {
        height: 40
  }}));


function Learn() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.spacing}></div>
            <SheetMusicDisplay />
            <PianoComponent />
        </div>
    );
}

export default Learn;
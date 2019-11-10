import React, { useState } from 'react';

import '../../App.css';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as WebMidi from "webmidi";
import SheetMusicDisplay from './components/SheetMusicDisplay';
import PianoComponent from './components/Piano';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    spacing: {
        height: 40
  }}));


function Learn() {
    const [midiPresent, setMidiPresent] = useState(false);

    WebMidi.enable(function (err) {

        if (err) {
            console.log("WebMidi could not be enabled.", err);
        } else {
            if (WebMidi.inputs.length !== 0) {
                setMidiPresent(true);
            }
            console.log(WebMidi.inputs);
            console.log(WebMidi.outputs);
        }
        
    });
    const classes = useStyles();
    return (
        <div>
            <div className={classes.spacing}></div>
            <SheetMusicDisplay />
            <PianoComponent midiPresent={midiPresent} />
        </div>
    );
}

export default Learn;
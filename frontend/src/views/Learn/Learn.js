import React, { useState } from 'react';

import '../../App.css';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as WebMidi from "webmidi";
import SheetMusicDisplay from './components/SheetMusicDisplay';
import PianoComponent from './components/Piano';
import { makeStyles } from '@material-ui/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(() => ({
    spacing: {
        height: 40
  }}));


function Learn(props) {
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
            <SheetMusicDisplay location={props.location}/>
            <PianoComponent midiPresent={midiPresent} />
            <Fab variant="primary" aria-label="play" style={{position: "fixed", bottom: "20px", right: "20px"}}>
                <SvgIcon>
                    <path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/>
                </SvgIcon>
            </Fab>
        </div>
    );
}

export default Learn;
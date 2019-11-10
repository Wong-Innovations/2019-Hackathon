import React, { useState } from 'react';

import '../../App.css';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import * as WebMidi from "webmidi";
import SheetMusicDisplay from './components/SheetMusicDisplay';
import PianoComponent from './components/Piano';


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
    return (
        <div>
            <SheetMusicDisplay />
            <PianoComponent midiPresent={midiPresent} />
        </div>
    );
}

export default Learn;
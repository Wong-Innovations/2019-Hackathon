import React from 'react';

import '../../App.css';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import SheetMusicDisplay from './components/SheetMusicDisplay';
import PianoComponent from './components/Piano';


function Learn() {
    return (
        <div>
            <SheetMusicDisplay />
            <PianoComponent />
        </div>
    );
}

export default Learn;
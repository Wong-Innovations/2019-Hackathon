import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
//import 'react-piano/dist/styles.css';

const useStyles = makeStyles(theme => ({
    center: {
        margin: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function PianoComponent() {
    const classes = useStyles();
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('f5');
    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
        <Piano
            className={classes.center}
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber) => {
                // Play a given note - see notes below
            }}
            stopNote={(midiNumber) => {
                // Stop playing a given note - see notes below
            }}
            width={1000}
            keyboardShortcuts={keyboardShortcuts}
        />

    );
}
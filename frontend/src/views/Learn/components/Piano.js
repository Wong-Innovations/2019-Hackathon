import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
//import 'react-piano/dist/styles.css';
// import * as WebMidi from "webmidi";
import MIDISounds from 'midi-sounds-react';
const Iterator = require("musicxml-iterator");

const styles = (theme => ({
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

class PianoComponent extends Component {
	constructor(props) {
		super(props);
		this.midiNotes=[];
		this.state = {
			selectedInstrument: 4,
			status:'?',
			file: "music/MuzioClementi_SonatinaOpus36No1_Part2.xml"
		};
		this.firstNote = MidiNumbers.fromNote('a3');
		this.lastNote = MidiNumbers.fromNote('c6');
		this.keyboardShortcuts = KeyboardShortcuts.create({
				firstNote: this.firstNote,
				lastNote: this.lastNote,
				keyboardConfig: KeyboardShortcuts.HOME_ROW,
		});
		const urlParams = new URLSearchParams(window.location.search);
		const sheet = urlParams.get('sheetname');
		if (sheet) {
				this.state = { ...this.state , file: `music/${sheet}.xml`};
		}
		fetch(this.state.file)
			.then((r) => r.text())
			.then(text  => {
				this.i = Iterator(text);;
			})
	}
	componentDidMount() {
		this.envelopes=[];				
		this.startListening();
	}
	onSelectInstrument(e){
		var list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");
		this.setState({
			selectedInstrument: n
		});
		this.midiSounds.cacheInstrument(n);
	}
	keyDown(n,v){
		this.keyUp(n);
		var volume=1;
		if(v){
			volume=v;
		}
		this.envelopes[n]=this.midiSounds.player.queueWaveTable(this.midiSounds.audioContext
			, this.midiSounds.equalizer.input
			, window[this.midiSounds.player.loader.instrumentInfo(this.state.selectedInstrument).variable]
			, 0, n, 9999,volume);
		this.setState(this.state);
	}
	keyUp(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				this.envelopes[n].cancel();
				this.envelopes[n]=null;
				this.setState(this.state);
			}
		}
	}
	pressed(n){
		if(this.envelopes){
			if(this.envelopes[n]){
				return true;
			}
		}
		return false;
	}
	midiOnMIDImessage(event){
		var data = event.data;
		// var cmd = data[0] >> 4;
		// var channel = data[0] & 0xf;
		var type = data[0] & 0xf0;
		var pitch = data[1];
		var velocity = data[2];
		switch (type) {
		case 144:
			this.keyDown(pitch, velocity/127);
			break;
		case 128:
			this.keyUp(pitch);
            break;
        default:
            break;
		}
	}
	onMIDIOnStateChange(event) {
		this.setState({status:event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state});
	}
	requestMIDIAccessSuccess(midi){
		console.log(midi);
		var inputs = midi.inputs.values();
		for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
			input.value.onmidimessage = this.midiOnMIDImessage.bind(this);
		}
		midi.onstatechange = this.onMIDIOnStateChange.bind(this);
	}
	requestMIDIAccessFailure(e){
		console.log('requestMIDIAccessFailure', e);
		this.setState({status:'MIDI Access Failure'});
	}
	startListening(){
		this.setState({status:'waiting'});
		if (navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then(this.requestMIDIAccessSuccess.bind(this), this.requestMIDIAccessFailure.bind(this));
		} else {
			this.setState({status:'navigator.requestMIDIAccess undefined'});
		}
	}
  render() {
    const { classes } = this.props;
    return (
        <div>
            <Piano
                className={classes.center}
                noteRange={{ first: this.firstNote, last: this.lastNote }}
                playNote={(midiNumber) => {
									this.keyDown(midiNumber);
                }}
                stopNote={(midiNumber) => {
									this.keyUp(midiNumber);
                }}
                width={1000}
                keyboardShortcuts={this.keyboardShortcuts}
            />
            <div style={{display: "none"}}>
                <MIDISounds 
                    ref={(ref) => (this.midiSounds = ref)}
                    appElementName="root"
                    instruments={[this.state.selectedInstrument]}
                />
            </div>
        </div>
    );
  }
};

export default withStyles(styles)(PianoComponent); 
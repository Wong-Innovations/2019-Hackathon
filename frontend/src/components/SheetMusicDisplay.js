import React, { Component } from 'react';
import OpenSheetMusicDisplay from '../lib/OpenSheetMusicDisplay'


class SheetMusicDisplay extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { file: "MuzioClementi_SonatinaOpus36No1_Part2.xml" };
    }

    handleClick(event) {
        const file = event.target.value;
        this.setState(state => state.file = file);
    }

    render() {
        return (
            <div>
                <select onChange={this.handleClick.bind(this)}>
                    <option value="MuzioClementi_SonatinaOpus36No1_Part2.xml">Muzio Clementi: Sonatina Opus 36 No1 Part2</option>
                    <option value="Beethoven_AnDieFerneGeliebte.xml">Beethoven: An Die FerneGeliebte</option>
                </select>
                <OpenSheetMusicDisplay file={this.state.file} />
            </div>
        );
    }
}

export default SheetMusicDisplay;

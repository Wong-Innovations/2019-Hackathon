import React, { Component } from 'react';
import OpenSheetMusicDisplay from '../../../lib/OpenSheetMusicDisplay'

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
                <OpenSheetMusicDisplay file={this.state.file} />
            </div>
        );
    }
}

export default SheetMusicDisplay;

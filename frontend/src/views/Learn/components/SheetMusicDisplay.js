import React, { Component } from 'react';
import OpenSheetMusicDisplay from '../../../lib/OpenSheetMusicDisplay';

class SheetMusicDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {file: "music/MuzioClementi_SonatinaOpus36No1_Part2.xml"};

        const urlParams = new URLSearchParams(window.location.search);
        const sheet = urlParams.get('sheetname');
        if (sheet) {
            this.state = {file: `music/${sheet}.xml`};
        }
    }

    handleClick(event) {
        const file = event.target.value;
        this.setState(state => state.file = file);
    }

    render() {
        return (
            <div style={{height: "450px", overflow: "hidden"}}>
                <OpenSheetMusicDisplay file={this.state.file} />
            </div>
        );
    }
}

export default SheetMusicDisplay;

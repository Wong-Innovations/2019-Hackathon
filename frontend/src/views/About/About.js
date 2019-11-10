import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import ProfileCard from './components'

//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    firstBox: {
        margin: 'auto',
        width: '80%',
        textAlign: "center",
        marginTop: 40,
        marginBottom: 40
    },
    secondBox: {
        margin: 'auto',
        width: '80%',
        textAlign: "center",
        marginTop: 40,
        marginBottom: 40
    },
    actions: {
        justifyContent: 'flex-end'
    },
    fullWidth: {
        width: '100%',
    }
}));


var state = {
    persons: [
        {name: "Cameron Cobb", title: "UI/UX Developer", src: "https://avatars1.githubusercontent.com/u/7494908?s=460&v=4"},
        {name: "Dylan Wong", title: "Backend Developer", src: "https://avatars0.githubusercontent.com/u/47100551?s=460&v=4"},
        {name: "Gage Christensen", title: "ML Specialist", src: "https://i.kinja-img.com/gawker-media/image/upload/s--PV1kbdsL--/c_scale,f_auto,fl_progressive,q_80,w_800/sv7xsk8eqglhkjug3erd.jpg"},
    ]
}

function About() {
    const classes = useStyles();

    const persons = (
        <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    > 

          {state.persons.map((person, index) => { // this acts as a loop
            return <ProfileCard 
            
            name={person.name}
            title={person.title}
            src={person.src}/>
            
        })}
       </Grid>
        )




    return (
        <div>
            <div className={classes.firstBox}>
                <h1>
                    We are a small team of programers, designers, and musicians participating in a Hackathon.
                </h1>
                <h4>
                    We want to improve our skills and help others learn sheet music
                </h4>
            </div>
            <Divider />
            <div className={classes.secondBox}>
                <h1>Our Team</h1>
                <div className={classes.fullWidth}>
                   
                    {persons}
              


                </div>
            </div>
            <div className={classes.secondBox}>
                <h1>Join Us</h1>
                <h4>
                    We always need talent. Reach us at <a href="mailto:Hello@SheetLearn.com">Hello@SheetLearn.com</a>
                </h4>

            </div>
        </div>
    );
}

export default About;
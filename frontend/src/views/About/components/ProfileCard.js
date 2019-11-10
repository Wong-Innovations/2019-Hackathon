import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { faFacebook, faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,

  },
});

export default function ProfileCard(props) {
  const classes = useStyles();


  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          image={props.src}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Follow Me On GitHub!" aria-label="Star Us On GitHub!">
          <a href="https://github.com/Wong-Innovations/2019-Hackathon" style={{ color: "black" }}>
            <FontAwesomeIcon size="2x" icon={faGithub} style={{ marginLeft: "20px" }} />
          </a>
        </Tooltip>
        <Tooltip title="Find Me On Facebook!" aria-label="Star Us On GitHub!">
          <a href="https://github.com/Wong-Innovations/2019-Hackathon" style={{ color: "black" }}>
            <FontAwesomeIcon size="2x" icon={faFacebook} style={{ marginLeft: "20px" }} />
          </a>
        </Tooltip>
        <Tooltip title="Follow My Twitter!" aria-label="Star Us On GitHub!">
          <a href="https://github.com/Wong-Innovations/2019-Hackathon" style={{ color: "black" }}>
            <FontAwesomeIcon size="2x" icon={faTwitter} style={{ marginLeft: "20px" }} />
          </a>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
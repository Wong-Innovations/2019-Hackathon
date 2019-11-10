import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, colors } from '@material-ui/core';

import MusicNoteIcon from '@material-ui/icons/MusicNote';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[50]
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 2)
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const UpgradePlan = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.media}>
        <img
          src="TrebleClef.png"
        />
      </div>
      <div className={classes.content}>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
        >
          Upgrade to PRO
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to SheetLearn PRO to accelerate your music career
        </Typography>
      </div>
      <div className={classes.actions}>
        <Button
          color="primary"
          component="a"
          href="#"
          variant="contained"
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string
};

export default UpgradePlan;

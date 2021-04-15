import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const userData = {
  avatar: '/static/images/avatars/avatar_5.png',
  city: 'Mumbai',
  country: 'India',
  jobTitle: 'Senior Web Developer',
  name: 'Shashikant Sharma',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  const {firstName, lastName} = user;
  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={userData.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${userData.city} ${userData.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${userData.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};


export default Profile;

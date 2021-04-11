import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const BookmarkCard = ({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        {/* <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="Product"
            src={data.media}
            variant="square"
          />
        </Box> */}
        <Typography align="left" color="textPrimary" gutterBottom variant="h4">
          <Link href="#">#{data.ticketID}</Link>
        </Typography>
        <Typography align="left" color="textPrimary" gutterBottom variant="h4">
          <Link href="#" color="inherit">
            {data.ticketTitle}
          </Link>
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          {data.ticketDesc}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography color="textSecondary" display="inline" variant="body2">
              {data.tickeStatus}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

BookmarkCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default BookmarkCard;

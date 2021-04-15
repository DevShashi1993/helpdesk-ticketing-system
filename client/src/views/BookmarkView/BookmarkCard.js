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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  }
}));

const BookmarkCard = ({ className, data, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box className={clsx(classes.cardTitle)}>
          <Typography
            align="left"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            <Link href="#">#{data.ticketID}</Link>
          </Typography>
          <IconButton aria-label="close" title="Remove Bookmark">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography align="left" color="textPrimary" gutterBottom variant="h4">
          <Link href="#" color="inherit">
            {data.ticketTitle}
          </Link>
        </Typography>
        {/* <br/>
        <Typography align="left" color="textPrimary" variant="body2">
          {data.ticketDesc}
        </Typography> */}
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

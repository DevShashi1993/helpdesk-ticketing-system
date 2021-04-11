import React, { useState, useMemo } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Toolbar from './Toolbar';
import BookmarkCard from './BookmarkCard';
import data from './data';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  bookmarkCard: {
    height: '100%'
  }
}));

const BookmarkView = () => {
  const classes = useStyles();

  const bookmarkArrData = useMemo(() => data, []);

  return (
    <Container  className={classes.root} maxWidth={false}>
      <Toolbar />
      <Box mt={3}>
        <Grid container spacing={3}>
          {bookmarkArrData.map(eachBookmark => (
            <Grid item key={eachBookmark.id} lg={4} md={6} xs={12}>
              <BookmarkCard className={classes.bookmarkCard} data={eachBookmark} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination color="primary" count={3} size="small" />
      </Box>
    </Container>
  );
};

export default BookmarkView;

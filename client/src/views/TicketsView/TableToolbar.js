import React from 'react';
import CreateTicketModal from './CreateTicketModal';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobalFilter from './GlobalFilter';
import IconButton from '@material-ui/core/IconButton';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        }
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    deleteUserHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <CreateTicketModal className={classes.title} />

      {numSelected > 0 ? (
        <>
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteUserHandler}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}
    </Toolbar>
  );
};

export default TableToolbar;

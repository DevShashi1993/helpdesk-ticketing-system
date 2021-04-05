import React, {useEffect, useState, useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable';
import TicketModal from './TicketModal';
import { getAllTickets } from '../../../store/actions/ticketActions';

const Tickets = () => {
  const dispatch = useDispatch();
  
  const { ticketData } = useSelector(state => state.ticketState);
  console.log("ticketData => ", ticketData);
  
  const [tableData, setTableData] = useState([]);
  const [skipPageReset, setSkipPageReset] = useState(false)

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  const handleClickOpen = () => {
    setTicketModalOpen(true);
  };

  const handleClose = () => {
    setTicketModalOpen(false);
  };

  const openTicket = (id) => {
    handleClickOpen();
    console.log("openTicket called with id =>", id);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ticketID',
        Cell: (e) => <a href="#" onClick={() => openTicket(e.value)}> {e.value} </a>
      },
      {
        Header: 'Title',
        accessor: 'ticketTitle',
      },
      {
        Header: 'Type',
        accessor: 'tickeType',
        
      },
      {
        Header: 'Priority',
        accessor: 'tickePriority',
        
      },
      {
        Header: 'Due Date',
        accessor: 'tickeDueDate',
        
      },
      {
        Header: 'Status',
        accessor: 'tickeStatus',
        
      },
    ],
    []
  );

  
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setTableData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }


  return (
    <Card>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={tableData}
        setData={setTableData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <TicketModal handleClickOpen={handleClickOpen} handleClose={handleClose} ticketModalOpen={ticketModalOpen}/>
    </Card>
  )
}

export default Tickets

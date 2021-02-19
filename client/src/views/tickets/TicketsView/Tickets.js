import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { useTable } from 'react-table'

import data from './data.json';


function createData(tid, ttitle, tstatus, tpriority, tassignedby) {
  return { tid, ttitle, tstatus, tpriority, tassignedby };
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function Tickets() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'All Tickets',
        columns: [
          {
            Header: 'ID',
            accessor: 'ticketID',
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
      },
    ],
    []
  );

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  )
}

export default Tickets;
import { Button, LinearProgress, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import { useQuery } from "react-query";
import { OrdersApiService } from "../../../services/orders-api.service";

const TableDataComponent = () => {
  const columnsName = [
    {
      id: '_id',
      name: 'Id',
    },
    {
      id: 'customerId',
      name: 'CustomerId'
    },
    {
      id: 'totalPrice',
      name: 'Total Price'
    },
    {
      id: 'createdDate',
      name: 'Created Date'
    },
    {
      id: 'status',
      name: 'Status'
    },
    {
      id: 'action',
      name: 'Action'
    }
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { isLoading, data } = useQuery('get-orders-list', () => {
    return OrdersApiService.getAll();
  });

  if (isLoading) {
    return <LinearProgress></LinearProgress>;
  }

  const listOrders = data?.data;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsName.map((item) => (
                <TableCell key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!listOrders && listOrders.length < 1)
              ? <TableRow>
                <TableCell colSpan={columnsName.length} align='center'>No data</TableCell>
              </TableRow>
              : (rowsPerPage > 0
                ? listOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : listOrders).map((item: any) => {
                  const createDate = new Date(item.createdAt);
                  return (<TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.customerId}</TableCell>
                    <TableCell>{item.totalPrice}</TableCell>
                    <TableCell>{createDate.toLocaleString()}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {(item.status === 'CREATED' || item.status === 'CONFIRMED')
                        ? <Button onClick={() => OrdersApiService.cancelOrders(item._id)}>Cancel</Button>
                        : null}
                      <Button onClick={() => OrdersApiService.deleteOrders(item._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>);
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={listOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableDataComponent;
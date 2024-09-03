import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CustomPagination from "../TablePagination/TablePagination";
import { convertFuel } from "../../utility/utilityFunctions";
import moment from "moment";

export default function OverBalanceTable({ Data, Search }) {
  console.log(Data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can adjust the number of rows per page as needed

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (val) => {
    setRowsPerPage(parseInt(val, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "center",
                }}
              >
                Station Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "center",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "center",
                }}
              >
                Over Balance
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  textAlign: "center",
                }}
              >
                Fuel Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data &&
              Data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row, i) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {console.log(row)}
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBlockWidth: 0,
                    }}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {row.stationName}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {row.date
                      ? moment(new Date(row.date)).format("hh:mm:ss A")
                      : "-"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {row.wasteFuel}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {convertFuel(row.fuelType)
                      ? convertFuel(row.fuelType)
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={
          Data?.filter((dt) => {
            const searchLowerCase = Search.toLowerCase();
            if (Search === "") return dt;
            else {
              if (dt.stationName.toLowerCase().startsWith(searchLowerCase)) {
                return dt;
              }
            }
          }).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        RowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

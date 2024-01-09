import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { BiEdit } from "react-icons/bi";

export default function UserTable({
  setUserID,
  setOpen,
  Filter,
  Search,
  UserData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Edit
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Username
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Authority and Privileges
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Role
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UserData.data
              .filter((data) => {
                const CurrentRole =
                  Filter === "Administrator"
                    ? 0
                    : Filter === "Order Manager"
                    ? 2
                    : Filter === "Station Manager"
                    ? 3
                    : Filter === "Driver"
                    ? 4
                    : 1;
                if (Filter !== "All") {
                  return CurrentRole === data.role;
                } else {
                  return data;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((Data, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
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
                      <div className="flex justify-center items-center">
                        <BiEdit
                          className="text-[1.2rem] cursor-pointer "
                          onClick={() => {
                            setUserID(i + page * rowsPerPage);
                            setOpen(true);
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.privilage === 1
                        ? "Order Manager"
                        : Data.privilage ===0
                        ? "Sales Manager"
                        : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.phone_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.role === 0
                        ? "Administrator"
                        : Data.role === 1
                        ? "Company Admin"
                        : Data.role === 2
                        ? "Order Manager"
                        : Data.role === 3
                        ? "Station Manager"
                        : "Driver"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={UserData.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

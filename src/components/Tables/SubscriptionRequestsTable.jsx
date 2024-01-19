import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { CompaniesInfoColumns } from "../../assets/Columns/CompaniesInfoColumns";
import GreenRedSwitch from "../Switch/GreenRedSwitch";
import { SubscriptionRequestsColumns } from "../../assets/Columns/SubscriptionRequestsColumns";
import CustomPagination from "../TablePagination/TablePagination";

export default function SubscriptionRequestsTable({ Data, Search }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
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
              {SubscriptionRequestsColumns.map((ci) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div className="text-[14px] pt-[8px] pb-[5px]  maxWeb1:pb-[6px] maxWeb1:pt-[20px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                      {ci.title}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              // .filter((dt) => {
              //   const searchLowerCase = Search.toLowerCase();
              //   if (Search === "") return dt;
              //   else {
              //     if (
              //       dt.stationName.toLowerCase().startsWith(searchLowerCase)
              //     ) {
              //       return dt;
              //     }
              //   }
              // })
              .map((row, i) => (
                <TableRow
                  key={row.name}
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
<<<<<<< Updated upstream
                    {row.companyId?.name}
=======
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {row.name}
                    </div>
>>>>>>> Stashed changes
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
<<<<<<< Updated upstream
                    {row.subscriptionType == 1 ? "Enterprise" : "Basic"}
=======
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {row.sub_type}
                    </div>
>>>>>>> Stashed changes
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
<<<<<<< Updated upstream
                    {row.companyId?.allowedStations}
=======
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {row.no_of_stations}
                    </div>
>>>>>>> Stashed changes
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
<<<<<<< Updated upstream
                    {row.requests || 1}
=======
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {row.requests_no}
                    </div>
>>>>>>> Stashed changes
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
<<<<<<< Updated upstream
                    {row.productId?.amount}
=======
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {row.price}
                    </div>
>>>>>>> Stashed changes
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                      width: "200px",
                    }}
                    align="center"
                  >
                    <div
<<<<<<< Updated upstream
                      className={`py-[6px] rounded-full text-white font-[Quicksand] ${
                        row.active == null
=======
                      className={`maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-center py-[6px] rounded-full text-white font-[Quicksand] ${
                        row.status === "Accept"
>>>>>>> Stashed changes
                          ? "bg-[#FAAF3A]"
                          : row.active
                          ? "bg-[#2EB100]"
                          : !row.active
                          ? "bg-[#C93D33]"
                          : ""
                      }`}
                    >
                      {row.active == null ? "Accept/Reject": row.active ? "Accepted": "Rejected"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={Data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        RowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Data } from "./DemoData/Orders";
import { AiFillEye } from "react-icons/ai";
import { OngoingOrdersColumns } from "../../assets/Columns/OngoingOrdersColumns";

export default function OngoingOrdersTable({
  Filter,
  setCurrentID,
  setOpen,
  Search,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
          <TableRow>
            {OngoingOrdersColumns.map((column) => {
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
                  {column.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.filter((dt) => {
            const searchLowerCase = Search.toLowerCase();
            if (Filter === "") {
              if (Search === "") return dt;
              else {
                if (dt.stationName.toLowerCase().startsWith(searchLowerCase)) {
                  return dt;
                }
              }
            } else if (Filter !== "") {
              if (Filter === dt.status) {
                if (Search === "") return dt;
                else {
                  if (dt.stationName.startsWith(searchLowerCase)) {
                    return dt;
                  }
                }
              }
            }
          }).map((row, i) => (
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
                {row.orderNumber}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                {row.reservationDate}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                {row.receiptNumber}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
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
                {row.paidAmount}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                {row.driverName}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                {row.deliveryDateTime}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                <div
                  className={`${
                    row.status === "Ordered"
                      ? "bg-[#5CD2E6]"
                      : row.status === "En Route"
                      ? "bg-[#F4E869]"
                      : "bg-[#2EB100]"
                  } py-1 px-2 rounded-full text-white font-bold cursor-pointer`}
                >
                  {row.status}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                  fontSize: "20px",
                }}
                align="center"
              >
                <span className="flex justify-center items-center">
                  <AiFillEye
                    className="cursor-pointer text-[#76808B] hover:text-black transition-all duration-500 ease-in-out"
                    onClick={() => {
                      console.log(i);
                      setOpen(true);
                      setCurrentID(i);
                    }}
                  />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

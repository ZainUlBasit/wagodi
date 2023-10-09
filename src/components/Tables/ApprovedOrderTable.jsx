import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Data } from "./DemoData/Orders";
import { AiFillEye } from "react-icons/ai";

export default function ApprovedOrderTable({ Data }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Required Date and Time
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Gas Type
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              UOM
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Balance Volume
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Require Volume
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Issued Volume
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Received Volume
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Delivered Date and Time
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize:"13px"
              }}
            >
              Deliver Time
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            // key={i}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBlockWidth: 0,
              }}
            //   component="th"
              scope="row"
              align="center"
            >
              {Data.RequiredDateAndTime}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.GasType}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.UOM}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.BalanceVolume}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.RequireVolume}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.IssuedVolume}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.ReceivedVolume}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.DeliveredDatendTime}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 0,
              }}
              align="center"
            >
              {Data.DeliverTime}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

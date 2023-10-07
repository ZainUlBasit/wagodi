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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "black" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}>
              Order Number
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Reservation Date
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Receipt number
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Station Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Paid Amount
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Driver Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Delivery Date And Time
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              Status
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontFamily: "Quicksand" }}
              align="center"
            >
              View
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                <div className="bg-[#5CD2E6] py-1 px-2 rounded-full text-white font-bold">
                  {row.status}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  fontSize:"20px",
                //   color:"#76808B"
                }}
                align="center"
              >
                <AiFillEye className="cursor-pointer text-[#76808B] hover:text-black transition-all duration-500 ease-in-out" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

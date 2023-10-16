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
import { UserData } from "./DemoData/UserData";
import { BiEdit } from "react-icons/bi";
import { StationData } from "./DemoData/StationData";

export default function StatisticsTopTable({ StationInfo }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead
          style={{
            backgroundColor: "#56636F",
            border: "0px solid black",
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderBottomLeftRadius: "15px",
                borderWidth: 0,
              }}
              align="center"
            >
              Number of Station
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              Number of Drivers
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              Monthly Sales (L)
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
                border: "0px solid white",
                borderBottomRightRadius: "15px",

              }}
              align="center"
            >
              Monthly Orders (L)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop:"30px",
                paddingBottom:"30px",
                borderRight: "2px solid #46546266",
              }}
              align="center"
            >
              20
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop:"30px",
                paddingBottom:"30px",
                borderRight: "2px solid #46546266",
              }}
              align="center"
            >
              6
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop:"30px",
                paddingBottom:"30px",
                borderRight: "2px solid #46546266",
              }}
              align="center"
            >
              120,000
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop:"30px",
                paddingBottom:"30px",
              }}
              align="center"
            >
              20,000
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

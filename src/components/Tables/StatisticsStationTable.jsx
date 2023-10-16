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
import { StationStatisticsData } from "./DemoData/StationStatisticsData";
import "../../assets/Style/style.css"

export default function StatisticsStationTable({setCurrentID,setOpen}) {
  return (
    <TableContainer component={Paper} className="fade-in">
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "25px",
                paddingBottom: "12px",
              }}
              align="center"
            >
              Station Number
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "25px",
                paddingBottom: "12px",
              }}
              align="center"
            >
              Station Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "25px",
                paddingBottom: "12px",
              }}
              align="center"
            >
              Money Earned
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "25px",
                paddingBottom: "12px",
              }}
              align="center"
            >
              Money Spent
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "25px",
                paddingBottom: "12px",
              }}
              align="center"
            >
              Address
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {StationStatisticsData.map((row, i) => (
            <TableRow
              key={i}
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
                {row.StationNumber}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                <div className="flex items-center justify-center gap-x-2">
                  {row.StationName}
                  <AiFillEye
                    className="cursor-pointer text-[#76808B] text-[1.2rem] hover:text-black transition-all duration-500 ease-in-out"
                    onClick={() => {
                      console.log(i);
                      setOpen(true);
                      setCurrentID(i);
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
                {row.MoneyEarned}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                {row.MoneySpent}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                {row.Address}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

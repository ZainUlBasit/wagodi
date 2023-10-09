import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Data } from "./DemoData/Orders";
import { AiOutlineClockCircle } from "react-icons/ai";
import { NotificationData } from "./DemoData/NotificationData";

export default function NotificationTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow
            // key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBlockWidth: 0,
                padding: 0,
              }}
              component="th"
              scope="row"
              align="center"
            >
              {""}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 2,
                padding: 0,
              }}
              align="left"
            >
              {""}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBottomWidth: 2,
                padding: 0,
              }}
              align="center"
            >
              {""}
            </TableCell>
          </TableRow>
          {NotificationData.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBlockWidth: 0,
                  paddingLeft: 0,
                  paddingRight: 2,
                }}
                component="th"
                scope="row"
                align="left"
              >
                <div className="flex flex-col">
                  <span className="font-[700] text-[26px]">
                    {row.date.split(" ")[0]}
                  </span>
                  <span className="font-[600] text-[.8rem]">
                    {row.date.split(" ")[1]}
                  </span>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 2,
                  fontSize: "24px",
                }}
                align="left"
              >
                {row.description}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 2,
                }}
                align="center"
              >
                <div className="flex justify-center items-center gap-x-1 text-[#A5A5A5]">
                  <AiOutlineClockCircle className="text-[1.2rem]" />
                  <span className="font-[700]">{row.time}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

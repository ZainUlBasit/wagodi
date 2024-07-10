import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StationStatisticsTopData } from "./DemoData/StationStatisticsTopData";
import "./StationStatisticTopTable.css";
import moment from "moment";

export default function StationStatisticTopTable({ Data }) {
  return (
    <TableContainer
      component={Paper}
      className="hike"
      sx={{
        borderWidth: 0,
      }}
      style={{ position: "relative", zIndex: 1 }}
    >
      <Table aria-label="simple table">
        <TableHead
          sx={{
            borderWidth: 0,
            backgroundColor: "#576370",
            position: "sticky",
            right: 0,
            top: 0,
          }}
        >
          <TableRow>
            {[
              { title: "Station Name" },
              { title: "Start" },
              { title: "End" },
              { title: "Sales Amount" },
            ].map((dt, i) => {
              return (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Quicksand",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#576370",
                    zIndex: 2,
                    borderBottom: 0,
                    ...(i === 0 && { borderBottomLeftRadius: 10 }),
                    ...(i === 3 && { borderBottomRightRadius: 10 }),
                  }}
                  align="center"
                >
                  <div
                    className={`text-[14px] pt-[2px] pb-[2px] maxWeb1:pt-[2px] maxWeb1:pb-[6px] maxWeb1:text-[18px] maxWeb2:text-[20px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[6px] maxWeb3:pt-[6px] maxWeb4:pt-[6px] maxWeb2:pb-[6px] maxWeb3:pb-[6px] maxWeb4:pb-[6px] text-white`}
                  >
                    {dt.title}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row, i) => (
            <TableRow key={i}>
              <TableCell
                sx={{
                  fontWeight: 400,
                  padding: 1,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                  borderRight: 1,
                }}
                align="center"
              >
                <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                  {"Test Station"}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  padding: 1,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                  borderRight: 1,
                }}
                align="center"
              >
                <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                  {moment(new Date()).format("DD/MM/YY hh:mm A")}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  padding: 1,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                  borderRight: 1,
                }}
                align="center"
              >
                <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                  {moment(new Date()).format("DD/MM/YY hh:mm A")}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 400,
                  padding: 1,
                  fontFamily: "Quicksand",
                  borderBottomWidth: 0,
                }}
                align="center"
              >
                <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                  2000
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

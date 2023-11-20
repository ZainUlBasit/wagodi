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
import "../../assets/Style/style.css";
import { StationStatisticsTopData } from "./DemoData/StationStatisticsTopData";
import "./StationStatisticTopTable.css";

export default function StationStatisticTopTable() {
  return (
    <TableContainer
      component={Paper}
      className="custom-table-container fade-in"
      sx={{
        borderWidth: 0,
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      }}
      style={{ borderTopLeftRadius: "0px", position: "relative", zIndex: 1 }}
    >
      <Table aria-label="simple table">
        <TableHead
          sx={{
            borderWidth: 0,
            backgroundColor: "#576370",
            position: "sticky",
            top: 0,
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                borderWidth: 0,
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "5px",
                paddingBottom: "5px",
                color: "#fff",

                borderBottomLeftRadius: 10,
              }}
              align="center"
            >
              <div className="font-[Quicksand]">No</div>
            </TableCell>
            <TableCell
              sx={{
                borderWidth: 0,
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "5px",
                paddingBottom: "5px",
                color: "#fff",
              }}
              align="center"
            >
              <div className="font-[Quicksand]">Station Name</div>
            </TableCell>
            <TableCell
              sx={{
                borderWidth: 0,
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "5px",
                paddingBottom: "5px",
                color: "#fff",
              }}
              align="center"
            >
              <div className="font-[Quicksand]">Sales Volume</div>
            </TableCell>
            <TableCell
              sx={{
                borderWidth: 0,
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "5px",
                paddingBottom: "5px",
                color: "#fff",

                borderBottomRightRadius: 10,
              }}
              align="center"
            >
              <div className="font-[Quicksand]">Sales amount</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {StationStatisticsTopData.map((row, i) => (
            <TableRow key={i}>
              <TableCell
                sx={{
                  fontWeight: 400,
                  padding: 1,
                  fontFamily: "Quicksand",
                  borderBlockWidth: 0,
                  borderRight: 1,
                }}
                // component="th"
                scope="row"
                align="center"
              >
                {i + 1}
                {/* {row.no} */}
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
                {row.StationName}
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
                {row.SalesVolume}
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
                {row.SalesAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
import "./DriverDetailTable.css";
import moment from "moment";
export default function DriverDetailTable({ DriverData }) {
  console.log(DriverData);
  return (
    <TableContainer component={Paper} className="custom-table-container">
      <Table aria-label="simple table">
        <TableHead
          style={{
            backgroundColor: "#56636F",
            border: "0px solid black",
            position: "sticky",
            top: 0,
          }}
        >
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "35px",
                paddingBottom: "35px",
                color: "white",
                borderBottomLeftRadius: "15px",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1rem]">Date</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "35px",
                paddingBottom: "35px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1rem]">From</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "35px",
                paddingBottom: "35px",
                paddingLeft: "0px",
                paddingRight: "0px",
                color: "white",
                borderWidth: 0,
              }}
              align="center"
            >
              <div className="max767:text-[1rem]">To</div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.4rem",
                fontFamily: "Quicksand",
                paddingTop: "35px",
                paddingBottom: "35px",
                color: "white",
                border: "0px solid white",
                borderBottomRightRadius: "15px",
              }}
              align="center"
            >
              <div className="max767:text-[1rem]">Fuel Delivered</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DriverData.map((dd) => {
            return (
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    borderRight: "2px solid #46546266",
                    borderBottom: "2px solid #46546266",
                  }}
                  align="center"
                >
                  <div className="flex flex-col font-[Quicksand]">
                    <div className="text-[1.8rem] max767:text-[1.2rem]">
                      {moment(new Date(dd.date)).format("DD")}
                    </div>
                    <div className="text-[1rem] max767:text-[1rem]">
                      {moment(new Date(dd.date)).format("MMM")}
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    borderRight: "2px solid #46546266",
                    borderBottom: "2px solid #46546266",
                  }}
                  align="center"
                >
                  <div className="text-[1.6rem] max767:text-[1.2rem]">
                    {dd.from.name}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    borderRight: "2px solid #46546266",
                    borderBottom: "2px solid #46546266",
                  }}
                  align="center"
                >
                  <div className="text-[1.6rem] max767:text-[1.2rem]">
                    {dd.stations[0].name}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "1.6rem",
                    fontFamily: "Quicksand",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    borderBottom: "2px solid #46546266",
                  }}
                  align="center"
                >
                  <div className="text-[1.6rem] max767:text-[1.2rem]">
                    {dd.fuelDelivered}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

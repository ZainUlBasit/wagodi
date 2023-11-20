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
import { DriverStatisticsData } from "./DemoData/DriverStatisticsData";
import "../../assets/Style/style.css";
import { useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import SendReport from "../Modals/SendReport";

export default function StatisticsDriverTable({ setCurrentID, setOpen }) {
  const [CurrentMonth, setCurrentMonth] = useState("All");
  const [CurrentMonthIndex, setCurrentMonthIndex] = useState("");
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const Options = [
    "Cancelled Orders",
    "Number of trips",
    "Average time to deliver",
    "All",
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div className="w-full flex justify-end py-[6px] px-4 border-b-[1px] border-b-[#465462] flex-wrap">
        <div className="px-4 py-[6px] border-2 border-white rounded-full cursor-pointer bg-[#465462] text-white">
          <div className="flex items-center">
            <input
              type="text"
              name="date"
              id="date"
              placeholder="All"
              value={CurrentMonth}
              className="w-[220px] max767:text-[1rem] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-[#465462]"
              disabled
            />
            <BiSolidChevronDown
              className="text-[1.5rem] cursor-pointer"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
          </div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: "25px", // Add rounded corners
              backgroundColor: "white", // Set background color to white
              width: "fit", // Set the width as needed
              overflow: "hidden", // Hide overflowing content
              marginTop: "10px",
              boxShadow: "none",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography
            sx={{
              pt: 2,
              pl: 4,
              pr: 5,
              pb: 5,
              borderColor: "#465462",
              backgroundColor: "#465462",
              // width: "400px",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                {Options.map((opt, i) => {
                  return (
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => {
                        handleClose();
                        setCurrentMonth(opt);
                        setCurrentMonthIndex(i);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={CurrentMonth === opt}
                      />
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Typography>
        </Popover>
        <button
          className={`border-2 border-[##90898E] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white transition-all duration-500 ease-in-out`}
          onClick={() => setOpenSendReport(!OpenSendReport)}
        >
          Send Report
        </button>
      </div>
      <TableContainer component={Paper} className="fade-in">
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                align="center"
              >
                View
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                align="center"
              >
                User Number
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                align="center"
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                align="center"
              >
                Gender
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                }}
                align="center"
              >
                Trips Completed
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DriverStatisticsData.map((row, i) => (
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
                  <div className="flex justify-center items-center">
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
                  {row.UserNumber}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.Email}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.Description}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.Gender}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.TripsCompleted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
    </div>
  );
}

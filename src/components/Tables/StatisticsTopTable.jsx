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
            {[
              { title: "Number of Station" },
              { title: "Number of Drivers" },
              { title: "Monthly Sales (L)" },
              { title: "Monthly Orders (L)" },
            ].map((data) => {
              return (
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
                  <div className="text-[14px] pt-[20px] pb-[5px] maxWeb1:pt-[20px] maxWeb1:pb-[6px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[30px] maxWeb3:pt-[40px] maxWeb4:pt-[40px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                    {data.title}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
                borderRight: "2px solid #46546266",
              }}
              align="center"
            >
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                20
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
              }}
              align="center"
            >
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                6
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
              }}
              align="center"
            >
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                120,000
              </div>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "600",
                fontSize: "1.6rem",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
              align="center"
            >
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                20,000
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

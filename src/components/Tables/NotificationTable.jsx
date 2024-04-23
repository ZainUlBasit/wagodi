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
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

export default function NotificationTable({ Data }) {
  const [CurrentNotification, setCurrentNotification] = useState([]);
  useEffect(() => {
    const newData = Data?.notification || Data;
    setCurrentNotification(
      newData?.map((df) => {
        return {
          ...df,
          createdAt: new Date(df.createdAt * 1000),
        };
      })
    );
  }, [Data]);

  console.log(Data);

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
                paddingLeft: 3,
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
          {CurrentNotification?.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* {console.log(row)} */}
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
                <div className="flex flex-col justify-center items-center max767:pl-2">
                  <span className="font-[700] text-[26px] max767:text-[1.3rem]">
                    {moment(row.createdAt).format("DD")}
                  </span>
                  <span className="font-[600] text-[.8rem]">
                    {moment(row.createdAt).format("MMM")}
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
                <span className="max767:text-[1.2rem] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                  {row.description || row.orderDescription}
                </span>
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
                  <span className="font-[700] max767:text-[.8rem]">
                    {moment(row.createdAt).format("hh:mm A")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

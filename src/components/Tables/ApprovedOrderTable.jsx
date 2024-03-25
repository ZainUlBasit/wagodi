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
import { convertFuel } from "../../utility/utilityFunctions";
import moment from "moment";

export default function ApprovedOrderTable({ Data, Filter }) {
  // if()
  // console.log(Filter);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
          <TableRow>
            {[
              "Required Date and Time",
              "Gas Type",
              "UOM",
              "Balance Volume",
              "Require Volume",
              "Issued Volume",
              "Received Volume",
              "Delivered Date and Time",
              "Deliver Time",
            ].map((dt) => {
              return (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Quicksand",
                    fontSize: "13px",
                  }}
                >
                  <div className="text-[14px] pt-[15px] pb-[0px] maxWeb1:pt-[45px] maxWeb1:pb-[6px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[70px] maxWeb3:pt-[90px] maxWeb4:pt-[90px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                    {dt}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            // key={i}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              sx={{
                fontWeight: 400,
                fontFamily: "Quicksand",
                borderBlockWidth: 0,
              }}
              //   component="th"
              scope="row"
              align="center"
            >
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data?.createdAt
                  ? moment(new Date(Data.createdAt * 1000)).format(
                      "DD/MM/YYYY h:mm A"
                    )
                  : "not specified"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {convertFuel(Data?.fuel_type)}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data.UOM || "Liters"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data?.station.value || "not specified"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data?.station?.required_volume || "not specified"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data.fuel_value || "not specified"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data.fuel_recieved || "not specified"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data?.station?.deliveryTime
                  ? new Date(Data.station?.deliveryTime * 1000).toLocaleString()
                  : "not specified"}
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
              <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                {Data?.station?.deliveryTime
                  ? `${(
                      (Data.station?.deliveryTime - Data.createdAt) /
                      3600
                    ).toPrecision(2)} hr`
                  : "not specified"}
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

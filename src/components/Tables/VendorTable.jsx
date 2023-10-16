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
import { VendorData } from "./DemoData/VendorData";

export default function VendorTable({ setVendorID, setOpen, Search }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize: "14px",
              }}
              align="center"
            >
              Edit
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize: "14px",
              }}
              align="center"
            >
              Vendor Name
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize: "14px",
              }}
              align="center"
            >
              Fuel Type
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                paddingTop: "30px",
                paddingBottom: "5px",
                fontSize: "14px",
              }}
              align="center"
            >
              Location
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {VendorData.filter((data) => {
            if (Search === "") return data;
            else if (
              data.VendorName.toLowerCase().startsWith(Search.toLowerCase())
            ) {
              return data;
            }
          }).map((Data, i) => {
            return (
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
                  <div className="flex justify-center items-center">
                    <BiEdit
                      className="text-[1.2rem] cursor-pointer "
                      onClick={() => {
                        setVendorID(i);
                        setOpen(true);
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
                  {Data.VendorName}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  <div className="flex gap-x-5 justify-center">
                    <div>{Data.FuelType[0]}</div>
                    <div>{Data.FuelType[1]}</div>
                    <div>{Data.FuelType[2]}</div>
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
                  {Data.Location}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

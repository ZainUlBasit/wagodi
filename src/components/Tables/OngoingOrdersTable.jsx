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
import { OngoingOrdersColumns } from "../../assets/Columns/OngoingOrdersColumns";
import { convertStatus } from "../../utility/utilityFunctions";


export default function OngoingOrdersTable({
  Filter,
  setCurrentID,
  setOpen,
  Search,
  data: Data,
}) {
  console.log(Data);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
          <TableRow>
            {OngoingOrdersColumns.map((column) => {
              return (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Quicksand",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    textAlign: "center",
                  }}
                >
                  {column.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.filter((dt) => {
            const searchLowerCase = Search.toLowerCase();
            if (Filter === "All") {
              if (Search === "") return dt;
              else {
                if (
                  dt?.station?.id?.name
                    ?.toLowerCase()
                    ?.startsWith(searchLowerCase)
                ) {
                  return dt;
                }
              }
            }
            if (convertStatus(dt.station.status) == Filter) {
              if (Search === "") return dt;
              else {
                if (dt?.station?.id?.name.startsWith(searchLowerCase)) {
                  return dt;
                }
              }
            }
            return null;
          })
            .filter(Boolean)
            .map((row, i) => (
              <TableRow
                key={`${row?._id}-${row?.station.id._id}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
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
                  {row._id ? row._id : "none"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {new Date(row.createdAt * 1000).toDateString()}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.reciept_number ? row.reciept_number : "none"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row?.station?.id?.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row?.fuel_price}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.driverId?.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row?.station?.deliveryTime
                    ? new Date(row?.station?.deliveryTime * 1000).toDateString()
                    : row.arrival_date
                    ? new Date(row.arrival_date * 1000).toDateString()
                    : row.expected_arrival
                    ? new Date(row.expected_arrival * 1000).toDateString()
                    : "Not specified"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  <div
                    className={`${
                      row.station.status == 0
                        ? "bg-[#5CD2E6]"
                        : row.station.status == 1
                        ? "bg-[#F4E869]"
                        : "bg-[#2EB100]"
                    } py-1 px-2 rounded-full text-white font-bold cursor-pointer`}
                  >
                    {convertStatus(row.station.status) || "none"}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                    fontSize: "20px",
                  }}
                  align="center"
                >
                  <span className="flex justify-center items-center">
                    <AiFillEye
                      className="cursor-pointer text-[#76808B] hover:text-black transition-all duration-500 ease-in-out"
                      onClick={() => {
                        setOpen(true);
                        setCurrentID(i);
                      }}
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

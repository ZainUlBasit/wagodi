import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import moment from "moment";

function createData(name, start, end, amount, protein) {
  return { name, start, end, amount, protein };
}
const rows = [
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
  createData(
    "abc",
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    moment(new Date()).format("DD/MM/YY hh:mm A"),
    2000
  ),
];

function sum(column) {
  return rows.reduce((acc, row) => acc + row[column], 0);
}

export default function StationSaleDetailsTable() {
  return (
    <div>
      <Sheet sx={{ height: 400, overflow: "auto" }}>
        <Table
          aria-label="table with sticky header"
          stickyHeader
          //   stickyFooter
          //   stripe="odd"
          hoverRow
        >
          <thead className="h-[70px] text-center">
            <tr style={{ backgroundColor: "#576370" }}>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                }}
              >
                Station Name
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                }}
              >
                Start
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                }}
              >
                End
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                }}
              >
                Sales Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td style={{ textAlign: "center" }}>{row.name}</td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.start}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.end}
                </td>
                <td style={{ textAlign: "center" }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}

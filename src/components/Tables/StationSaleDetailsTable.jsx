import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import moment from "moment";

export default function StationSaleDetailsTable({ Rows }) {
  console.log(Rows);
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
            {Rows.map((row) => (
              <tr>
                <td style={{ textAlign: "center" }}>{row.stationName}</td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.start}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.end}
                </td>
                <td style={{ textAlign: "center" }}>{row.salesAmount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}

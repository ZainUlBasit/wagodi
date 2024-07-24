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
                Liters
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                }}
              >
                Fuel Type
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
                  {moment(new Date(row.start)).format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {moment(new Date(row.end)).format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.fuel_value}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.fuel_type === 0
                    ? "91"
                    : row.fuel_type === 1
                    ? "95"
                    : row.fuel_type === 2
                    ? "D"
                    : "-"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {Number(row.salesAmount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}

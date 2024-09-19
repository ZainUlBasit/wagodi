import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function StationSaleDetailsTable({ Rows }) {
  const [t, i18n] = useTranslation("global");

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
                  width: "120px",
                }}
              >
                {t("StationSalesColumns.StationName")}
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                  width: "150px",
                }}
              >
                {t("StationSalesColumns.StationManager")}
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                  width: "90px",
                }}
              >
                {t("StationSalesColumns.Start")}
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                  width: "90px",
                }}
              >
                {t("StationSalesColumns.End")}
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                  width: "80px",
                }}
              >
                {t("StationSalesColumns.Liters")}
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                  width: "90px",
                }}
              >
                {t("StationSalesColumns.FuelType")}
              </th>
              <th
                style={{
                  color: "white",
                  backgroundColor: "#576370",
                  paddingBottom: "20px",
                  textAlign: "center",
                  width: "120px",
                }}
              >
                {t("StationSalesColumns.SalesAmount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {Rows.map((row) => (
              <tr>
                <td style={{ textAlign: "center" }}>{row.stationName}</td>
                <td style={{ textAlign: "center" }}>{row.managerName}</td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.start
                    ? moment(new Date(row.start * 1000)).format("hh:mm A")
                    : "--:-- --"}
                </td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  {row.end
                    ? moment(new Date(row.end * 1000)).format("hh:mm A")
                    : "--:-- --"}
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

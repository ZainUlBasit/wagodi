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
import { StationStatisticsData } from "./DemoData/StationStatisticsData";
import "../../assets/Style/style.css";
import SendReport from "../Modals/SendReport";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function StatisticsStationTable({
  setCurrentID,
  setOpen,
  Data,
}) {
  const [t, i18n] = useTranslation("global");
  const [OpenSendReport, setOpenSendReport] = useState(false);
  return (
    <div>
      <div className="w-full flex justify-end py-[6px] px-4 border-b-[1px] border-b-[#465462]">
        <button
          className={`relative text-center tracking-[1px] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white no-underline text-#465462 cursor-pointer transition-all ease-in-out duration-500  border-2 border-solid border-[#90898E] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] hover:border-[#465462] active:scale-90 flex items-center gap-x-2 justify-center`}
          onClick={() => setOpenSendReport(!OpenSendReport)}
        >
          {t("SendReport")}
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
                {t("StationsColumns.StationNumber")}
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
                {t("StationsColumns.StationName")}
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
                {t("StationsColumns.MoneyEarned")}
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
                {t("StationsColumns.MoneySpent")}
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
                {t("StationsColumns.Address")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((row, i) => (
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
                  {row?.stationNumber ? row.stationNumber : "-"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    {row.stationName ? row.stationName : "-"}
                    {/* <AiFillEye
                      className="cursor-pointer text-[#76808B] text-[1.2rem] hover:text-black transition-all duration-500 ease-in-out"
                      onClick={() => {
                        console.log(i);
                        setOpen(true);
                        setCurrentID(i);
                      }}
                    /> */}
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
                  {row.totalEarnings}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.totalSpent}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {row.stationAddress || "not specified"}
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

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { CompaniesInfoColumns } from "../../assets/Columns/CompaniesInfoColumns";
import GreenRedSwitch from "../Switch/GreenRedSwitch";
import {
  ControlSubscribersColumns,
  SubscriptionRequestsColumns,
} from "../../assets/Columns/SubscriptionRequestsColumns";
import CustomPagination from "../TablePagination/TablePagination";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import EditDuration from "../Modals/EditDuration";
import EditStationLimit from "../Modals/EditStationLimit";
import { TiEdit } from "react-icons/ti";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function ControlSubscribersTable({ Data, Search, UpdateData }) {
  const [t, i18n] = useTranslation("global");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (val) => {
    setRowsPerPage(parseInt(val, 10));
    setPage(0);
  };

  const [OpenDurationModal, setOpenDurationModal] = useState(false);
  const [OpenStationLimitModal, setOpenStationLimitModal] = useState(false);
  const [CurrentCompanyId, setCurrentCompanyId] = useState("");
  const [CurrerntDuration, setCurrerntDuration] = useState("");
  const [CurrentLimit, setCurrentLimit] = useState("");

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {ControlSubscribersColumns.map((ci) => {
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
                    <div className="text-[14px] pt-[8px] pb-[5px]  maxWeb1:pb-[6px] maxWeb1:pt-[20px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                      {t(`SubscriptionInfo.${ci.title}`)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              // .filter((dt) => {
              //   const searchLowerCase = Search.toLowerCase();
              //   if (Search === "") return dt;
              //   else {
              //     if (
              //       dt.stationName.toLowerCase().startsWith(searchLowerCase)
              //     ) {
              //       return dt;
              //     }
              //   }
              // })
              .map((row, i) => (
                <TableRow
                  key={row._id}
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
                    <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                      {row.name}
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
                    {row?.stations.length}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <div className="flex gap-x-2 items-center justify-center">
                      {moment(new Date(row.duration * 1000)).format(
                        "DD/MM/YYYY"
                      ) || 0}
                      <TiEdit
                        className="text-xl hover:text-green-600 cursor-pointer transition-all ease-in-out duration-500"
                        onClick={() => {
                          setOpenDurationModal(true);
                          setCurrentCompanyId(row._id);
                          setCurrerntDuration(row.duration);
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
                    <div className="flex gap-x-2 items-center justify-center">
                      {row.no_station || 0}
                      <TiEdit
                        className="text-xl hover:text-green-600 cursor-pointer transition-all ease-in-out duration-500"
                        onClick={() => {
                          setOpenStationLimitModal(true);
                          setCurrentCompanyId(row._id);
                          setCurrentLimit(row.no_station);
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={Data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        RowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {OpenDurationModal && (
        <EditDuration
          UpdateData={UpdateData}
          CompanyId={CurrentCompanyId}
          Open={OpenDurationModal}
          setOpen={setOpenDurationModal}
          CurrentDuration={CurrerntDuration}
        />
      )}
      {OpenStationLimitModal && (
        <EditStationLimit
          CompanyId={CurrentCompanyId}
          Open={OpenStationLimitModal}
          setOpen={setOpenStationLimitModal}
          CurrentLimit={CurrentLimit}
        />
      )}
    </>
  );
}

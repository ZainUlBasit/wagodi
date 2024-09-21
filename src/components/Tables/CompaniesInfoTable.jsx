import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CompaniesInfoColumns } from "../../assets/Columns/CompaniesInfoColumns";
import GreenRedSwitch from "../Switch/GreenRedSwitch";
import CustomPagination from "../TablePagination/TablePagination";
import { FaEye } from "react-icons/fa";
import SubcriptionAcceptOrReject from "../Modals/SubcriptionAcceptOrReject";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompany } from "../../store/Slices/AllCompanySlice";
import { useTranslation } from "react-i18next";

export default function CompaniesInfoTable({ Data, Search }) {
  const [t, i18n] = useTranslation("global");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (val) => {
    console.log(val);
    setRowsPerPage(parseInt(val, 10));
    setPage(0);
  };

  const [OpenViewModal, setOpenViewModal] = useState(false);

  const [CurrentCompanyId, setCurrentCompanyId] = useState("");

  const dispatch = useDispatch();

  const AllCompanyState = useSelector((state) => state.AllCompany);

  useEffect(() => {
    dispatch(fetchAllCompany({ enterprise: true }));
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {CompaniesInfoColumns.map((ci, i) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      textAlign: "center",
                    }}
                    key={`${i}`}
                  >
                    <div className="text-[14px] pt-[8px] pb-[5px]  maxWeb1:pb-[6px] maxWeb1:pt-[20px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                      {t(`CompanyInfoColumns.${ci.title}`)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              // .filter((dt) => {
              //   const searchLowerCase = Search.toLowerCase();
              //   if (Search === "") return dt;
              //   else {Wx
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
                    <FaEye
                      className="text-[#465462] flex items-center justify-center mx-auto cursor-pointer text-xl hover:text-[#768A9E]  transition-all ease-in-out duration-500"
                      onClick={() => {
                        console.log(row.company);
                        setCurrentCompanyId(row.company);
                        setOpenViewModal(true);
                      }}
                    />
                  </TableCell>
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
                    {row.company_name || "-"}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {row.numOfStations}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {row.completedOrders}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {row.earnings}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    {row.station_with_max_earning?.station?.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                    }}
                    align="center"
                  >
                    <GreenRedSwitch
                      CompanyId={row.company._id}
                      checked={row.company.is_active}
                    />
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
      {OpenViewModal && (
        <SubcriptionAcceptOrReject
          State={CurrentCompanyId}
          Open={OpenViewModal}
          setOpen={setOpenViewModal}
          ViewOnly={true}
        />
      )}
    </>
  );
}

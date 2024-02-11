import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useSelector } from "react-redux";
import SwitchButton from "../buttons/SwitchButton";
import { Switch } from "@mui/material";
import { StationsColumns } from "../../assets/Columns/StationsColumns";
import CustomPagination from "../TablePagination/TablePagination";
import { StationStatisticsTopData } from "./DemoData/StationStatisticsTopData";

export default function Testing({
  setStationID,
  setOpen,
  setOpenDeleteModal,
  Search,
  StationsData,
  ActiveStationSelection,
  setActiveStationSelection,
}) {
  // console.log(StationsData.data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can adjust the number of rows per page as needed

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (val) => {
    setRowsPerPage(parseInt(val, 10));
    setPage(0);
  };

  const handleSwitchClick = (Data) => {
    const newDataId = Data._id;
    const newDataStatus = Data.active;
    if (ActiveStationSelection.includes(newDataId)) {
      // If already in the selection, remove it
      const updatedSelection = ActiveStationSelection.filter(
        (st_id) => st_id.id !== newDataId
      );
      setActiveStationSelection(updatedSelection);
    } else {
      // If not in the selection, add it
      setActiveStationSelection([
        ...ActiveStationSelection,
        {
          id: newDataId,
          status: !newDataStatus,
        },
      ]);
    }
  };

  const Auth = useSelector((state) => state.auth);

  return (
    <div>
      <TableContainer
        component={Paper}
        // className="custom-table-container fade-in"
        sx={{
          borderWidth: 0,
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
        style={{ borderTopLeftRadius: "0px", position: "relative", zIndex: 1 }}
      >
        <Table aria-label="simple table">
          <TableHead
            sx={{
              borderWidth: 0,
              backgroundColor: "#576370",
              position: "sticky",
              top: 0,
            }}
          >
            <TableRow>
              {[
                { title: "No" },
                { title: "Station Name" },
                { title: "Sales Volume" },
                { title: "Sales Amount" },
              ].map((dt) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                    }}
                    align="center"
                  >
                    <div className="text-[14px] pt-[20px] pb-[5px] maxWeb1:pt-[45px] maxWeb1:pb-[6px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[70px] maxWeb3:pt-[90px] maxWeb4:pt-[90px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                      {dt.title}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {StationStatisticsTopData.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    padding: 1,
                    fontFamily: "Quicksand",
                    borderBlockWidth: 0,
                    borderRight: 1,
                  }}
                  // component="th"
                  scope="row"
                  align="center"
                >
                  <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                    {i + 1}
                  </div>
                  {/* {row.no} */}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    padding: 1,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                    borderRight: 1,
                  }}
                  align="center"
                >
                  <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                    {row.StationName}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    padding: 1,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                    borderRight: 1,
                  }}
                  align="center"
                >
                  <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                    {row.SalesVolume}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    padding: 1,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                    {row.SalesAmount}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <CustomPagination
        count={
          StationsData.filter((data) => {
            if (Search === "") return data;
            else if (data.name.toLowerCase().startsWith(Search.toLowerCase())) {
              return data;
            }
          }).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        RowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}

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

export default function StationTable({
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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {StationsColumns.map((dt) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      // paddingTop: "30px",
                      paddingBottom: "5px",
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
            {StationsData.filter((data) => {
              if (Search === "") return data;
              else if (
                data.name.toLowerCase().startsWith(Search.toLowerCase())
              ) {
                return data;
              }
            })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((Data) => {
                return (
                  <TableRow
                    key={Data._id}
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
                      <div className="flex justify-center items-center gap-x-2">
                        <BiEdit
                          className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                          onClick={() => {
                            setStationID(Data._id);
                            setOpen(true);
                          }}
                        />
                        <RiDeleteBin5Line
                          className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                          onClick={() => {
                            setStationID(Data._id);
                            setOpenDeleteModal(true);
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
                      <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                        {Data.phone}
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
                      <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                        {Auth.data.name}
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
                      <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                        {Data.name}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                        width: "250px",
                      }}
                      align="center"
                    >
                      <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                        {Data.address}
                      </div>
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                    >
                      <div className="!flex justify-center items-center m-[auto]">
                        <Switch
                          defaultChecked
                          checked={Data.active}
                          size="large"
                          style={{ color: switchColor }}
                          onClick={() => handleSwitchClick(Data)}
                        />
                      </div>
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
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
      />
    </div>
  );
}

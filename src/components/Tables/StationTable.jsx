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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Action
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Station Number
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Company Name
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Station Name
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Address
              </TableCell>

              {/* <TableCell
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Quicksand",
                  paddingTop: "30px",
                  paddingBottom: "5px",
                  fontSize: "14px",
                }}
                align="center"
              >
                Status
              </TableCell> */}
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
                          className="text-[1.2rem] cursor-pointer hover:text-[green] transition-all duration-500"
                          onClick={() => {
                            setStationID(Data._id);
                            setOpen(true);
                          }}
                        />
                        <RiDeleteBin5Line
                          className="text-[1.2rem] cursor-pointer hover:text-[red] transition-all duration-500"
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
                      {Data.phone}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Auth.data.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Quicksand",
                        borderBottomWidth: 0,
                      }}
                      align="center"
                    >
                      {Data.address}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // You can adjust the available rows per page options
        component="div"
        count={StationsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

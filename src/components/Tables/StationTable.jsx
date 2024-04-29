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
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SwitchButton from "../buttons/SwitchButton";
import { Popover, Switch, Typography } from "@mui/material";
import { StationsColumns } from "../../assets/Columns/StationsColumns";
import CustomPagination from "../TablePagination/TablePagination";
import { BsEye, BsEyeFill } from "react-icons/bs";
import StationManagersList from "../Modals/StationManagersList";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

export default function StationTable({
  setStationID,
  setOpen,
  setOpenDeleteModal,
  Search,
  StationsData,
  ActiveStationSelection,
  setActiveStationSelection,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [OpenModal, setOpenModal] = useState(false);
  const [CurrentIndex, setCurrentIndex] = useState("");
  const modalRef = useRef(null);

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
      const updatedSelection = ActiveStationSelection.filter(
        (st_id) => st_id.id !== newDataId
      );
      setActiveStationSelection(updatedSelection);
    } else {
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
        setCurrentIndex("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {StationsColumns.map((dt, i) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                    }}
                    align="center"
                    key={i}
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
              .map((Data, index) => {
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
                        {Data.name}
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
                      <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center relative">
                        {Data?.stationManagers.length === 0 ? (
                          "-"
                        ) : (
                          <div className="flex items-center justify-center gap-x-2">
                            <div>{Data?.stationManagers[0].name}</div>
                            <div className="relative" ref={modalRef}>
                              {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 cursor-pointer hover:text-[#465462]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => {
                                  setOpenModal(!OpenModal);
                                  setCurrentIndex(index);
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg> */}
                              {!OpenModal ? (
                                <IoMdArrowDropdownCircle
                                  onClick={() => {
                                    setOpenModal(!OpenModal);
                                    setCurrentIndex(index);
                                  }}
                                  className="text-2xl cursor-pointer ease-in-out duration-500 fade-in"
                                />
                              ) : (
                                <IoMdArrowDropupCircle
                                  onClick={() => {
                                    setOpenModal(!OpenModal);
                                    setCurrentIndex(index);
                                  }}
                                  className="text-2xl cursor-pointer ease-in-out duration-500 fade-in"
                                />
                              )}
                              {OpenModal && CurrentIndex === index && (
                                <div className="absolute mt-2 w-fit bg-[#465462] text-white shadow-lg rounded-md z-10">
                                  <ul>
                                    {Data.stationManagers.map((std, idx) => (
                                      <li
                                        key={idx}
                                        className="py-2 px-4 cursor-pointer"
                                      >
                                        {std.name}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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

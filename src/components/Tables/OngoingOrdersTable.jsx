import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Data } from "./DemoData/Orders";
import { AiFillEye } from "react-icons/ai";
import { OngoingOrdersColumns } from "../../assets/Columns/OngoingOrdersColumns";
import { convertStatus } from "../../utility/utilityFunctions";
import moment from "moment";
import CustomPagination from "../TablePagination/TablePagination";

export default function OngoingOrdersTable({
  Filter,
  setCurrentID,
  setOpen,
  Search,
  data: Data,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (val) => {
    setRowsPerPage(parseInt(val, 10));
  };

  React.useEffect(() => {
    setPage(0);
  }, [Filter, Search]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {OngoingOrdersColumns.map((column) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      // paddingTop: "12px",
                      // paddingBottom: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div className="text-[13px] pt-[6px] pb-[6px] maxWeb1:pt-[15px] maxWeb1:pb-[15px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[20px] maxWeb3:pt-[25px] maxWeb4:pt-[30px] maxWeb2:pb-[20px] maxWeb3:pb-[25px] maxWeb4:pb-[30px]">
                      {column.title}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data &&
              Data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row, i) => (
                <TableRow
                  key={`${row?._id}}`}
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
                      {row.orderNumber ? row.orderNumber : "none"}
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
                      {moment(new Date(row.createdAt * 1000)).format(
                        "DD/MM/YYYY h:mm A"
                      )}
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
                      {row.reciept_number ? row.reciept_number : "none"}
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
                      {row?.station?.name}
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
                      {Number(row.station.paid_amount).toFixed(2)}
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
                      {row.driverId?.name}
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
                      {row?.station?.deliveryTime
                        ? moment(
                            new Date(row?.station?.deliveryTime * 1000)
                          ).format("DD/MM/YYYY h:mm A")
                        : row.arrival_date
                        ? moment(new Date(row.arrival_date * 1000)).format(
                            "DD/MM/YYYY h:mm A"
                          )
                        : row.expected_arrival
                        ? moment(new Date(row.expected_arrival * 1000)).format(
                            "DD/MM/YYYY h:mm A"
                          )
                        : "Not specified"}
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
                      <div
                        className={`${
                          row.status === 0
                            ? "bg-gray-500"
                            : row.status === 1
                            ? "bg-[#5CD2E6]"
                            : row.status === 2
                            ? "bg-[#F4E869]"
                            : row.status === 3
                            ? "bg-[#2EB100]"
                            : "bg-red-600"
                        } py-1 px-2 rounded-full text-white font-bold cursor-pointer`}
                      >
                        {convertStatus(row.status) || "none"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 400,
                      fontFamily: "Quicksand",
                      borderBottomWidth: 0,
                      fontSize: "20px",
                    }}
                    align="center"
                  >
                    <span className="flex justify-center items-center">
                      <AiFillEye
                        className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                        // className="cursor-pointer text-[#76808B] hover:text-black transition-all duration-500 ease-in-out"
                        onClick={() => {
                          setOpen(true);
                          setCurrentID(i);
                        }}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        count={Data && Data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        RowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

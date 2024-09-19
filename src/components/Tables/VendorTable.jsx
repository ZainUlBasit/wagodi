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
import { UserData } from "./DemoData/UserData";
import { BiEdit } from "react-icons/bi";
import { VendorData } from "./DemoData/VendorData";
import { RiDeleteBin5Line } from "react-icons/ri";
import TablePagination from "@mui/material/TablePagination";
import { VendorsColumns } from "../../assets/Columns/VendorsColumns";
import CustomPagination from "../TablePagination/TablePagination";
import { useTranslation } from "react-i18next";
const vendorFuelType = (type) => {
  switch (type) {
    case 0:
      return "91";
    case 1:
      return "95";
    case 2:
      return "D";
    default:
      return "";
  }
};

export default function VendorTable({
  setVendorID,
  setOpen,
  setOpenDelete,
  Search,
  VendorsData,
}) {
  const [t, i18n] = useTranslation("global");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // You can adjust the number of rows per page as needed

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ borderBottomWidth: 2, borderColor: "#465462" }}>
            <TableRow>
              {VendorsColumns.map((vc) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      // paddingTop: "10px",
                      paddingBottom: "5px",
                      fontSize: "14px",
                    }}
                    align="center"
                  >
                    <div className="text-[14px] pt-[20px] pb-[5px] maxWeb1:pt-[45px] maxWeb1:pb-[6px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[70px] maxWeb3:pt-[90px] maxWeb4:pt-[90px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                      {t(`VendorTableColumns.${vc.title}`)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {VendorsData?.filter((data) => {
              if (Search === "") return data;
              else if (data.name.toLowerCase().includes(Search.toLowerCase())) {
                return data;
              }
            })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, i) => {
                return (
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
                      <div className="flex justify-center items-center gap-x-2">
                        <BiEdit
                          className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                          onClick={() => {
                            setVendorID(data._id);
                            setOpen(true);
                          }}
                        />
                        <RiDeleteBin5Line
                          className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                          onClick={() => {
                            setVendorID(data._id);
                            setOpenDelete(true);
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
                        {data.name}
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
                      <div className="flex gap-x-5 justify-center maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem]">
                        {data?.fuels?.map((fuel) => (
                          <div key={fuel._id}>{vendorFuelType(fuel?.type)}</div>
                        ))}
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
                        {data.address}
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
          VendorsData.filter((data) => {
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

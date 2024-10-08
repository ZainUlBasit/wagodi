import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Data } from "./DemoData/Orders";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { UsersColumns } from "../../assets/Columns/UsersColumns";
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

export default function UserTable({
  setUserID,
  setOpenDeleteModal,
  setOpen,
  Filter,
  Search,
  UserData,
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
              {UsersColumns.map((uc) => {
                return (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Quicksand",
                      paddingBottom: "5px",
                      fontSize: "14px",
                    }}
                    align="center"
                  >
                    <div className="text-[14px] pt-[20px] pb-[5px] maxWeb1:pt-[45px] maxWeb1:pb-[6px] maxWeb1:text-[23px] maxWeb2:text-[28px] maxWeb3:text-[34px] maxWeb4:text-[38px] maxWeb2:pt-[70px] maxWeb3:pt-[90px] maxWeb4:pt-[90px] maxWeb2:pb-[12px] maxWeb3:pb-[18px] maxWeb4:pb-[25px]">
                      {t(`UsersColumns.${uc.title}`)}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {UserData?.data
              ?.filter((data) => {
                const CurrentRole =
                  Filter === "Company Admin"
                    ? 1
                    : Filter === "OrderManager"
                    ? 2
                    : Filter === "StationManager"
                    ? 3
                    : Filter === "Driver"
                    ? 4
                    : 1;
                const lowercasedSearch = Search.toLowerCase();
                const lowercasedName = data.name.toLowerCase();
                if (Filter !== "All") {
                  if (Search === "") {
                    return CurrentRole === data.role;
                  } else {
                    // Convert both Search and data.name to lowercase for case-insensitive comparison

                    return (
                      CurrentRole === data.role &&
                      lowercasedName.startsWith(lowercasedSearch)
                    );
                  }
                } else {
                  if (Search === "") {
                    return data;
                  } else {
                    return lowercasedName.startsWith(lowercasedSearch);
                  }
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((Data, i) => {
                return (
                  <TableRow
                    key={i}
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
                      <div className="flex justify-center items-center gap-x-2">
                        <BiEdit
                          className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[green] transition-all duration-500"
                          onClick={() => {
                            setUserID(Data._id);
                            setOpen(true);
                          }}
                        />
                        <RiDeleteBin5Line
                          className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                          onClick={() => {
                            setUserID(Data._id);
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
                      <div className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem] text-[1rem] text-center">
                        {Data.email}
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
                        {Data.privilage === 1
                          ? "Order Manager"
                          : Data.privilage === 0
                          ? "Sales Manager"
                          : ""}
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
                        {Data.phone_number}
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
                        {Data.role === 0
                          ? "Administrator"
                          : Data.role === 1
                          ? "Company Admin"
                          : Data.role === 2
                          ? "Order Manager"
                          : Data.role === 3
                          ? "Station Manager"
                          : "Driver"}
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
          UserData.data.filter((data) => {
            const CurrentRole =
              Filter === "Administrator"
                ? 0
                : Filter === "Order Manager"
                ? 2
                : Filter === "Station Manager"
                ? 3
                : Filter === "Driver"
                ? 4
                : 1;
            const lowercasedSearch = Search.toLowerCase();
            const lowercasedName = data.name.toLowerCase();
            if (Filter !== "All") {
              if (Search === "") {
                return CurrentRole === data.role;
              } else {
                // Convert both Search and data.name to lowercase for case-insensitive comparison

                return (
                  CurrentRole === data.role &&
                  lowercasedName.startsWith(lowercasedSearch)
                );
              }
            } else {
              if (Search === "") {
                return data;
              } else {
                return lowercasedName.startsWith(lowercasedSearch);
              }
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

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
import TableActionBtns from "../buttons/TableActionBtns";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // You can adjust the number of rows per page as needed

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const ChangeFilterToEnum = (data) => {
    return data === "Administrator"
      ? 0
      : data === "Order Manager"
      ? 2
      : data === "Station Manager"
      ? 3
      : data === "Driver"
      ? 4
      : 1;
  };

  const ChangePrivilageToEnum = (currentPrivilage) => {
    return currentPrivilage.privilage === 1
      ? "Order Manager"
      : currentPrivilage.privilage === 0
      ? "Sales Manager"
      : "";
  };

  const ChangeRoleToEnum = (CurrentRoles) => {
    return CurrentRoles.role === 0
      ? "Administrator"
      : CurrentRoles.role === 1
      ? "Company Admin"
      : CurrentRoles.role === 2
      ? "Order Manager"
      : CurrentRoles.role === 3
      ? "Station Manager"
      : "Driver";
  };

  const FilterationOfData = (data) => {
    // change the filter text to Enum (0,1,2,3,4)
    const CurrentRole = ChangeFilterToEnum(Filter);
    const lowercasedSearch = Search.toLowerCase();
    const lowercasedName = data.name.toLowerCase();
    if (Filter !== "All") {
      if (Search === "") {
        return CurrentRole === data.role;
      } else {
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
                      {uc.title}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {UserData?.data
              ?.filter((data) => {
                return FilterationOfData(data);
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
                      {/* Action Buttons */}
                      <TableActionBtns
                        id={Data._id}
                        setId={setUserID}
                        setEditModalOpen={setOpen}
                        setDeleteModalOpen={setOpenDeleteModal}
                      />
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
                        {ChangePrivilageToEnum(Data)}
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
                        {ChangeRoleToEnum(Data)}
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

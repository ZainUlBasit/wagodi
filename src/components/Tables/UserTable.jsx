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
import { date } from "yup";

export default function UserTable({ setUserID, setOpen, Filter, Search }) {
  React.useEffect(() => {
    console.log(Filter);
    console.log(Search);
  }, [Search, Filter]);
  return (
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
              Edit
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
              Username
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
              Email
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
              Authority and Privlages
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
              Phone Number
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
              Role
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {UserData.filter((data) => {
            if (Filter === "All") {
              if (Search === "") return data;
              else if (
                data.Username.toLowerCase().startsWith(Search.toLowerCase())
              ) {
                return data;
              }
            } else if (Filter !== "All") {
              if (Search === "") {
                if (Filter === data.Role) return data;
              } else if (
                data.Username.toLowerCase().startsWith(Search.toLowerCase())
              ) {
                if (Filter === data.Role) return data;
              }
            }
          }).map((Data, i) => {
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
                  <div className="flex justify-center items-center">
                    <BiEdit
                      className="text-[1.2rem] cursor-pointer "
                      onClick={() => {
                        setUserID(i);
                        setOpen(true);
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
                  {Data.Username}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {Data.Email}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {Data.AuthorityandPrivlages}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {Data.PhoneNumber}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 400,
                    fontFamily: "Quicksand",
                    borderBottomWidth: 0,
                  }}
                  align="center"
                >
                  {Data.Role}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

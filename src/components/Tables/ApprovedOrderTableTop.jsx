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
import { FiDownload } from "react-icons/fi";
import { Popover, Typography } from "@mui/material";
import "./styles/AOTop.css";
import { convertStatus } from "../../utility/utilityFunctions";

export default function ApprovedOrderTableTop({ Data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [SendType, setSendType] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead
          style={{
            borderWidth: 0,
            // borderBottomWidth: 0,
            // borderColor: "#465462",
            backgroundColor: "#465462",
            height:"10vh"
          }}
        >
          <TableRow sx={{ borderWidth: 0 }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
                // borderWidth: 0,
              }}
            >
              <div className="font-[700] text-[13.9px] text-white whitespace-nowrap">
                <div className="maxWeb1:text-[1.1rem] maxWeb2:text-[1.3rem] maxWeb3:text-[1.5rem] maxWeb4:text-[1.5em] text-[.9rem] text-center">
                  <span className="font-bold">RecieptNumber:</span>
                  <span className="font-[400] ml-1">
                    {Data?.reciept_number || "not specified"}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
              }}
            >
              <div className="font-[700] text-[13.9px] text-white bg-[#465462] whitespace-nowrap">
                <div className="maxWeb1:text-[1.1rem] maxWeb2:text-[1.3rem] maxWeb3:text-[1.5rem] maxWeb4:text-[1.5em] text-[.9rem] text-center">
                  <span className="font-bold">StationName:</span>
                  <span className="font-[400] ml-1">
                    {Data?.station?.id.name || "not specified"}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
              }}
            >
              <div className="font-[700] text-[13.9px] text-white bg-[#465462] whitespace-nowrap">
                <div className="maxWeb1:text-[1.1rem] maxWeb2:text-[1.3rem] maxWeb3:text-[1.5rem] maxWeb4:text-[1.5em] text-[.9rem] text-center">
                  <span className="font-bold">PaidAmount:</span>
                  <span className="font-[400] ml-1">
                    {Data?.station?.paid_amount || "not specified"}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
              }}
            >
              <div className="font-[700] text-[13.9px] text-white bg-[#465462] whitespace-nowrap">
                <div className="maxWeb1:text-[1.1rem] maxWeb2:text-[1.3rem] maxWeb3:text-[1.5rem] maxWeb4:text-[1.5em] text-[.9rem] text-center">
                  <span className="font-bold">DriverName:</span>
                  <span className="font-[400] ml-1">
                    {Data?.driverId?.name || "not specified"}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
              }}
            >
              <div className="font-[700] text-[13.9px] text-white bg-[#465462] whitespace-nowrap">
                <div className="maxWeb1:text-[1.1rem] maxWeb2:text-[1.3rem] maxWeb3:text-[1.5rem] maxWeb4:text-[1.5em] text-[.9rem] text-center">
                  <span className="font-bold">PhoneNo:</span>
                  <span className="font-[400] ml-1">
                    {Data?.driverId?.phone_number || "not specified"}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
              }}
            >
              <div className="font-[700] text-[13.9px] text-white bg-[#465462] whitespace-nowrap">
                <div className="maxWeb1:text-[1.1rem] maxWeb2:text-[1.3rem] maxWeb3:text-[1.5rem] maxWeb4:text-[1.5em] text-[.9rem] text-center">
                  <span className="font-bold">Status:</span>
                  <span className="font-[400] ml-1 bg-[#2EB100] px-3 py-[5px] rounded-full">
                    {Data?.station?.status != undefined
                      ? convertStatus(Data?.station?.status)
                      : "not specified"}
                  </span>
                </div>
              </div>
            </TableCell>

            <TableCell
              sx={{
                fontWeight: "bold",
                fontFamily: "Quicksand",
                padding: 1,
                fontSize: "13px",
              }}
            >
              <div className="font-[700] text-[1.5rem] cursor-pointer text-white">
                <FiDownload
                  className="text-[1.2rem] maxWeb1:text-[2rem] maxWeb2:text-[2.5rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem] cursor-pointer transition-all duration-500"
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      borderRadius: "25px", // Add rounded corners
                      backgroundColor: "white", // Set background color to white
                      width: "400px", // Set the width as needed
                      overflow: "hidden", // Hide overflowing content
                      marginTop: "10px",
                      boxShadow: "none",
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Typography
                    sx={{
                      pt: 2,
                      pl: 4,
                      pr: 5,
                      pb: 5,
                      borderColor: "#465462",
                      backgroundColor: "#465462",
                      width: "400px",
                      overflow: "hidden",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                      <div className="font-[Quicksand] font-[700] text-[1.5rem] mb-3">
                        Download
                      </div>
                      <p className="h-[2px] w-full bg-[#FFFFFF5C] mb-3 rounded-full"></p>
                      <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                        {Data.attachments?.map(
                          (attachment) =>
                            (!attachment.stationId ||
                              attachment.stationId ==
                                Data?.station?.id?._id) && (
                              <div
                                className="flex gap-x-3 items-center cursor-pointer"
                                onClick={() => {
                                  setSendType(
                                    attachment.name || "not specified"
                                  );
                                  setFileUrl(attachment.url);
                                }}
                              >
                                <input
                                  type="checkbox"
                                  className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                  checked={
                                    SendType === attachment.name || false
                                  }
                                />
                                <span>{`${attachment?.name}`}</span>
                              </div>
                            )
                        )}

                        {/* <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() =>
                            setSendType("Receiving Receipt (Driver)")
                          }
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={SendType === "Receiving Receipt (Driver)"}
                          />
                          <span>Receiving Receipt (Driver)</span>
                        </div>
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() =>
                            setSendType("Receiving Receipt (Station Manager)")
                          }
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={
                              SendType === "Receiving Receipt (Station Manager)"
                            }
                          />
                          <span>Receiving Receipt (Station Manager)</span>
                        </div> */}
                        <div className="flex justify-center items-center w-full my-4">
                          {fileUrl && (
                            <button
                              className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:text-[#465462] hover:bg-white rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                              onClick={() => {
                                window.location.href = fileUrl;
                                setFileUrl("");
                              }}
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Typography>
                </Popover>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

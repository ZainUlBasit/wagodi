import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";
import AuthBtn from "../buttons/AuthBtn";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";
import {api} from "../../Https/index"
import { captureComponent } from "../../utility/utilityFunctions";
import { useSelector } from "react-redux";

const SendReport = ({ Open, setOpen }) => {
  const [Email, setEmail] = useState("");
  const UserData = useSelector(state => state.auth.data)
  // const [ReportType, setReportType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  // const [IsPdf, setIsPdf] = useState(null);

  // start

// const captureComponent = () => {
//   const componentElement = document.getElementById('componentToCapture');
//   html2canvas(componentElement)
//     .then( (canvas) => {
//       // Convert the canvas to a Blob
//       canvas.toBlob(async (blob) => {
//         // Send the Blob to the server
//         await sendImageToServer(blob);
//       }, 'image/png');
//     });
// };

// const sendImageToServer = async (imageBlob) => {
//   const formData = new FormData();
//   formData.append('file', imageBlob, 'report.png');
//   formData.append('email', Email);

//   try {
//     await api.post("/company/send-report", formData)
//     SuccessToast("Report send! Check your email inbox!")
//   } catch (error) {
//     console.error('Error:', error); 
//     ErrorToast("Error caused while sending the report!")
//   }
// }

  // end

  const onSubmit = async (e) => {
    e.preventDefault();
    // if(IsPdf == null) return ErrorToast("Please select either PDF or Excel!")
    if(!Email) return ErrorToast("Please enter email!")
    captureComponent("capture-component", Email, UserData.companyId._id)
    // console.log("Email", Email);
    // console.log("ReportType", ReportType);
    // console.log("IsPdf", IsPdf);
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex w-[450px] flex-col items-center">
        <div className="flex w-full justify-center font-[Quicksand] font-[600] text-[25px] pb-3 pt-7">
          Send Report
        </div>
        <span className="w-[85%] h-[2px] bg-[#46546266] mb-[50px]"></span>
        <AuthInput
          label={"Email"}
          placeholder={"123@gmail.com"}
          required={false}
          Value={Email}
          setValue={setEmail}
        />
        {/* <AuthInputPopOver
          label={"Report Type"}
          placeholder={"Select Report Type"}
          required={false}
          Value={ReportType}
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
              width: "300px", // Set the width as needed
              overflow: "hidden", // Hide overflowing content
              //   marginTop: "6px",
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
              p: 5,
              borderColor: "#465462",
              backgroundColor: "#465462",
              width: "400px",
              overflow: "hidden",
              borderRadius: "25px",
            }}
          >
            <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setReportType("Ordered");
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={ReportType === "Ordered"}
                  />
                  <span>Ordered</span>
                </div>
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setReportType("En Route");
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={ReportType === "En Route"}
                  />
                  <span>En Route</span>
                </div>
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setReportType("Delivered");
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={ReportType === "Delivered"}
                  />
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          </Typography>
        </Popover> */}
        <button
          className={`mb-10 mt-10 w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={onSubmit}
        >
          Send
        </button>
      </div>
    </CustomModal>
  );
};

export default SendReport;

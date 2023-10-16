// By Default
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "auto",
  bgcolor: "#465462",
  boxShadow: 24,
  border: "0px solid #fff !important",
  borderRadius: 8,
  outline: "none",
};

export default function Logout({ Open, setOpen }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={Open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={Open}>
          <Box sx={style}>
            <div className="bg-[#465462] text-white p-8 w-[670px] flex flex-col justify-center font-[Quicksand] rounded-full overflow-hidden">
              <div className="text-center text-[1.8rem] font-[700] mb-5">
                Are you sure want to log out ?
              </div>
              <hr className="" />
              <div className="flex flex-col w-full justify-center items-center my-10">
                <button
                  className={`mt-[20px] w-[297px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] border-[2px] border-[#465462] hover:border-[#fff] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                  onClick={() => {}}
                >
                  Yes , Logout
                </button>
                <button
                  className={`mt-[20px] w-[297px] h-fit py-2 bg-[#fff] rounded-[40px] text-black text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

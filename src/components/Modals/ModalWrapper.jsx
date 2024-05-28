// By Default
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { RiUserForbidFill } from "react-icons/ri";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "0px solid #fff !important",
  borderRadius: 2,
  outline: "none",
  overflow: "hidden",
  height: "auto",
};

export default function ModalWrapper({ open, setOpen, children }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col p-4 px-6 !text-[#0e2480]">
              {children}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

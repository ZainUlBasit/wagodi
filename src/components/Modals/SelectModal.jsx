// By Default
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetAuthNotFound } from "../../store/Slices/AuthSlice";
import { useState } from "react";
import { DeleteStationApi, api } from "../../Https";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";
import { fetchStations } from "../../store/Slices/StationSlice";
import { fetchVendors } from "../../store/Slices/VendorSlice";
import { fetchUsers } from "../../store/Slices/UserSlice";

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

export default function SelectModal({ Open, setOpen }) {
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const Current_User = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Navigating = async (fuel) => {
    setLoading(true);
    navigate("/add-reservation", {
      state: {
        ...fuel,
      },
    });
    setLoading(false);
  };
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
            timeout: 3000,
          },
        }}
      >
        <Fade in={Open}>
          <Box sx={style}>
            <div className="bg-[#465462] text-white p-8 w-fit max767:w-[100%] flex flex-col justify-center items-start font-[Quicksand] rounded-[25px] overflow-hidden gap-y-4">
              {[
                { type: 0, name: "91" },
                { type: 1, name: "95" },
                { type: 2, name: "D" },
              ].map((fuel) => {
                return (
                  <div
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => Navigating(fuel)}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={false}
                    />
                    <span>{fuel.name}</span>
                  </div>
                );
              })}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

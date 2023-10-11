import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { Popover, Typography } from "@mui/material";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import UserTable from "../../components/Tables/UserTable";
import AddUser from "../../components/Modals/AddUser";
import StationTable from "../../components/Tables/StationTable";
import AddStation from "../../components/Modals/AddStation";
import "../../assets/Style/style.css";
import EditStation from "../../components/Modals/EditStation";
import { StationData } from "../../components/Tables/DemoData/StationData";

const Stations = () => {
  const [Filter, setFilter] = useState("");
  const [StationID, setStationID] = useState("");
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full font-[Quicksand] fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-end mt-6 mb-10">
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`border-2 border-[#465462] px-4 py-[5px] rounded-3xl font-[Quicksand] font-[700] bg-[#fff] text-[#465462] transition-all duration-500 ease-in-out flex gap-x-6 items-center hover:text-white hover:bg-[#465462]`}
              onClick={() => setOpenAddModal(!OpenAddModal)}
            >
              <span className="px-3">Add Station</span>
              <BsPlusCircle />
            </button>
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative mt-6">
          <div className="flex justify-between items-center px-5 text-white font-[Quicksand] absolute -top-9 left-[-1px] w-[calc(100%+2px)] bg-[#465462] rounded-[15px]">
            <div className="flex border-[1px] w-[300px] border-white items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden my-[10px]">
              <BsSearch className="text-[1.2rem]" />
              <input
                className="outline-none bg-inherit text-white w-full"
                placeholder="Search Station name"
              />
            </div>
          </div>
          <StationTable
            setStationID={setStationID}
            setOpen={setOpenEditModal}
          />
        </div>
      </div>
      {/* Create Modal and Implement */}
      {OpenAddModal && (
        <AddStation Open={OpenAddModal} setOpen={setOpenAddModal} />
      )}

      {OpenEditModal && (
        <EditStation
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          CurrentStation={[
            {
              StationNumber: "50",
              StationName: "MCJD-1016",
              Address: "Lorem ipsum dolor sit amet",
              Gasses: [{ type: "95", volume: "50", price: "10000" },{ type: "91", volume: "40", price: "9000" }],
            },
          ]}
        />
      )}
    </>
  );
};

export default Stations;

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OngoingOrdersTable from "../../components/Tables/OngoingOrdersTable";
import { LuFilter } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { Popover, Typography } from "@mui/material";
import SendReport from "../../components/Modals/SendReport";
import ReservationDetails from "../../components/Modals/ReservationDetails";
import DateInput from "../../components/Input/DateInput";
import "../../assets/Style/style.css";
import MobNavbar from "../../components/Navbar/MobNavbar";
import CustomPoperOverWithShow from "../../components/Popover/CustomPoperOverWithShow";
import { api } from "../../Https";
import { useSelector } from "react-redux";
import ErrorToast from "../../components/Toast/ErrorToast";

const OngoingOrder = () => {
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [CurrentID, setCurrentID] = useState("");
  const [OpenReservationDetailsModal, setOpenReservationDetailsModal] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = useSelector(state => state.auth.data)
  const [ordersData, setOrdersData] =useState([])
  const [SearchText, setSearchText] = useState("");
  const [Filter, setFilter] = useState("");
  const [ApplyFilter, setApplyFilter] = useState("All");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect( () => {
    (async () => {
      const data = await api.post("/order/company", {companyId: userData.companyId._id})
      const apiSuccess = data?.data?.success
      if(!apiSuccess){
        ErrorToast("Failed fetching data for on-going orders!")
        return
      }
      setOrdersData(data.data.data)
    })()
  }, [])

  console.log("APPLY FILTER : ", ApplyFilter)

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mb-5 fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-5">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] max767:text-[1.5rem]">
            {ApplyFilter} Orders
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`border-2 border-[##90898E] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white transition-all duration-500 ease-in-out`}
              onClick={() => setOpenSendReport(!OpenSendReport)}
            >
              Send Report
            </button>
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden max767:hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search Station name"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <LuFilter
              className="text-[2rem] cursor-pointer"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
            <CustomPoperOverWithShow
              Title={"Choose Your Filter"}
              Content={[
                // 0 : on-going, 1 : assigned, 2: recieved, 3: delivered, 4 : complete, 5: canceled
                { Text: "All", FilterText: "All" },
                { Text: "on-going", FilterText: "on-going"},
                { Text: "assigned", FilterText: "assigned" },
                { Text: "recieved", FilterText: "recieved" },
                { Text: "delivered", FilterText: "delivered" },
                { Text: "canceled", FilterText: "canceled" },
              ]}
              Filter={Filter}
              setFilter={setFilter}
              ApplyFilter={ApplyFilter}
              setApplyFilter={setApplyFilter}
              popover_open={open}
              popover_id={id}
              handleClose={handleClose}
              popover_anchorEl={anchorEl}
            />
          </div>
        </div>
        <div id="capture-component" className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]">
          <OngoingOrdersTable
            Filter={ApplyFilter}
            Search={SearchText}
            setCurrentID={setCurrentID}
            setOpen={setOpenReservationDetailsModal}
            data = {ordersData}
          />
        </div>
      </div>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
      {OpenReservationDetailsModal && (
        <ReservationDetails
          Open={OpenReservationDetailsModal}
          setOpen={setOpenReservationDetailsModal}
          SelectedID={CurrentID}
          data = {ordersData}
        />
      )}
    </>
  );
};

export default OngoingOrder;

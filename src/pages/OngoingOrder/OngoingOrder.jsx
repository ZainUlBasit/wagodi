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
import PageLoader from "../../components/Loaders/PageLoader";
import TableWrapper from "../../components/Tables/TableWrapper";
import NoDataFound from "../../components/Loaders/Lottie/NoDataFound";
import { convertStatus } from "../../utility/utilityFunctions";

const OngoingOrder = () => {
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [CurrentID, setCurrentID] = useState("");
  const [OpenReservationDetailsModal, setOpenReservationDetailsModal] =
    useState(false);
  const userData = useSelector((state) => state.auth.data);
  const [ordersData, setOrdersData] = useState([]);
  const [SearchText, setSearchText] = useState("");
  const [Filter, setFilter] = useState("");
  const [ApplyFilter, setApplyFilter] = useState("All");
  const [Loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    (async () => {
      const data = await api.post("/order/company", {
        companyId: userData.companyId._id,
      });
      const apiSuccess = data?.data?.success;
      if (!apiSuccess) {
        ErrorToast("Failed fetching data for on-going orders!");
        return;
      }
      console.log(data.data.data);
      setOrdersData(data.data.data);
      setLoading(false);
    })();
  }, []);

  console.log("APPLY FILTER : ", ApplyFilter);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mb-5 fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] max767:text-[1.5rem] maxWeb1:text-[3rem] maxWeb2:text-[4rem] maxWeb3:text-[5rem] maxWeb4:text-[5rem] capitalize">
            {ApplyFilter} Orders
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4 flex-wrap">
            <button
              className={`relative text-center tracking-[1px] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white no-underline text-#465462 cursor-pointer transition-all ease-in-out duration-500  border-2 border-solid border-[#90898E] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] hover:border-[#465462] active:scale-90 flex items-center gap-x-2 justify-center`}
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
                { Text: convertStatus(0), FilterText: convertStatus(0) },
                { Text: convertStatus(1), FilterText: convertStatus(1) },
                { Text: convertStatus(2), FilterText: convertStatus(2) },
                { Text: convertStatus(3), FilterText: convertStatus(3) },
                { Text: convertStatus(4), FilterText: convertStatus(4) },
                { Text: convertStatus(5), FilterText: convertStatus(5) },
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
        {Loading ? (
          <PageLoader />
        ) : ordersData.length === 0 ? (
          <NoDataFound />
        ) : (
          <TableWrapper className="rounded-[30px] overflow-hidden">
            <OngoingOrdersTable
              Filter={ApplyFilter}
              Search={SearchText}
              setCurrentID={setCurrentID}
              setOpen={setOpenReservationDetailsModal}
              data={ordersData}
            />
          </TableWrapper>
        )}
      </div>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
      {OpenReservationDetailsModal && (
        <ReservationDetails
          Open={OpenReservationDetailsModal}
          setOpen={setOpenReservationDetailsModal}
          SelectedID={CurrentID}
          data={ordersData}
        />
      )}
    </>
  );
};

export default OngoingOrder;

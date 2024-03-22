import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { LuFilter } from "react-icons/lu";
import StationDetail from "../../components/Cards/StationDetail";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { data } from "./DemoData";
import StationReport from "../../components/Modals/StationReport";
import "../../assets/Style/style.css";
import MobNavbar from "../../components/Navbar/MobNavbar";
import { useDispatch, useSelector } from "react-redux";
import { StationData } from "../../components/Tables/DemoData/StationData";
import { fetchStations } from "../../store/Slices/StationSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import CustomPoperOverHome from "../../components/Popover/CustomPoperOverHome";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import LocationSearchInput from "../../utility/LocationSearchInput";
import FavBtn from "../../components/buttons/FavBtn";
import NoDataFound from "../../components/Loaders/Lottie/NoDataFound";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import SelectModal from "../../components/Modals/SelectModal";

const Home = () => {
  const [Favourites, setFavourites] = useState(false);
  const [Filter, setFilter] = useState("");
  const [Open, setOpen] = useState(false);
  const [CurrentStationName, setCurrentStationName] = useState("");
  const [SearchText, setSearchText] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();
  const StationsData = useSelector((state) => state.StationReducer);
  const Auth = useSelector((state) => state.auth);
  const [OpenSelectModal, setOpenSelectModal] = useState(false);

  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
  }, []);

  const handleSelect = ({ address, latLng }) => {
    console.log("Selected Address:", address);
    console.log("Latitude:", latLng.lat);
    console.log("Longitude:", latLng.lng);
  };

  return (
    <>
      {/* Main wrapper */}
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* <LocationSearchInput onSelect={handleSelect} /> */}
        {/* Header */}

        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 mb-6">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Stations
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden max767:hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search..."
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            {Auth.data.role === 2 && (
              <div className="flex items-center gap-x-3 max767:justify-end max767:mt-2">
                <button
                  className={`relative text-center text-lg tracking-[1px] no-underline text-[#465462] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#fff] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
                  onClick={() => setOpenSelectModal(true)}
                >
                  <span>Create Order</span>
                  <BsPlusCircle />
                </button>
              </div>
            )}
            <FavBtn Value={Favourites} setValue={setFavourites} />
            {/* <button
              className={`border-2 border-[#465462] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] ${
                Favourites ? "bg-[#465462]" : "bg-white"
              } ${
                Favourites ? "text-white" : "text-[#465462]"
              } transition-all duration-500 ease-in-out`}
              onClick={() => setFavourites(!Favourites)}
            >
              Favorites
            </button> */}
            <LuFilter
              className="text-[2rem] cursor-pointer"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
            <CustomPoperOverHome
              popover_open={open}
              handleClose={handleClose}
              setContent={setFilter}
              CurrentStatus={Filter}
              popover_id={id}
              popover_anchorEl={anchorEl}
            />
          </div>
        </div>
        {/* Body */}
        {/* <div className="grid grid-cols-3 gap-x-5 gap-y-3 w-[90%] max-w-[1200px] my-4"> */}
        {StationsData.loading ? (
          <PageLoader />
        ) : StationsData.data?.length === 0 ? (
          <NoDataFound />
        ) : (
          <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] maxWeb1:items-center maxWeb2:items-center maxWeb3:items-center maxWeb4:items-center flex flex-wrap xl:justify-center justify-center items-center my-4">
            {StationsData.data
              .filter((dt) => {
                const searchLowerCase = SearchText.toLowerCase();
                // Check if dt.name starts with the text in SearchText
                const nameStartsWithSearchText = dt.name
                  .toLowerCase()
                  .startsWith(searchLowerCase);

                if (Favourites && dt.active) {
                  if (Filter !== "" && Favourites === dt.favorite) {
                    if (
                      Filter === dt.current_status &&
                      nameStartsWithSearchText &&
                      dt.active
                    ) {
                      return dt;
                    }
                  } else if (
                    dt.favorite &&
                    nameStartsWithSearchText &&
                    dt.active
                  ) {
                    return dt;
                  }
                } else if (
                  Filter !== "" &&
                  nameStartsWithSearchText &&
                  dt.active
                ) {
                  if (Filter === dt.current_status) {
                    return dt;
                  }
                } else if (nameStartsWithSearchText && dt.active) {
                  return dt;
                }
              })
              .map((dt) => {
                return (
                  <StationDetail
                    StationDetailData={dt}
                    setOpen={setOpen}
                    Open={Open}
                    setCurrentStationName={setCurrentStationName}
                  />
                );
              })}
          </div>
        )}
      </div>
      {Open && (Auth.data.role === 1 || Auth.data.role === 0) && (
        <StationReport
          StationName={CurrentStationName}
          Open={Open}
          setOpen={setOpen}
        />
      )}
      {OpenSelectModal && (
        <SelectModal Open={OpenSelectModal} setOpen={setOpenSelectModal} />
      )}
    </>
  );
};

export default Home;

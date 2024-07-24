import React, { useEffect, useState } from "react";
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
// import { StationData } from "../../components/Tables/DemoData/StationData";
import MobNavbar from "../../components/Navbar/MobNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import FilterButton from "../../components/buttons/FilterButton/FilterButton";
import DeleteModal from "../../components/Modals/DeleteModal";
import TableWrapper from "../../components/Tables/TableWrapper";
import Search from "../../components/Search/Search";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import NoDataFound from "../../components/Loaders/Lottie/NoDataFound";
import { GetCompanyInfoAPI } from "../../Https";
import ShowMessageModal from "../../components/Modals/ShowMessageModal";

const Stations = () => {
  const [Filter, setFilter] = useState("");
  const [StationID, setStationID] = useState("");
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [StationFilter, setStationFilter] = useState("all");
  const [ActiveStationSelection, setActiveStationSelection] = useState([]);
  const [ActiveCount, setActiveCount] = useState(0);
  const [InactiveCount, setInactiveCount] = useState(0);
  const [CompanyData, setCompanyData] = useState("");
  // react-redux methods
  const dispatch = useDispatch();
  const StationsData = useSelector((state) => state.StationReducer);
  const Auth = useSelector((state) => state.auth);

  const fetchCompanyData = async () => {
    const response = await GetCompanyInfoAPI(Auth.data.companyId._id);
    setCompanyData(response.data.data);
  };

  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
    fetchCompanyData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full font-[Quicksand] fade-in">
        {/* Header */}
        <HeaderWrapper>
          {/* Right */}
          <div className="flex items-center gap-x-4 max767:flex-col max767:gap-y-1">
            <FilterButton
              Title={"All Stations"}
              Length={StationsData.data?.length}
              Value={"all"}
              setStationFilter={setStationFilter}
              StationFilter={StationFilter}
              Color={"bg-[#FFB764]"}
            />
            <FilterButton
              Title={"Inactive Stations"}
              Length={
                StationsData.data?.filter((sd) => sd.active === false).length
              }
              Value={"inactive"}
              setStationFilter={setStationFilter}
              Color={"bg-[#FFB764]"}
              StationFilter={StationFilter}
            />
            <FilterButton
              Title={"Active Stations"}
              Length={
                StationsData.data?.filter((sd) => sd.active === true).length
              }
              Value={"active"}
              setStationFilter={setStationFilter}
              Color={"bg-[#00EDED]"}
              StationFilter={StationFilter}
            />
            <button
              className={`relative text-center tracking-[1px] no-underline cursor-pointer border-solid shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 border-2 border-[#465462] px-3 py-[5px] rounded-full font-[Quicksand] font-[700] bg-[#fff] text-[#465462] transition-all duration-500 ease-in-out flex gap-x-6 items-center hover:text-white hover:bg-[#465462] text-[1rem] maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem]  maxWeb4:text-[3rem]`}
              onClick={() => setOpenAddModal(!OpenAddModal)}
            >
              <span className="px-3">Add Station</span>
              <BsPlusCircle />
            </button>
          </div>
        </HeaderWrapper>
        {StationsData?.loading ? (
          <PageLoader />
        ) : StationsData?.data?.length === 0 ? (
          <NoDataFound />
        ) : (
          <TableWrapper>
            <Search
              Placeholder="Search Station name"
              Value={SearchText}
              setValue={setSearchText}
            />
            <StationTable
              setStationID={setStationID}
              setOpen={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              Search={SearchText}
              ActiveStationSelection={ActiveStationSelection}
              setActiveStationSelection={setActiveStationSelection}
              StationsData={StationsData?.data?.filter((sdd) => {
                if (StationFilter === "all") {
                  return sdd;
                } else if (sdd.active && StationFilter === "active") {
                  return sdd;
                } else if (!sdd.active && StationFilter === "inactive") {
                  return sdd;
                }
              })}
            />
          </TableWrapper>
        )}
      </div>
      {/* Create Modal and Implement */}
      {/* {OpenAddModal && (
        <AddStation Open={OpenAddModal} setOpen={setOpenAddModal} />
      )} */}
      {OpenAddModal && StationsData.data.length < CompanyData[0] && (
        <AddStation Open={OpenAddModal} setOpen={setOpenAddModal} />
      )}
      {OpenAddModal && StationsData.data.length === CompanyData[0] && (
        <ShowMessageModal
          Open={OpenAddModal}
          setOpen={setOpenAddModal}
          msg={
            "The company has reached the maximum number of allowed stations!"
          }
        />
      )}

      {OpenEditModal && (
        <EditStation
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          CurrentStation={
            StationsData.data.filter((sd) => sd._id === StationID)[0]
          }
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          State={
            StationsData?.data
              .filter((sd) => sd._id === StationID)
              .map((data) => {
                return { ...data, type: "station" };
              })[0]
          }
        />
      )}
    </>
  );
};

export default Stations;

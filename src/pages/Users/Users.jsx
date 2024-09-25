import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { Popover, Typography } from "@mui/material";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import UserTable from "../../components/Tables/UserTable";
import AddUser from "../../components/Modals/AddUser";
import "../../assets/Style/style.css";
import EditUser from "../../components/Modals/EditUser";
import { UserData } from "../../components/Tables/DemoData/UserData";
import MobNavbar from "../../components/Navbar/MobNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/Slices/UserSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import DeleteModal from "../../components/Modals/DeleteModal";
import TableWrapper from "../../components/Tables/TableWrapper";
import Search from "../../components/Search/Search";
import { fetchStations } from "../../store/Slices/StationSlice";
import { useTranslation } from "react-i18next";

const Users = () => {
  const [t, i18n] = useTranslation("global");
  const [anchorEl, setAnchorEl] = useState(null);
  const [Filter, setFilter] = useState("All");
  const [ApplyFilter, setApplyFilter] = useState("All");
  const [UserID, setUserID] = useState("");
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [SearchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const Current_User = useSelector((state) => state.auth);
  const Users = useSelector((state) => state.Users);
  useEffect(() => {
    dispatch(
      fetchUsers({
        companyId: Current_User.data.companyId,
        query: {
          companyId: Current_User.data.companyId,
        },
      })
    );
    dispatch(fetchStations(Current_User.data.companyId));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full font-[Quicksand] fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[1.3rem] gap-x-3 flex items-center justify-start max767:w-[100%]">
            <div className="text-[30px] font-[600] maxWeb1:text-[3rem] maxWeb2:text-[4rem] maxWeb3:text-[5rem] maxWeb4:text-[5rem]">
              {t("Role")}
            </div>
            <div
              className="flex items-center gap-x-[20px] bg-[#465462] rounded-full px-3 py-1 maxWeb1:px-5 maxWeb2:px-5 maxWeb3:px-5 maxWeb4:px-5 maxWeb1:py-2 maxWeb2:py-2 maxWeb3:py-2 maxWeb4:py-2 h-fit text-white font-[Quicksand] cursor-pointer"
              onClick={handleClick}
            >
              <span className="max767:text-[1rem] maxWeb1:text-[2rem] maxWeb2:text-[3rem] maxWeb3:text-[4rem] maxWeb4:text-[4rem]">
                {t(`UserRole.${ApplyFilter}`)}
              </span>
              <FaChevronDown aria-describedby={id} variant="contained" />
            </div>

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
                  marginTop: "6px",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{
                  p: 3,
                  pb: 4,
                  pl: 4,
                  pr: 4,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  width: "400px",
                  overflow: "hidden",
                  borderRadius: "25px",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="font-[Quicksand] font-[700] text-[1.5rem] mb-3">
                    {t("SelectRole")}
                  </div>
                  <p className="h-[2px] w-[90%] bg-[#FFFFFF5C] mb-3 rounded-full"></p>
                  <div className="w-full flex flex-col justify-between gap-y-3 pt-3 items-start">
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("All")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "All"}
                      />
                      <span>{t("UserRole.All")}</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("CompanyAdmin")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "CompanyAdmin"}
                      />
                      <span>{t("UserRole.CompanyAdmin")}</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("OrderManager")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "OrderManager"}
                      />
                      <span>{t("UserRole.OrderManager")}</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Driver")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Driver"}
                      />
                      <span>{t("UserRole.Driver")}</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("StationManager")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "StationManager"}
                      />
                      <span>{t("UserRole.StationManager")}</span>
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className={`mt-[10px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[white] hover:text-[#90898E] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                        onClick={() => {
                          handleClose();
                          setApplyFilter(Filter);
                          setFilter(Filter);
                        }}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4 max767:justify-end max767:mt-2">
            <button
              className={`relative text-center text-lg tracking-[1px] no-underline text-[#465462] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#fff] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
              onClick={() => setOpenAddModal(!OpenAddModal)}
            >
              <span className="px-3">{t("Create")}</span>
              <BsPlusCircle />
            </button>
          </div>
        </div>
        {Users.loading ? (
          <PageLoader />
        ) : (
          <TableWrapper>
            <Search
              Placeholder="Search User"
              Value={SearchText}
              setValue={setSearchText}
            />
            <UserTable
              setUserID={setUserID}
              setOpenDeleteModal={setOpenDeleteModal}
              setOpen={setOpenEditModal}
              Filter={ApplyFilter}
              Search={SearchText}
              UserData={Users}
            />
          </TableWrapper>
        )}
      </div>
      {/* Create Modal and Implement */}
      {OpenAddModal && (
        <AddUser Open={OpenAddModal} setOpen={setOpenAddModal} />
      )}
      {OpenEditModal && (
        <EditUser
          Open={OpenEditModal}
          setOpen={setOpenEditModal}
          CurrentUser={Users.data.filter((dt) => dt._id === UserID)[0]}
        />
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          State={
            Users.data
              .filter((sd) => sd._id === UserID)
              .map((data) => {
                return { ...data, type: "user" };
              })[0]
          }
        />
      )}
    </>
  );
};

export default Users;

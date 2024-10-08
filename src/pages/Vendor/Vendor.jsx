import React, { useEffect, useState } from "react";
import VendorTable from "../../components/Tables/VendorTable";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import AddVendor from "../../components/Modals/AddVendor";
import EditVendor from "../../components/Modals/EditVendor";
import { VendorData } from "../../components/Tables/DemoData/VendorData";
import Navbar from "../../components/Navbar/Navbar";
import MobNavbar from "../../components/Navbar/MobNavbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../store/Slices/VendorSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import NoDataFound from "../../components/Loaders/Lottie/NoDataFound";
import toast from "react-hot-toast";
import DeleteModal from "../../components/Modals/DeleteModal";
import TableWrapper from "../../components/Tables/TableWrapper";
import Search from "../../components/Search/Search";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import { useTranslation } from "react-i18next";

const Vendor = () => {
  const [t, i18n] = useTranslation("global");

  const [VendorID, setVendorID] = useState("");
  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenDelete, setOpenDelete] = useState(false);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [SearchText, setSearchText] = useState("");
  // react-redux methods
  const dispatch = useDispatch();
  const VendorsData = useSelector((state) => state.Vendor);
  const Auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchVendors(Auth.data.companyId));
    console.log(VendorsData);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full font-[Quicksand] fade-in">
        {/* Header */}
        <HeaderWrapper>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`relative text-center text-lg tracking-[1px] no-underline text-[#465462] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#fff] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
              onClick={() => setOpenAdd(!OpenAdd)}
            >
              <span className="pl-1">{t("AddVendor")}</span>
              <BsPlusCircle />
            </button>
          </div>
        </HeaderWrapper>
        {VendorsData.loading ? (
          <PageLoader />
        ) : VendorsData.isError ? (
          toast.error("Error While Fetching Data...")
        ) : VendorsData.data?.length === 0 ? (
          <NoDataFound />
        ) : (
          <TableWrapper>
            <Search
              Placeholder="Search Vendors..."
              Value={SearchText}
              setValue={setSearchText}
            />
            <VendorTable
              setVendorID={setVendorID}
              setOpen={setOpenEdit}
              setOpenDelete={setOpenDelete}
              Search={SearchText}
              VendorsData={VendorsData.data}
            />
          </TableWrapper>
        )}
      </div>
      {OpenAdd && <AddVendor Open={OpenAdd} setOpen={setOpenAdd} />}
      {OpenEdit && (
        <EditVendor
          Open={OpenEdit}
          setOpen={setOpenEdit}
          Data={VendorsData.data.filter((dt) => dt._id === VendorID)[0]}
          companyId={Auth.data.companyId}
        />
      )}
      {OpenDelete && (
        <DeleteModal
          Open={OpenDelete}
          setOpen={setOpenDelete}
          State={
            VendorsData.data
              .filter((dt) => dt._id === VendorID)
              .map((data) => {
                return { ...data, type: "vendor" };
              })[0]
          }
        />
      )}
    </>
  );
};

export default Vendor;

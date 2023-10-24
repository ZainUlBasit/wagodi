import React, { useState } from "react";
import VendorTable from "../../components/Tables/VendorTable";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import AddVendor from "../../components/Modals/AddVendor";
import EditVendor from "../../components/Modals/EditVendor";
import { VendorData } from "../../components/Tables/DemoData/VendorData";
import Navbar from "../../components/Navbar/Navbar";
import MobNavbar from "../../components/Navbar/MobNavbar";

const Vendor = () => {
  const [VendorID, setVendorID] = useState("");
  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [SearchText, setSearchText] = useState("");
  return (
    <>
      <Navbar />
      <MobNavbar />
      <div className="flex flex-col justify-center items-center w-full font-[Quicksand] fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-end mt-6 mb-10">
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`border-2 border-[#465462] px-4 py-[5px] rounded-3xl font-[Quicksand] font-[700] bg-[#fff] text-[#465462] transition-all duration-500 ease-in-out flex gap-x-3 items-center hover:text-white hover:bg-[#465462]`}
              onClick={() => setOpenAdd(!OpenAdd)}
            >
              <span className="pl-1">Add Vendor</span>
              <BsPlusCircle />
            </button>
          </div>
        </div>
        <div className="w-[80%] max-w-[1200px] border-[1px] border-[#465462] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative mt-6">
          <div className="flex justify-between items-center px-5 text-white font-[Quicksand] absolute -top-9 left-[-1px] w-[calc(100%+2px)] bg-[#465462] rounded-[15px]">
            <div className="flex border-[1px] w-[300px] border-white items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden my-[10px]">
              <BsSearch className="text-[1.2rem]" />
              <input
                className="outline-none bg-inherit text-white w-full"
                placeholder="Search Vendors..."
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <VendorTable
            setVendorID={setVendorID}
            setOpen={setOpenEdit}
            Search={SearchText}
          />
        </div>
      </div>
      {OpenAdd && <AddVendor Open={OpenAdd} setOpen={setOpenAdd} />}
      {OpenEdit && (
        <EditVendor
          Open={OpenEdit}
          setOpen={setOpenEdit}
          Data={VendorData[VendorID]}
        />
      )}
    </>
  );
};

export default Vendor;

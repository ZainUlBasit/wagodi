import React, { useState } from "react";
import DateInput from "../../components/Input/DateInput";
import { BsSearch } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../../components/Tables/EmployeeTable";
import TableWrapper from "../../components/Tables/TableWrapper";

const EmployeeData = () => {
  const [SearchText, setSearchText] = useState("");
  const [CurDate, setCurDate] = useState("");
  const navigate = useNavigate();
  const handleArrowLeftClick = () => {
    // Navigate to the last visited route
    navigate(-1);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] flex items-center gap-x-4">
            <FaArrowLeft
              className="text-[1.4rem] cursor-pointer"
              onClick={handleArrowLeftClick}
            />
            Employee Data
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4  max767:w-full max767:justify-end  max767:mt-3">
            <DateInput
              label="Date"
              required={false}
              Value={CurDate}
              setValue={setCurDate}
            />
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden max767:hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search Station name"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <TableWrapper className={"rounded-[20px] overflow-hidden"}>
          <EmployeeTable
            Data={[
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
              {
                name: "testing",
                station: "testing station",
                phone_number: "testing 123",
                fuel_type: "testing fuel",
                fuel_volume: "testing fuel 123",
                amount: "123",
              },
            ]}
            Search={SearchText}
          />
        </TableWrapper>
        <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] flex justify-between px-5 py-3 mt-4">
          <div className="font-bold">Total</div>
          <div className="font-bold flex gap-x-[100px] pr-10">
            <div className="font-bold">500 L</div>
            <div className="font-bold">500</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeData;

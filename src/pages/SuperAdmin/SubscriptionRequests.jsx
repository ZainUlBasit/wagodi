import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import SubscriptionRequestsTable from "../../components/Tables/SubscriptionRequestsTable";
import { api } from "../../Https";

const old_data = [
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "1",
    price: "1000",
    status: "Accept",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "4",
    price: "1000",
    status: "Accept",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "3",
    price: "1000",
    status: "Accepted",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "2",
    price: "1000",
    status: "Rejected",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "3",
    price: "1000",
    status: "Accepted",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "2",
    price: "1000",
    status: "Rejected",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "1",
    price: "1000",
    status: "Accept",
  },
  {
    name: "Company  ABC",
    sub_type: "Gold",
    no_of_stations: "800",
    requests_no: "4",
    price: "1000",
    status: "Accept",
  },
];
const SubscriptionRequests = () => {
  const [SearchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchSubscriptionRequests = async () => {
      const response = api.post("/company/all", { enterprise: true });
      console.log(response.data);
      if (response.data.success) setData(response.data.data);
    };
    fetchSubscriptionRequests();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between items-center mt-6">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Companies Information
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden max767:hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search Request Number"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] my-5">
          <SubscriptionRequestsTable Data={data} />
        </div>
      </div>
    </>
  );
};

export default SubscriptionRequests;

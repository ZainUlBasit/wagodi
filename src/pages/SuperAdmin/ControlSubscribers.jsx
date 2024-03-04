import React, { useEffect, useState } from "react";
import { BiSolidChevronRight } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import ControlSubscribersTable from "../../components/Tables/ControlSubscribersTable";
import { api } from "../../Https";
import ErrorToast from "../../components/Toast/ErrorToast";
import TableWrapper from "../../components/Tables/TableWrapper";
import PageLoader from "../../components/Loaders/PageLoader";

const old_data = [
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
  {
    name: "Company  ABC",
    no_of_stations: "800",
    sub_type: "Diamond",
    duration: "31 Days",
  },
];

const to_default = "2023-12-11";
const from_default = "2023-12-11";
const ControlSubscribers = () => {
  const [SearchText, setSearchText] = useState("");
  const [ToDate, setToDate] = useState(to_default);
  const [FromDate, setFromDate] = useState(from_default);
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [IsError, setIsError] = useState(true);

  useEffect(() => {
    const requestBody = {};
    // const start_date = (new Date(ToDate).getTime() / 1000)
    // const end_date = (new Date(FromDate).getTime() / 1000)
    const fetchSubscriptionData = async () => {
      setLoading(true);
      try {
        const responseData = await api.post("/company/all", requestBody);
        console.log(responseData);
        if (responseData?.data?.success) setData(responseData?.data?.data);
      } catch (error) {
        console.log(error);
        ErrorToast("Error fetching Control Subscription Data!");
        setIsError(true);
      }
      setLoading(false);
    };
    fetchSubscriptionData();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 flex-wrap">
          {/* Left */}
          <div className="text-[30px] font-[Quicksand] font-[600] maxWeb1:text-[3rem] maxWeb2:text-[3rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem]">
            Control Subscribers
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <div className="font-[Quicksand] font-[700] flex gap-x-2 items-center max767:hidden">
              <div className="relative w-[200px]">
                <p className="absolute top-[-11px] left-4 px-[4px] w-fit bg-white font-[Quicksand] text-[15px]">
                  From
                </p>
                <input
                  type="date"
                  name="fromdate"
                  id="fromdate"
                  value={FromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="px-3 py-2 pr-2 border border-[#E8E8E8] rounded-[7.94px] w-full outline-none"
                />
              </div>
              <div className="text-[1.5rem] flex justify-center items-center">
                <BiSolidChevronRight />
              </div>
              <div className="relative w-[200px]">
                <p className="absolute top-[-11px] left-4 px-[4px] w-fit bg-white font-[Quicksand] text-[15px]">
                  To
                </p>
                <input
                  type="date"
                  name="todate"
                  id="todate"
                  value={ToDate}
                  className="px-3 font-[Quicksand] py-2 pr-2 border border-[#E8E8E8] rounded-[7.94px] w-full outline-none"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex border-[1px] w-[300px] maxWeb1:w-[400px] maxWeb2:w-[450px] maxWeb3:w-[500px] maxWeb4:w-[550px] border-black items-center gap-x-2 px-3 py-[6px] maxWeb1:px-4 maxWeb1:py-[8px] maxWeb2:px-5 maxWeb2:py-[10px] rounded-full overflow-hidden my-[10px] maxWeb1:my-[15px] maxWeb2:my-[20px]">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search Company name"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        {Loading ? (
          <div className="flex">
            <PageLoader />
          </div>
        ) : (
          <TableWrapper className="rounded-[30px] overflow-hidden">
            <ControlSubscribersTable Data={data} />
          </TableWrapper>
        )}
      </div>
    </>
  );
};

export default ControlSubscribers;

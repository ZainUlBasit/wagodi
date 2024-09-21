import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import SubscriptionRequestsTable from "../../components/Tables/SubscriptionRequestsTable";
import { api } from "../../Https";
import TableWrapper from "../../components/Tables/TableWrapper";
import PageLoader from "../../components/Loaders/PageLoader";
import { set } from "lodash";
import SubcriptionAcceptOrReject from "../../components/Modals/SubcriptionAcceptOrReject";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCompany } from "../../store/Slices/AllCompanySlice";
import { useTranslation } from "react-i18next";

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
  const [Loading, setLoading] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [ID, setID] = useState("");
  const dispatch = useDispatch();
  const AllCompanyState = useSelector((state) => state.AllCompany);

  useEffect(() => {
    dispatch(fetchAllCompany({ enterprise: true }));
  }, []);
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 flex-wrap">
          {/* Left */}
          <div className="text-[30px] font-[Quicksand] font-[600] maxWeb1:text-[3rem] maxWeb2:text-[3rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem]">
            {t("CompanyControls.SubscriptionRequests")}
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <div className="flex border-[1px] w-[300px] maxWeb1:w-[400px] maxWeb2:w-[450px] maxWeb3:w-[500px] maxWeb4:w-[550px] border-black items-center gap-x-2 px-3 py-[6px] maxWeb1:px-4 maxWeb1:py-[8px] maxWeb2:px-5 maxWeb2:py-[10px] rounded-full overflow-hidden my-[10px] maxWeb1:my-[15px] maxWeb2:my-[20px]">
              <BsSearch />
              <input
                className="outline-none w-full font-[Quicksand]"
                placeholder="Search Company name"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        {AllCompanyState.loading ? (
          <div className="flex">
            <PageLoader />
          </div>
        ) : (
          <TableWrapper className="rounded-[30px] overflow-hidden">
            <SubscriptionRequestsTable
              Data={AllCompanyState.data.filter(
                (dt) =>
                  SearchText === "" ||
                  dt.name.toLowerCase().includes(SearchText.toLowerCase())
              )}
              setID={setID}
              setOpenModal={setOpenModal}
            />
          </TableWrapper>
        )}
        {OpenModal && (
          <SubcriptionAcceptOrReject
            State={AllCompanyState.data.find((dt) => dt._id === ID)}
            Open={OpenModal}
            setOpen={setOpenModal}
          />
        )}
      </div>
    </>
  );
};

export default SubscriptionRequests;

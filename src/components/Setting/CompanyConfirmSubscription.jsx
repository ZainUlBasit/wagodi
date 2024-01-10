import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../Https";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";

export default function CompanySubscription() {
  const userData = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate() 
  const queryParams = new URLSearchParams(location.search);
  const ba_token = queryParams.get("token");
  console.log("token : ", ba_token);

  const confirmSubscriptionHandler = async () => {
    try {
      const data = await api.post("/subscription/success", {
        ba_token,
        companyId: userData.companyId._id,
      });
      console.log(data?.data);
      const success = data?.data?.success;
      const error = data?.data?.data?.payload?.error;
      if (success) {
        SuccessToast("Successfully Subscribed!");
        navigate("/")
      } else {
        ErrorToast(error || "could not generate a subscription right now!");
        navigate("/company-sub")
      }
    } catch (error) {
      ErrorToast("subscription confirmation error!");
      console.error(error);
    }
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="flex max-w-[520px] max767:w-[90%] max767:items-center max767:justify-center flex-wrap gap-x-5 gap-y-5 fade-in">
        {/* {subscriptionData || "No Subscription Made!"} */}
        <Button onClick={confirmSubscriptionHandler}>
          Confirm Subscription
        </Button>
      </div>
    </div>
  );
}

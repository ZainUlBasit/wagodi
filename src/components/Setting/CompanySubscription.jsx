import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscription } from "../../store/Slices/SubscriptionSlice";
import { useLocation } from "react-router-dom";
import { api } from "../../Https";
import { useToaster } from "react-hot-toast";
import ErrorToast from "../Toast/ErrorToast";

export default function CompanySubscription() {
  const userData = useSelector(state => state.auth);
  const subscriptionData = userData?.companyId?.subscriptionId;
  const dispatch = useDispatch()
  const location = useLocation()
  const return_url = location.href + "/company-sub-confirm"; // return_url will be used to redirect after payment details
  
  const subscriptionHandler = async () => {
    try {
    const data = await api.post("/subscription/paypal-dummy", {return_url}) // this api is dummy, its to test the flow. later has to be changed!
    console.log(data.data)
    const success = data?.data?.success
    const error = data?.data?.data?.payload?.error
    if(success){
      const uri = data?.data?.data?.payload?.uri
      console.log(uri)
      window.location.href = uri
    } else {
      ErrorToast(error || "could not generate a subscription right now!")
    }
  } catch (error) {
    ErrorToast(error)
   console.error(error)   
  }
  }
  return (
    <div className="w-[100%] flex justify-center items-center">
    <div className="flex max-w-[520px] max767:w-[90%] max767:items-center max767:justify-center flex-wrap gap-x-5 gap-y-5 fade-in">
    {/* {subscriptionData || "No Subscription Made!"} */}
    <Button onClick={subscriptionHandler}>Get Subscription</Button>
    </div>
  </div>
);
}
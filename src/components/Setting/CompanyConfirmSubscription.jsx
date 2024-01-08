import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../Https";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";

export default function CompanySubscription() {
  const userData = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const {ba_token} = useParams()
  
  const confirmSubscriptionHandler = async () => {
    try {
    const data = await api.post("/subscription/success", {ba_token}) // this api is dummy, its to test the flow. later has to be changed!
    console.log(data.data)
    const success = data?.data?.success
    const error = data?.data?.data?.payload?.error
    if(success){
        SuccessToast("Successfully Subscribed!")
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
    <Button onClick={confirmSubscriptionHandler}>Confirm Subscription</Button>
    </div>
  </div>
);
}

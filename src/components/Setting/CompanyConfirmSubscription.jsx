import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../Https";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";

export default function CompanySubscription() {
  const userData = useSelector((state) => state.auth.data);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const ba_token = queryParams.get("token");
  console.log("token : ", ba_token);

  const confirmSubscriptionHandler = async () => {
    try {
      const data = await api.post("/subscription/success", {
        ba_token,
        company: userData.companyId,
      });
      console.log(data?.data);
      const success = data?.data?.success;
      const error = data?.data?.data?.payload?.error;
      if (success) {
        SuccessToast("Successfully Subscribed!");
        navigate("/home");
      } else {
        ErrorToast(error || "could not generate a subscription right now!");
        navigate("/company-sub");
      }
    } catch (error) {
      ErrorToast("subscription confirmation error!");
      console.error(error);
    }
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      {/* {subscriptionData || "No Subscription Made!"} */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: "20px",
            padding: "10px 30px",
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: "#FFD244",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          }}
          onClick={() => confirmSubscriptionHandler()}
        >
          Confirm Payment
        </Button>
      </Box>
      {" "}
    </div>
  );
}

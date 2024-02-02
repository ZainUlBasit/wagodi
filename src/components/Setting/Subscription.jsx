import React, { useEffect, useState } from "react";
import SubscriptionCard from "../Cards/SubscriptionCard";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../Https";
import ErrorToast from "../Toast/ErrorToast";
import PageLoader from "../Loaders/PageLoader";

const formatFrequency = (interval) => {
  switch (interval) {
    case 1:
      return "Monthly";
    case 3:
      return "Quarterly";
    case 6:
      return "Semi-Annually";
    case 12:
      return "Annually";
    default:
      return "Unknown";
  }
};

const getSubscriptionType = (type) => {
  switch (type) {
    case 0:
      return "Basic";
    case 1:
      return "Enterprise";
    default:
      return "Unknown";
  }
};

const Subscription = () => {
  const userData = useSelector((state) => state.auth.data);
  const [Loading, setLoading] = useState(false);
  const subscriptionData = userData?.companyId?.subscriptionId;
  const dispatch = useDispatch();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const return_url = location.href + "/company-sub-confirm"; // return_url will be used to redirect after payment details
  useEffect(() => {
    async function fetchSubscription() {
      setLoading(true);
      const {
        data: {
          data: { payload: subscriptionProducts },
        },
      } = await api.get("/product");
      setProducts(() => subscriptionProducts);
      setLoading(false);
    }
    fetchSubscription();
  }, []);

  const subscriptionHandler = async (productId) => {
    try {
      const data = await api.post("/subscription/create", {
        productId,
      }); // this api is dummy, its to test the flow. later has to be changed!
      console.log(data.data);
      const success = data?.data?.success;
      const error = data?.data?.data?.payload?.error;
      if (success) {
        const uri = data?.data?.data?.payload?.uri;
        console.log(uri);
        window.location.href = uri;
      } else {
        ErrorToast(error || "could not generate a subscription right now!");
      }
    } catch (error) {
      ErrorToast(error);
      console.error(error);
    }
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="flex max-w-[520px] max767:w-[90%] max767:items-center max767:justify-center flex-wrap gap-x-5 gap-y-5 fade-in">
        {/* <SubscriptionCard month={"1"} />
        <SubscriptionCard month={"3"} />
        <SubscriptionCard month={"6"} />
        <SubscriptionCard month={"12"} /> */}
        <Grid container spacing={2} justifyContent="center">
          {Loading && (
            <Grid item xs={12} sm={6} md={4} lg={3} ml={20} mt={20} key={"loading...."}>
              <CardContent>
                <PageLoader />
              </CardContent>
            </Grid>
          )}
          {!Loading &&
            products?.map((subscription) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={subscription._id}>
                <Card
                  sx={{
                    minWidth: 275,
                    margin: 2,
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {getSubscriptionType(subscription.type)} Plan
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {subscription.description}
                    </Typography>
                    <Typography variant="body2">
                      Station Quantity Charge:{" "}
                      {subscription.station_quantity_charge}
                    </Typography>
                    <Typography variant="body2">
                      Frequency:{" "}
                      {formatFrequency(subscription.frequency_interval)}
                    </Typography>
                    <Typography variant="body2">
                      Amount: {subscription.amount} {subscription.currency}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ marginTop: 2, backgroundColor: "#FFD244" }}
                      onClick={() => subscriptionHandler(subscription._id)}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Subscription;

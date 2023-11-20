import React from "react";
import SubscriptionCard from "../Cards/SubscriptionCard";

const Subscription = () => {
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="flex max-w-[520px] max767:w-[90%] max767:items-center max767:justify-center flex-wrap gap-x-5 gap-y-5 fade-in">
        <SubscriptionCard month={"1"} />
        <SubscriptionCard month={"3"} />
        <SubscriptionCard month={"6"} />
        <SubscriptionCard month={"12"} />
      </div>
    </div>
  );
};

export default Subscription;

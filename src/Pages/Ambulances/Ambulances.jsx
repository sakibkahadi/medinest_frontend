import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import RequestAnAmbulance from "./RequestAnAmbulance";
import AllAmbulances from "./AllAmbulances";
import 'daisyui/dist/full.css';
const Ambulances = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro | Ambulance</title>
      </Helmet>
      <div className="p-2">
        <Banner></Banner>
        <div className=" flex gap-6 mt-12 flex-col lg:flex-row">
          <div className="lg:w-1/2 xl:w-2/3">
            <AllAmbulances></AllAmbulances>
          </div>
          <div className="lg:w-1/2 xl:w-1/3 md:mx-auto ">
            <RequestAnAmbulance></RequestAnAmbulance>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambulances;

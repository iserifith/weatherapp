import axios from "axios";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import React from "react";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { DayWeatherDataType, serialize } from "../src/utils/helpers";

import { ILocation, useAccountStore } from "../src/utils/useAccountStore";
import Table from "../src/components/Table";

const LineChart = dynamic(() => import("../src/components/LineChart"));

const Dashboard = () => {
  const { accountState } = useAccountStore();
  const location = accountState?.location as ILocation;
  const [startDate, setStartDate] = React.useState(subDays(new Date(), 30));
  const [endDate, setEndDate] = React.useState(new Date());
  const { promiseInProgress } = usePromiseTracker();
  const [weatherData, setWeatherData] = React.useState<
    DayWeatherDataType[] | null
  >(null);
  const router = useRouter();
  React.useEffect(() => {
    if (!accountState?.loggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountState?.loggedIn]);

  const getWeatherData = async () => {
    if (startDate > endDate) return;
    const st = format(startDate, "yyyy-M-d");
    const et = format(endDate, "yyyy-M-d");
    const { lat, lng } = location;
    const qs = serialize({
      location: [lat, lng],
      range: [st, et],
    });
    const { data } = await trackPromise(axios(`/api/weather?${qs}`));
    setWeatherData(data.days);
  };

  return (
    <div className="justify-center items-center mx-auto">
      <div className="flex flex-row items-center justify-center mt-10 gap-5 flex-wrap">
        <div>
          <p>Start Date</p>
          <DatePicker
            className="my-2 border border-sky-300 px-2"
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div>
          <p>End Date</p>
          <DatePicker
            className="my-2 border border-sky-300 px-2"
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mb-10 my-5">
        <button
          onClick={getWeatherData}
          className="border-sky-200 border px-5 disabled:bg-slate-300"
          disabled={promiseInProgress}
        >
          Get Weather Data
        </button>
      </div>
      <div className="container mx-auto overflow-x-auto">
        {weatherData && <Table days={weatherData} />}
      </div>
      <div className="container mx-auto overflow-x-auto">
        {weatherData && <LineChart days={weatherData} />}
      </div>
    </div>
  );
};

export default Dashboard;

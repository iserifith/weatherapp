import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useAccountStore, ACCOUNT_ACTIONS } from "../src/utils/useAccountStore";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const Home: NextPage = () => {
  const { accountState, dispatch } = useAccountStore();
  const router = useRouter();
  const { promiseInProgress } = usePromiseTracker();

  React.useEffect(() => {
    if (accountState?.loggedIn) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountState?.loggedIn]);

  const getIpInfo = async () => {
    try {
      const { data: ip } = await axios.get("https://api.ipify.org");
      const { data: geo } = await trackPromise(axios.get(`/api/geo?ip=${ip}`));

      dispatch({
        type: ACCOUNT_ACTIONS.SET_IP,
        payload: ip,
      });
      dispatch({
        type: ACCOUNT_ACTIONS.SET_LOCATION,
        payload: geo.location,
      });
      dispatch({
        type: ACCOUNT_ACTIONS.SET_LOGGED_IN,
        payload: true,
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async () => {
    await getIpInfo();
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1505533542167-8c89838bb19e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80)",
      }}
      className="min-h-screen min-w-full bg-cover bg-no-repeat flex items-center justify-center"
    >
      <button
        disabled={promiseInProgress}
        onClick={handleLogin}
        className="px-5 py-3 rounded-xl border border-sky-100 uppercase hover:bg-sky-200 text-xl font-bold disabled:bg-slate-300"
      >
        Login
      </button>
    </div>
  );
};

export default Home;

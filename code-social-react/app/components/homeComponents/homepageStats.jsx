"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setTotal,
  setHighest,
  setHigh,
  setHighestPer,
  setHighPer,
} from "../../redux/reducers/statsSlice";
import {
  selectTotal,
  selectHighestComp,
  selectHighComp,
  selectHighestPer,
  selectHighPer,
} from "../../redux/selectors";
import Auth from "../../verify/auth";

function HomepageStats({ quickStats, toggleQuickStats }) {
  const totalComp = useSelector(selectTotal);
  const highestComp = useSelector(selectHighestComp);
  const highComp = useSelector(selectHighComp);
  const highestPer = useSelector(selectHighestPer);
  const highPer = useSelector(selectHighPer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Auth.loggedIn()) {
      let user = Auth.getProfile();
      let username = user.data.username;
      setUserStatsRedux(username);
      setInterval(() => {
        let user = Auth.getProfile();
        let username = user.data.username;
        setUserStatsRedux(username);
      }, 7000);
    }
    async function setUserStatsRedux(username) {
      const userStats = await fetchUserStats(username);
      dispatch(setTotal(userStats.totalCompleted));
      dispatch(setHighest(userStats.highestCompleted));
      dispatch(setHigh(userStats.highCompleted));
      dispatch(setHighestPer(userStats.highestPriorityPercent));
      dispatch(setHighPer(userStats.highPriorityPercent));
    }

  }, [dispatch]);

  async function fetchUserStats(username) {
    try {
      const response = await fetch(
        `https://routine-server-87a5f72bed6e.herokuapp.com/api/users/stats/${username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!data) {
        alert("Fetching failed, please try again");
        return;
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    // <div
    //   className={`${
    //     quickStats === false ? "translate-x-0" : "translate-x-[340px]"
    //   } duration-150 ease-in-out w-[340px] h-[55vh] p-2 rounded-tl-lg rounded-bl-lg shadow-2xl bg-darkestBaseWhite dark:bg-darkestBaseGray fixed z-[1000] right-0 top-[9%] border-l-2 border-t-2 border-b-2 border-black dark:border-0`}
    // >
    // <div className="w-full flex justify-between">
    //   <h1 className="font-semibold dark:text-white text-black">Quick Stats</h1>
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     strokeWidth={1.5}
    //     stroke="currentColor"
    //     className="w-6 h-6 cursor-pointer text-black dark:text-white"
    //     onClick={() => toggleQuickStats(!quickStats)}
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       d="M6 18L18 6M6 6l12 12"
    //     />
    //   </svg>
    // </div>
    <>
      <div className="p-2 col-span-1 border-[1px] border-lightestGray overflow-hidden rounded-lg dark:bg-transparent bg-white shadow-lg">
        <div className="w-full h-full">
          <h2 className=" text-gray-500 dark:text-gray-400 text-sm">
            Quick Stats:
          </h2>
          <div className="w-full h-[164px] flex mt-1 pb-8 pt-6 justify-around">
            <div className="flex flex-col justify-around text-center h-full w-36">
              <h2 className="dark:text-white text-black text-sm">
                Tasks Completed:
              </h2>
              <h1 className="text-7xl text-black dark:text-white font-semibold">
                {totalComp}
              </h1>
            </div>
            <div className="flex flex-col justify-around text-center h-full w-36">
              <h2 className="dark:text-white text-black text-sm">
                Highest Priority Completed:
              </h2>
              <div className="w-full flex justify-center">
                <h1 className="text-[60px] text-black dark:text-white font-semibold">
                  {highestComp}
                </h1>
                <div className="text-lg badge-md badge badge-secondary">
                  !!!
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-around text-center h-full w-36">
              <h2 className="dark:text-white text-black text-sm">
                High Priority Completed:
              </h2>
              <div className="w-full flex justify-center">
                <h1 className="text-[60px] text-black dark:text-white font-semibold">
                  {highComp}
                </h1>
                <div className="text-lg badge-md badge badge-primary">!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-2 flex rounded-lg col-span-1 pt-4 ">
        <div className="h-32 w-48 justify-center text-center">
          <h2 className="dark:text-gray-500 text-black text-sm">
            Highest Completion Percentage:
          </h2>
          <div
            className="radial-progress mt-2 duration-1000 ease-in-out text-customPink"
            style={{
              "--value": `${highestPer}`,
              "--size": "120px",
              "--thickness": "6px",
            }}
          >
            <h1 className="font-semibold text-2xl text-black dark:text-white">
              {highestPer}%
            </h1>
          </div>
        </div>
        <div className="h-32 w-48 justify-center text-center">
          <h2 className="dark:text-gray-500 text-black text-sm">
            High Completion Percentage:
          </h2>
          <div
            className="radial-progress mt-2 duration-1000 ease-in-out text-customPurple"
            style={{
              "--value": `${highPer}`,
              "--size": "120px",
              "--thickness": "6px",
            }}
          >
            <h1 className="font-semibold text-2xl text-black dark:text-white">
              {highPer}%
            </h1>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default HomepageStats;

{
  /* <div
className={`${
  quickStats === false ? "translate-x-0" : "translate-x-[340px]"
} duration-150 ease-in-out w-[340px] h-[55vh] p-2 rounded-tl-lg rounded-bl-lg shadow-2xl bg-darkestBaseWhite dark:bg-darkestBaseGray fixed z-[1000] right-0 top-[9%] border-l-2 border-t-2 border-b-2 border-black dark:border-0`}
>
<div className="w-full flex justify-between">
  <h1 className="font-semibold dark:text-white text-black">Quick Stats</h1>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 cursor-pointer text-black dark:text-white"
    onClick={() => toggleQuickStats(!quickStats)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</div>
<div className="w-full grid grid-cols-2 mt-2 gap-2">
  <div className="col-span-1 h-36 ">
    <h2 className="dark:text-gray-500 text-black text-sm">Tasks Completed:</h2>
    <h1 className="text-[50px] text-black dark:text-white font-semibold ml-2 mt-2">{totalComp}</h1>
  </div>
  <div className="col-span-1 h-36 p-1">
    <h2 className="dark:text-gray-500 text-black text-sm">Days on Ro:</h2>
    <h1 className="text-[50px] text-black dark:text-white font-semibold ml-2 mt-2">78</h1>
  </div>
  <div className="col-span-1 h-36 p-1">
    <h2 className="dark:text-gray-500 text-black text-sm">Highest Priority Completed:</h2>
    <div className="w-full flex ml-6 mt-4">
      <h1 className="text-[50px] text-black dark:text-white font-semibold">{highestComp}</h1>
      <div className="text-lg badge-md badge badge-secondary">!!!</div>
    </div>
  </div>
  <div className="col-span-1 h-36 p-1">
    <h2 className="dark:text-gray-500 text-black text-sm">High Priority Completed:</h2>
    <div className="w-full flex ml-6 mt-4">
      <h1 className="text-[50px] text-black dark:text-white font-semibold">{highComp}</h1>
      <div className="text-lg badge-md badge badge-primary">!</div>
    </div>
  </div>
  <div className="col-span-1 h-36 p-1">
    <h2 className="dark:text-gray-500 text-black text-sm">
      Highest Completion Percentage:
    </h2>
    <div
      className="radial-progress mt-2 duration-1000 ease-in-out text-customPink"
      style={{
        "--value": `${highestPer}`,
        "--size": "120px",
        "--thickness": "6px",
      }}
    >
      <h1 className="font-semibold text-2xl text-black dark:text-white">{highestPer}%</h1>
    </div>
  </div>
  <div className="col-span-1 h-36 p-1">
    <h2 className="dark:text-gray-500 text-black text-sm">High Completion Percentage:</h2>
    <div
      className="radial-progress mt-2 duration-1000 ease-in-out text-customPurple"
      style={{
        "--value": `${highPer}`,
        "--size": "120px",
        "--thickness": "6px",
      }}
    >
      <h1 className="font-semibold text-2xl text-black dark:text-white">{highPer}%</h1>
    </div>
  </div>
</div>
</div> */
}

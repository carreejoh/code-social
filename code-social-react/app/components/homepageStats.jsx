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
} from "../redux/reducers/statsSlice";
import {
  selectTotal,
  selectHighestComp,
  selectHighComp,
  selectHighestPer,
  selectHighPer,
} from "../redux/selectors";
import Auth from "../verify/auth";

function HomepageStats({ quickStats }) {
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
      }, 15000);
    }
  }, []);

  async function setUserStatsRedux(username) {
    const userStats = await fetchUserStats(username);
    dispatch(setTotal(userStats.totalCompleted));
    dispatch(setHighest(userStats.highestCompleted));
    dispatch(setHigh(userStats.highCompleted));
    dispatch(setHighestPer(userStats.highestPriorityPercent));
    dispatch(setHighPer(userStats.highPriorityPercent));
  }

  async function fetchUserStats(username) {
    try {
      const response = await fetch(
        `http://localhost:5050/api/users/stats/${username}`,
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
    <div
      className={`${
        quickStats === false ? "translate-x-0" : "translate-x-[340px]"
      } duration-150 ease-in-out w-[340px] h-[55vh] p-2 rounded-tl-lg rounded-bl-lg bg-darkestBaseGray fixed z-[1000] right-0 top-[9%]`}
    >
      <h1 className="font-semibold">Quick Stats</h1>
      <div className="w-full grid grid-cols-2 mt-2 gap-2">
        <div className="col-span-1 h-36 p-1 ">
          <h2 className="text-gray-500 text-sm">Tasks Completed:</h2>
          <h1 className="text-[50px] font-semibold ml-2 mt-2">{totalComp}</h1>
        </div>
        <div className="col-span-1 h-36 p-1">
          <h2 className="text-gray-500 text-sm">Days on Ro:</h2>
          <h1 className="text-[50px] font-semibold ml-2 mt-2">78</h1>
        </div>
        <div className="col-span-1 h-36 p-1">
          <h2 className="text-gray-500 text-sm">Highest Priority Completed:</h2>
          <div className="w-full flex ml-6 mt-4">
            <h1 className="text-[50px] font-semibold">
              {highestComp}
            </h1>
            <div className="text-lg badge-md badge badge-secondary">
              !!!
            </div>
          </div>
        </div>
        <div className="col-span-1 h-36 p-1">
          <h2 className="text-gray-500 text-sm">High Priority Completed:</h2>
          <div className="w-full flex ml-6 mt-4">
            <h1 className="text-[50px] font-semibold">
              {highComp}
            </h1>
            <div className="text-lg badge-md badge badge-primary">!</div>
          </div>
        </div>
        <div className="col-span-1 h-36 p-1">
          <h2 className="text-gray-500 text-sm">
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
            <h1 className="font-semibold text-2xl text-white">{highestPer}%</h1>
          </div>
        </div>
        <div className="col-span-1 h-36 p-1">
          <h2 className="text-gray-500 text-sm">High Completion Percentage:</h2>
          <div
            className="radial-progress mt-2 duration-1000 ease-in-out text-customPurple"
            style={{
              "--value": `${highPer}`,
              "--size": "120px",
              "--thickness": "6px",
            }}
          >
            <h1 className="font-semibold text-2xl text-white">{highPer}%</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageStats;

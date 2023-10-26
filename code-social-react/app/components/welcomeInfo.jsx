"use client";
import { useState, useEffect } from "react";
import Auth from "../verify/auth";

function WelcomeInfo() {
  const [username, setUsername] = useState("");
  // const [dateTime, setDateTime] = useState({
  //   time: new Date().toLocaleTimeString(),
  //   date: new Date().toLocaleDateString(),
  //   weekday: new Date().toLocaleDateString()
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDateTime({
  //       time: new Date().toLocaleTimeString(),
  //       date: new Date().toLocaleDateString({
  //         weekday: "long",
  //         year: "numeric",
  //         month: "long",
  //         day: "numeric",
  //       }),
  //       weekday
  //     });
  //   }, 1000); // Updating time every 1 second

  //   return () => {
  //     clearInterval(interval); // Cleanup the interval on component unmount
  //   };
  // }, []);

  useEffect(() => {
    if (Auth.loggedIn()) {
      let profile = Auth.getProfile();
      setUsername(profile?.data?.username);
    }
  }, []);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    // <div className="h-24 w-full border-b-[2px] bg-darkBaseWhite dark:border-darkestBaseGray dark:bg-darkestBaseGray">
    //   <div className="h-16">
    //     <h1 className="font-semibold text-black dark:text-white text-xl pt-4 ml-12">Welcome {username}!</h1>
    //     <h1 className="text-lg ml-12 text-black dark:text-white">Saturday, 10/19/2023</h1>
    //   </div>
    // </div>
    <div className="w-full h-16 bg-darkestBaseGray dark:bg-darkestBaseGray justify-between items-center pl-12 pr-12 flex">
      <div className="w-72">
        <h1 className="font-semibold text-white dark:text-white text-lg">
          Welcome {username}!
        </h1>
      </div>
      <div className="flex h-16 items-center">
        {/* <h1 className="text-sm">Active Task:</h1>
        <h1 className="font-semibold text-white dark:text-white text-lg ml-2">"Upper Body, Arms / Chest"</h1> */}
        {/* <h1>Calender</h1> */}
      </div>
      <div className="w-72 text-right">
      <h1 className="text-lg font-semibold text-white dark:text-white">
          Saturday, 10/19/2023
        </h1>
      </div>
    </div>
  );
}

export default WelcomeInfo;

"use client";
import { useState, useEffect } from "react";
import Auth from "../verify/auth";

function WelcomeInfo() {
  const [username, setUsername] = useState(undefined);

  const now = new Date();
  const dayOfWeek = now.getDay();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  useEffect(() => {
    if (Auth.loggedIn()) {
      let profile = Auth.getProfile();
      setUsername(profile?.data?.username);
    }
  }, []);

  const daysOfWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  return (
    <div className="w-full h-16 bg-darkestBaseGray dark:bg-darkestBaseGray justify-between items-center pl-12 pr-12 flex">
      <div className="w-72">
        {username === undefined ? (
          <h1 className="font-semibold text-white dark:text-white text-lg">
            Welcome to Routine Scheduler
          </h1>
        ) : (
          <h1 className="font-semibold text-white dark:text-white text-lg">
            Hello {username}!
          </h1>
        )}
      </div>
      <div className="flex h-16 items-center"></div>
      <div className="w-72 text-right">
        <h1 className="text-lg font-semibold text-white dark:text-white">
          {daysOfWeek[dayOfWeek]}, {formattedDate}
        </h1>
      </div>
    </div>
  );
}

export default WelcomeInfo;

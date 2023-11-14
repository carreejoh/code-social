"use client";

import { useState, useEffect } from "react";
import GeneralStats from "./generalStats";
import PriorityPercent from "./priorityPercent";
import ProductiveDay from "./productiveDay";
import Auth from "../../verify/auth";

function StatsMasterDiv() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (Auth.loggedIn()) {
      let user = Auth.getProfile();
      let username = user.data.username;
      console.log(username)
      fetchUserStats(username);
    }
  }, []);

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
      console.log(data)
      setUserData(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full lg:pl-12 lg:pr-12 md:pl-4 md:pr-4 pt-4 grid sm:grid-cols-2 pl-4 pr-4 gap-x-4 gap-y-3">
      {userData && (
        <>
          <GeneralStats userData={userData}/>
          {/* <ProductiveDay userData={userData}/> */}
          <PriorityPercent userData={userData}/>
          <div className="col-span-1 h-72 dark:bg-baseGray bg-white rounded-lg shadow-2xl"></div>
        </>
      )}
    </div>
  );
}

export default StatsMasterDiv;

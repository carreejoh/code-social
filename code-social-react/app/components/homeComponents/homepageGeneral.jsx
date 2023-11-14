"use client";
import { useState, useEffect, useMemo } from "react";
import HomepageStats from "./homepageStats";
import StringLink from "./stringLink";
import Auth from "../../verify/auth"

function HomepageGeneral({ dayData }) {
  const [currentTask, setCurrentTask] = useState({});
  const [currentTaskTitle, setCurrentTaskTitle] =
    useState("No Active Routines");
  const [currentTime, setCurrentTime] = useState(0);
  const [routineData, setRoutineData] = useState();
  const [stringLink, setStringLink] = useState("")

  useEffect(() => {
    getRoutineTimesMaster();
    clock();
  }, [dayData]);

  useEffect(() => {
    let user = Auth.getProfile();
    let username = user.data.username
    if(!username) {
      return;
    }
    getStringLink(username)
  }, [Auth])

  useEffect(() => {
    checkRoutineTimes();
  }, [routineData]);

  useEffect(() => {
    console.log(currentTime);
  }, [currentTime]);

  function clock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentTime(Number(`${hours}${minutes}`));
    const clock = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(Number(`${hours}${minutes}`));
      if (currentTime % 100 === 30 || currentTime % 100 === 0) {
        checkRoutineTimes;
      }
    }, 5000);
  }

  async function getRoutineTimesMaster() {
    const data = await fetchData();
    setRoutineData(data);
    if (!data) {
      return;
    }
  }

  async function checkRoutineTimes() {
    if (!routineData) {
      setCurrentTask("Nothing planned");
      return;
    }
    routineData.forEach((routine) => {
      if (routine.startTime <= currentTime && routine.endTime > currentTime) {
        setCurrentTask(routine);
        setCurrentTaskTitle(routine.title);
      }
    });
  }

  const fetchData = async () => {
    try {
      if (Array.isArray(dayData) && dayData.length) {
        let dataArray = await Promise.all(
          dayData.map((id) => fetchIndividualRoutine(id))
        );
        setRoutineData(dataArray);
        return dataArray;
      } else {
        console.error("routineData is not an array or is empty");
      }
    } catch (error) {
      console.error("Dashboard cannot fetch individual routines", error);
    }
  };

  async function fetchIndividualRoutine(routineId) {
    try {
      const response = await fetch(
        `https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/individ/${routineId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getStringLink(username) {
    try{
        const user = await fetch(`https://routine-server-87a5f72bed6e.herokuapp.com/api/users/${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await user.json();
        setStringLink(data.linkString)
    } catch (err) {
        console.error(err)
    }
}

  return (
    <div className=" w-full rounded-tl-lg p-2 pt-4 sm:pr-20 xl:pl-20 xl:pr-36 bg-white dark:bg-baseGray shadow-xl">
      <h1 className="text-3xl text-black dark:text-white font-semibold">
        Dashboard
      </h1>
      {/* <h3 className="text-black dark:text-white">{currentTaskTitle}</h3> */}
      <div className="w-full h-56 pt-2 pb-2 grid grid-cols-3 gap-4 ">
        <div className="p-2 rounded-lg col-span-1 border-[1px] border-lightestGray overflow-hidden dark:bg-transparent bg-white shadow-lg">
          <h2 className=" text-gray-500 dark:text-gray-400 text-sm">
            Current task:
          </h2>
          <div className="flex">
            <h2 className="text-2xl text-black dark:text-white font-semibold">
              {currentTaskTitle}
            </h2>
            <div
              className={`${
                currentTask.priority === "Highest" ? "" : "hidden"
              }  ml-1 badge text-lg font-semibold badge-secondary`}
            >
              !!!
            </div>
            <div
              className={`${
                currentTask.priority === "High" ? "" : "hidden"
              } ml-1 badge text-lg text-white font-semibold badge-primary`}
            >
              !
            </div>
          </div>
          <p>{currentTask.description}</p>
        </div>
        <HomepageStats />
        <StringLink stringLink={stringLink}/>
      </div>
    </div>
  );
}

export default HomepageGeneral;

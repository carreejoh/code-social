"use client";

import TaskBlock from "./taskBlock";
import TimeLine from "./timeline";
import { useState, useEffect, useRef } from "react";
import EmptyBlock from "./emptyBlock";

function TodayContainer({ size, routineData }) {
  const [dayData, setDayData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [weekdayTitle, setWeekdayTitle] = useState("");
  const [scrollTime, setScrollTime] = useState(0);
  const barRef = useRef(null);

  const date = new Date();
  const dayOfWeekNumber = date.getDay();

  // useEffect(() => {
  //   let date = new Date();
  //   let currentMinute = date.getMinutes();
  //   let scrollPosition = Math.floor(currentMinute * 4.29);
  //   overflowDiv.current.scrollTo(scrollPosition, 0);
  // }, []);

  const allStartTimes = [
    2500, 2530, 100, 130, 200, 230, 300, 330, 400, 430, 500, 530, 600, 630, 700,
    730, 800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330,
    1400, 1430, 1500, 1530, 1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930,
    2000,
  ];

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Moves "time bar" left each minute so user knows time relative to their schedule

  // useEffect(() => {
  //   const updateMarginLeft = () => {
  //     // if (barRef.current) {
  //     //   // Replace this with your logic to calculate the new margin-left
  //     //   const newMarginLeft = 'w-[2px] ml-24';
  //     //   barRef.className = newMarginLeft;
  //     // }
  //     let timeBar = document.querySelector("#timeBar");
  //     timeBar.classList.add("ml-[200px]");
  //   };
  //   const intervalId = setInterval(updateMarginLeft, 60000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // Auto scroll left based on time of day

  useEffect(() => {
    let scrollDivs = document.querySelectorAll(".scrollDiv");

    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let totalMinutesElapsed = currentHour * 60 + currentMinute;
    setScrollTime(totalMinutesElapsed);

    let scrollPosition = Math.floor(totalMinutesElapsed * 4.29 - 350);

    scrollDivs.forEach((div) =>
      div.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    );
  }, []);

  // Fetch each individual routine and populate main div with each task block

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await Promise.all(
          routineData.map((id) => fetchIndividualRoutine(id))
        );
        setDayData(dataArray);
        console.log(dataArray);
        setDataLoaded(true);
        setWeekdayTitle(dataArray[0]?.dayOfWeek);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  // The api call itself, (calls each routine block)

  async function fetchIndividualRoutine(routineId) {
    try {
      const response = await fetch(
        `http://localhost:5050/api/routines/individ/${routineId}`,
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

  const containerLength = {
    fullsize:
      "w-[6178px] h-56 transform duration-[500ms] ease-[cubic-bezier(0.17,0.67,0.06,0.96)]",
    small: "w-[800px] h-44",
  };

  return (
    <>
      {daysOfWeek[dayOfWeekNumber] === weekdayTitle ? (
        <h1 className="text-xl ml-20 font-semibold text-pink-500">
          {weekdayTitle}
        </h1>
      ) : (
        <h1 className="text-xl font-semibold ml-20 text-white h-4">GOOBER</h1>
      )}
      <div
        id="scrollDiv"
        className={`scrollDiv pt-4 ${
          size === "fullsize" ? "overflow-x-scroll overflow-y-hidden " : ""
        } ${
          daysOfWeek[dayOfWeekNumber] === weekdayTitle
            ? "bg-baseGray bg-opacity-20"
            : ""
        }`}
      >
        <div className={`${containerLength[size]} `}>
          {daysOfWeek[dayOfWeekNumber] === weekdayTitle ? (
            <div
              ref={barRef}
              id="timeBar"
              className={`${
                size === "fullsize" ? "fixed h-72" : "h-32"
              } z-40 w-[2px] bg-white mt-[-24px] ml-9`}
            ></div>
          ) : (
            <></>
          )}

          <div className="flex pl-4 ">
            {dataLoaded &&
              dayData.map((data, index) => (
                <TaskBlock
                  key={index}
                  blockSize={size}
                  title={data.title}
                  time={data.time}
                  priority={data.priority}
                  length={data.length}
                  startTime={data.startTime}
                />
              ))}
            {dataLoaded &&
              allStartTimes.map((time, index) => (
                <EmptyBlock key={index} startTime={time} />
              ))}
          </div>
          <div
            className={` fixed bottom-0 ${
              size === "fullsize" ? "block" : "hidden"
            }`}
          >
            <TimeLine />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodayContainer;

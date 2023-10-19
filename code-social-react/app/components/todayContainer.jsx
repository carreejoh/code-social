"use client";

import TaskBlock from "./taskBlock";
import TimeLine from "./timeline";
import { useState, useEffect, useRef } from "react";
import EmptyBlock from "./emptyBlock";

function TodayContainer({ size, routineData, day, dateIndex }) {
  const [dayData, setDayData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [weekdayTitle, setWeekdayTitle] = useState("");
  const barRef = useRef(null);
  const [datesArray, setDatesArray] = useState([]);

  // console.log(routineData + day)

  const date = new Date();
  const dayOfWeekNumber = date.getDay();

  const allStartTimes = [
    0, 30, 100, 130, 200, 230, 300, 330, 400, 430, 500, 530, 600, 630, 700,
    730, 800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330,
    1400, 1430, 1500, 1530, 1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930,
    2000, 2030, 2100, 2130, 2200, 2230, 2300, 2330,
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

  const containerLength = {
    fullsize:
      "w-[6178px] h-56 transform duration-[500ms] ease-[cubic-bezier(0.17,0.67,0.06,0.96)]",
    small: "w-[800px] h-44",
  };

  // MAKE ARRAY OF DATES

  useEffect(() => {
    const dates = [];

    for (let i = -1; i < 6; i++) {
      // starting from -1 to get yesterday's date
      const date = new Date();
      date.setDate(date.getDate() + i); // adding i days to the current date

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-indexed in JS
      const year = String(date.getFullYear()).slice(-2); // getting the last 2 digits of the year

      dates.push(`${month}/${day}/${year}`);
    }
    setDatesArray(dates);
  }, []);

  // Auto scroll left based on time of day

  // useEffect(() => {
  //   // Scroll main div to relevant time of day
  //   let scrollDivs = document.querySelectorAll(".scrollDiv");
  //   let date = new Date();
  //   let currentHour = date.getHours();
  //   let currentMinute = date.getMinutes();
  //   let totalMinutesElapsed = currentHour * 60 + currentMinute;

  //   // let scrollPosition = Math.floor(totalMinutesElapsed * 4.29 - 350);
  //   // scrollDivs.forEach((div) =>
  //   //   div.scrollTo({
  //   //     left: scrollPosition,
  //   //     behavior: "smooth",
  //   //   })
  //   // );

  //   // Scroll timebar to postion on load and then setinterval to move it
  //   let timeBarPosition = Math.floor(totalMinutesElapsed * 4.29 - 10);
  //   barRef.current.style.marginLeft = `${timeBarPosition}px`;
  //   setInterval(() => {
  //     if(barRef.current.style === null) {
  //       return;
  //     }
  //     let timeBarPosition;
  //     totalMinutesElapsed += 0.5;
  //     timeBarPosition = Math.floor(totalMinutesElapsed * 4.29 - 10);
  //     barRef.current.style.marginLeft = `${timeBarPosition}px`;
  //   }, 30000);
  // }, []);

  // Fetch each individual routine and populate main div with each task block

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Array.isArray(routineData) && routineData.length) {
          let dataArray = await Promise.all(
            routineData.map((id) => fetchIndividualRoutine(id))
          );
          setDayData(dataArray);
          setDataLoaded(true);
          setWeekdayTitle(dataArray[0]?.dayOfWeek);
        } else {
          console.error("routineData is not an array or is empty");
        }
      } catch (error) {
        console.error("Error Fetching Data Today Container", error);
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

  return (
    <>
      {dateIndex === 1 ? (
        <h1 className="text-lg ml-20 font-semibold text-black dark:text-white h-4">
          Today, {datesArray[dateIndex]}
        </h1>
      ) : (
        <h1 className="text-lg font-semibold ml-20 text-black dark:text-white h-4">
          {day}, {datesArray[dateIndex]}
        </h1>
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
          <div
            ref={barRef}
            className={`${
              dateIndex === 1 ? "block" : "hidden"
            } fixed z-[9999] h-[200px] w-[2px] bg-black dark:bg-white -mt-1`}
          ></div>
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
                  dateIndex={dateIndex}
                  routineId={data.id}
                  description={data.description}
                  date={datesArray[dateIndex]}
                  day={day}
                  relatedDays={data.dayOfWeek}
                />
              ))}
            {allStartTimes.map((time, index) => (
              <EmptyBlock key={index} startTime={time} dateIndex={dateIndex} />
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

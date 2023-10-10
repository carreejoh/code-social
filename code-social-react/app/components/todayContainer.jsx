"use client";

import TaskBlock from "./taskBlock";
import TimeLine from "./timeline";
import { useState, useEffect, useRef } from "react";

function TodayContainer({ size, routineData }) {
  const [dayData, setDayData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [weekdayTitle, setWeekdayTitle] = useState("")
  // const overflowDiv = useRef();

  // useEffect(() => {
  //   let date = new Date();
  //   let currentMinute = date.getMinutes();
  //   let scrollPosition = Math.floor(currentMinute * 4.29);
  //   overflowDiv.current.scrollTo(scrollPosition, 0);
  // }, []);

  useEffect(() => {
    let scrollDivs = document.querySelectorAll(".scrollDiv") 

    let date = new Date();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let totalMinutesElapsed = currentHour * 60 + currentMinute;

    let scrollPosition = Math.floor((totalMinutesElapsed * 4.29) - 175);
    console.log(totalMinutesElapsed)
    scrollDivs.forEach(div => div.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    }));
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await Promise.all(
          routineData.map((id) => fetchIndividualRoutine(id))
        );
        setDayData(dataArray);
        console.log(dataArray);
        setDataLoaded(true);
        setWeekdayTitle(dataArray[0]?.dayOfWeek)
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

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
      <h1 className="ml-20 text-xl">{weekdayTitle}</h1>
      <div
        // ref={overflowDiv}
        id="scrollDiv"
        className={`scrollDiv ${
          size === "fullsize" ? "overflow-x-scroll overflow-y-hidden" : ""
        }`}
      >
        <div className={`${containerLength[size]}`}>
          {/* <div
          className={`${
            size === "fullsize" ? "fixed h-72 " : "h-32"
          } z-40 w-[2px] bg-white ml-72 mt-[-24px] transition-all duration-[1500ms] ease-in-out`}
        ></div> */}
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
          </div>
          <div
            className={`mt-1 fixed bottom-0 ${
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

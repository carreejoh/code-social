"use client";
import { useState, useEffect, useRef } from "react";
import TodayContainer from "./todayContainer";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Auth from "../verify/auth";

function ScheduleContainer() {
  const splideRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeInMinutes, setTimeInMinutes] = useState(
    new Date().getHours() * 60 + new Date().getMinutes()
  );
  const [dayData, setDayData] = useState([]);
  const [splideRendered, setSplideRendered] = useState(false);

  // Make array in starting with today
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayIndex = new Date().getDay();
  const sortedDays = [
    ...daysOfWeek.slice(currentDayIndex),
    ...daysOfWeek.slice(0, currentDayIndex),
  ];

  // Scroll to relevant postion

  // Fetch relevant data if logged in on load
  useEffect(() => {
    if (Auth.loggedIn()) {
      let user = Auth.getProfile();
      let username = user.data.username;
      fetchRoutineController(username);
    }
  }, []);

  // For Clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();
      setTimeInMinutes(currentMinutes);
    }, 60000);

    console.log(timeInMinutes);
    return () => clearInterval(intervalId);
  }, []);

  // When splide is moved
  useEffect(() => {
    const splide = splideRef.current.splide;
    splide.on("moved", (newIndex) => {
      setActiveSlide(newIndex);
    });
    return () => {
      splide.off("moved");
    };
  });

  // Fetch all days of users routines

  async function fetchRoutineController(username) {
    let routineData = [];
    let response = await fetchIndividualDay(username);
    routineData.push(response.sunday);
    routineData.push(response.monday);
    routineData.push(response.tuesday);
    routineData.push(response.wednesday);
    routineData.push(response.thursday);
    routineData.push(response.friday);
    routineData.push(response.saturday);
    setDayData(routineData);
    setSplideRendered(true);
  }

  async function fetchIndividualDay(username) {
    try {
      const response = await fetch(
        `http://localhost:5050/api/routines/${username}`,
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
    // h-[calc(100vh-228px)]
    // Original height for div

    <div className="w-full h-full bg-darkBaseGray rounded-tl-lg">
      <div className="w-[calc(100vw-64px)] h-[100vh]">
        {/* {dayData.length === 7 && ( */}
        <Splide
          ref={splideRef}
          aria-label="List of schedules"
          options={{
            direction: "ttb",
            height: "864px",
            wheel: true,
            wheelSleep: 0,
            perPage: 3,
            perMove: 1,
            type: "loop",
          }}
        >
          {dayData.map((data, index) => (
            <SplideSlide
              // ref={overflowDiv}
              key={index}
              // className={
              //   activeSlide === index
              //     ? "active "
              //     : (activeSlide + 1 === index ? "h-20 bg-green-400" : "h-24 ") + "h-56 pt-8"
              // }
            >
              {/* <h1>{data[0]?.dayOfWeek}</h1> */}
              <div className={`transition-all duration-[400ms] ease-in-out`}>
                <TodayContainer
                  // size={activeSlide === index ? "fullsize" : "small"}
                  size={"fullsize"}
                  routineData={data}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
        {/* )} */}
        <div className="w-[500px] h-72 bg-darkestBaseGray p-2 rounded-lg fixed right-6 bottom-6">
          <h1 className="text-lg font-semibold">Quick Stats</h1>
          <div className="h-64 w-[210px] mt-2">
            <div className="flex">
              <div className="w-32">
                <div
                  className="radial-progress text-secondary"
                  style={{
                    "--value": "70",
                    "--size": "5rem",
                    "--thickness": ".4rem",
                  }}
                >
                  70%
                </div>
                  <h1 className="mt-1 text-xs text-gray-400">Highest Priority<br></br>Completion</h1>
              </div>
              <div className="w-32">
                <div
                  className="radial-progress text-primary"
                  style={{
                    "--value": "70",
                    "--size": "5rem",
                    "--thickness": ".4rem",
                  }}
                >
                  70%
                </div>
                  <h1 className="mt-1 text-xs text-gray-400">High Priority<br></br>Completion</h1>
              </div>
            </div>
            <div className="flex"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleContainer;

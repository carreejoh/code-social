"use client";
import { useState, useEffect, useRef } from "react";
import TodayContainer from "./todayContainer";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide-core.min.css";
import Auth from "../verify/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoutine
} from "../redux/reducers/counterSlice";

function ScheduleContainer() {
  const splideRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeInMinutes, setTimeInMinutes] = useState(
    new Date().getHours() * 60 + new Date().getMinutes()
  );
  const [dayData, setDayData] = useState([]);
  const [splideRendered, setSplideRendered] = useState(false);
  const [relevantDayList, setDayList] = useState([]);

  const dispatch = useDispatch();
  // const routines = useSelector((state) => state.routines.routines);

  const handleAddRoutine = (routine) => {
    dispatch(addRoutine(routine));
  };
  // Make array starting with yesterday

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const goNext = () => splideRef.current.splide.go("+");
  const goPrev = () => splideRef.current.splide.go("-");

  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    const sortedDays = [
      ...daysOfWeek.slice(currentDayIndex - 1),
      ...daysOfWeek.slice(0, currentDayIndex - 1),
    ];
    setDayList(sortedDays);
  }, []);

  // Scroll to relevant postion

  // Fetch relevant data if logged in on load
  useEffect(() => {
    if (Auth.loggedIn()) {
      let user = Auth.getProfile();
      let username = user?.data?.username;
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

  // Fetch all days of users routines

  function createWeekArray() {
    const currentDayIndex = new Date().getDay();
    const sortedDays = [
      ...daysOfWeek.slice(currentDayIndex - 1),
      ...daysOfWeek.slice(0, currentDayIndex - 1),
    ];
    return sortedDays;
  }

  // Master controller

  async function fetchRoutineController(username) {
    try {
      const weekArray = createWeekArray();
      const response = await fetchAllRoutineIds(username);
      if (!response) {
        return;
      }
      const orderedDays = await relevantDayOrder(response, weekArray);
      if (!orderedDays) {
        return;
      }
      const ids = [].concat(...Object.values(response).filter(Array.isArray));
      const uniqueIds = [...new Set(ids)];
      getAllIndividualRoutineData(uniqueIds)
    } catch (err) {
      console.error(err);
    }
    setSplideRendered(true);
  }

  // Aligns days in order relevant to current date

  async function relevantDayOrder(response, weekArray) {
    try {
      let newOrder = [];
      newOrder.push(response[weekArray[0]]);
      newOrder.push(response[weekArray[1]]);
      newOrder.push(response[weekArray[2]]);
      newOrder.push(response[weekArray[3]]);
      newOrder.push(response[weekArray[4]]);
      newOrder.push(response[weekArray[5]]);
      newOrder.push(response[weekArray[6]]);
      setDayData(newOrder);
      return true;
    } catch (err) {
      console.error(err);
    }
  }

  // API call

  async function getAllIndividualRoutineData(idList) {
    try {
      if(Array.isArray(idList)) {
        idList.forEach((id) => {
          fetchIndividualRoutine(id)
        })
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchAllRoutineIds(username) {
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
      handleAddRoutine(data)
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-full bg-baseWhite dark:bg-darkBaseGray rounded-tl-lg">
      <div className="fixed z-[100] right-8 bottom-8 p-3 text-center w-16 bg-baseWhite dark:bg-darkestBaseGray">
        <button
          onClick={goPrev}
          className="prev-button z-[100]  rounded-full justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="next-button z-[100]  rounded-full justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      {splideRendered === true && (
        <Splide
          hasTrack={false}
          ref={splideRef}
          aria-label="List of schedules"
          options={{
            direction: "ttb",
            height: "902px",
            wheel: true,
            wheelSleep: 0,
            perPage: 3,
            perMove: 1,
            // type: "loop",
          }}
        >
          <div className="w-[calc(100vw-64px)] h-full pt-2">
            <SplideTrack>
              {dayData.map((data, index) => (
                <SplideSlide key={index} className="">
                  <div
                    className={`transition-all duration-[400ms] ease-in-out h-full`}
                  >
                    <TodayContainer
                      // size={activeSlide === index ? "fullsize" : "small"}
                      size={"fullsize"}
                      routineData={data}
                      day={relevantDayList[index]}
                      dateIndex={index}
                    />
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
            <div className="splide__arrows"></div>
          </div>
        </Splide>
      )}
    </div>
    // </div>
  );
}

export default ScheduleContainer;

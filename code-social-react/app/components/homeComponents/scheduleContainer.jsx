"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import TodayContainer from "./todayContainer";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide-core.min.css";
import Auth from "../../verify/auth";
import { useDispatch, useSelector } from "react-redux";
import { addRoutine } from "../../redux/reducers/counterSlice";
import HomepageStats from "./homepageStats";
import DummyTaskBlock from "./dummyTaskBlock";
import HomepageGeneral from "./homepageGeneral";
import { Suspense } from "react";
import LoadingSpinner from "../globalComponents/loadingSpinner"

function ScheduleContainer({reloadComponent}) {
  const splideRef = useRef();
  const [timeInMinutes, setTimeInMinutes] = useState(
    new Date().getHours() * 60 + new Date().getMinutes()
  );
  const [dayData, setDayData] = useState([]);
  const [splideRendered, setSplideRendered] = useState(false);
  const [relevantDayList, setDayList] = useState([]);
  const [quickStats, toggleQuickStats] = useState(true);
  const [generalInfo, toggleGeneralInfo] = useState(true);
  const [indexBeforeGeneralInfo, toggleIndexBeforeGeneralInfo] =
    useState(false);
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
      getAllIndividualRoutineData(uniqueIds);
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

  const moveWelcomeDiv = (event) => {
    const splideIndex =
      splideRef.current.splide.Components.Controller.getIndex();
    if (splideIndex > 1) {
      return;
    }
    if (event.deltaY > 0 && generalInfo === true) {
      toggleGeneralInfo(false);
      toggleIndexBeforeGeneralInfo(false);
      splideRef.current.splide.go(0);
    }
    if (
      event.deltaY < 0 &&
      splideIndex === 0 &&
      indexBeforeGeneralInfo === false
    ) {
      toggleIndexBeforeGeneralInfo(true);
      return;
    }
    if (event.deltaY < 0 && splideIndex === 0) {
      toggleGeneralInfo(true);
    }
  };

  return (
    <Suspense fallback={<Loading/>}>
      {/* {Auth.loggedIn() && (
        <HomepageStats
          quickStats={quickStats}
          toggleQuickStats={toggleQuickStats}
        />
      )} */}
      {Auth.loggedIn() === true ? (
        <div
          className="w-full h-full bg-baseWhite dark:bg-darkBaseGray rounded-tl-lg"
          onWheel={moveWelcomeDiv}
        >
          {/* <div
            className={`${
              quickStats === false ? "hidden" : "block"
            } fixed z-[1000] right-0 top-[130px] h-10 w-24 bg-darkestBaseGray p-2 rounded-tl-2xl rounded-bl-2xl -mr-2 hover:mr-0 duration-75`}
          >
            <button
              className={`font-semibold `}
              onClick={() => toggleQuickStats(!quickStats)}
            >
              Stats
            </button>
          </div> */}
          <div className="fixed z-[100] right-8 bottom-8 p-3 text-center w-16">
            <button
              onClick={goPrev}
              className="prev-button z-[100] bg-darkestBaseGray h-12 w-12 pl-1 rounded-full justify-center items-center"
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
              className="next-button z-[100] mt-2 bg-darkestBaseGray h-12 w-12 pt-1 pl-1 rounded-full justify-center items-center"
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

          <div
            className={`${
              generalInfo === true
                ? "translate-y-0 block h-[30vh]"
                : "translate-y-[-940px] h-[10vh]"
            } w-full z-[40] fixed duration-[200ms] ease-in-out`}
            onWheel={moveWelcomeDiv}
          >
            {dayData && <HomepageGeneral dayData={dayData[1]} />}
          </div>

          <div
            className={`${
              generalInfo === true ? "pt-[300px] block" : "pt-[0px]"
            } duration-[200ms] ease-in-out`}
          ></div>

          <Suspense fallback={<Loading/>}>
            <Splide
              hasTrack={false}
              ref={splideRef}
              aria-label="List of schedules"
              // onMoved={checkSplideActive}
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
                          reloadComponent={reloadComponent}
                        />
                      </div>
                    </SplideSlide>
                  ))}
                </SplideTrack>
                <div className="splide__arrows"></div>
              </div>
            </Splide>
          </Suspense>
        </div>
      ) : (
        <div className="w-full h-full bg-baseWhite dark:bg-darkBaseGray rounded-tl-lg pl-64 pr-64 pt-32">
          <div className="w-full h-48 flex">
            <div className="h-32 mt-11">
              <h1 className="text-black dark:text-white text-2xl font-semibold w-72">
                Simplify your schedule
              </h1>
              <h3 className="text-black dark:text-white text-sm w-72 mt-2">
                Create reusable routines that are easy to manage.
              </h3>
            </div>
            <DummyTaskBlock
              title={"Meditate"}
              complete={true}
              length={30}
              priority={"High"}
            />
            <DummyTaskBlock
              title={"Eat/Commute"}
              complete={false}
              length={90}
            />
            <DummyTaskBlock
              title={"Swim"}
              complete={true}
              length={60}
              priority={"Highest"}
            />
            <DummyTaskBlock title={"Relax"} complete={false} length={60} />
          </div>
          {/* <div className="w-full h-48 flex mt-24">
            <div className="h-32 mt-11">
              <h1 className="text-black dark:text-white text-2xl font-semibold w-72">
                Track your stats
              </h1>
              <h3 className="text-black dark:text-white text-sm w-72 mt-2">Track all relevant statistics, and use them to stay focused.</h3>
            </div>
            
          </div> */}
        </div>
      )}
    </Suspense>
  );
  async function getAllIndividualRoutineData(idList) {
    try {
      if (Array.isArray(idList)) {
        idList.forEach((id) => {
          fetchIndividualRoutine(id);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchAllRoutineIds(username) {
    try {
      const response = await fetch(
        `https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/${username}`,
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
        `https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/individ/${routineId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      handleAddRoutine(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

function Loading() {
  return <h1>LOADING...</h1>
}

export default ScheduleContainer;

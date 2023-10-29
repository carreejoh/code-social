"use client";

import { useState, useEffect } from "react";
import { taskLengths, timeStart, weekdayToIndex } from "../verify/lengthArrays";
import TaskBlockEdit from "./taskBlockEdit";
import Auth from "../verify/auth";
import { useSelector } from "react-redux";
import { selectRoutineById } from "../redux/selectors";
import { editRoutine } from "../redux/reducers/counterSlice";
import { useDispatch } from "react-redux";
import {
  incrementTotal,
  incrementHighest,
  incrementHigh,
  setHighestPer,
  setHighPer,
} from "../redux/reducers/statsSlice";

function TaskBlock({
  title,
  time,
  priority,
  routineId,
  date,
  length,
  blockSize,
  startTime,
  dateIndex,
  day,
  description,
  relatedDays,
}) {
  const [username, setUsername] = useState("");
  const [taskComplete, setTaskComplete] = useState(false);
  const [taskCompleteLocal, setTaskCompleteLocal] = useState(true);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [editBlock, setEditBlock] = useState(false);
  let routine = useSelector((state) => selectRoutineById(state, routineId));
  const dispatch = useDispatch();

  const handleEditRoutine = () => {
    let updatedRoutine = {};
    updatedRoutine = {
      id: routineId,
      title: title,
      description: descriptionInput,
    };
    dispatch(editRoutine(updatedRoutine));
  };

  useEffect(() => {
    setTitleInput(title);
    setDescriptionInput(description);
    setTaskOccurance();
    setUsernameOnLoad();
    checkIfCompleted();
  }, []);

  function setUsernameOnLoad() {
    let user = Auth.getProfile();
    let username = user.data.username;
    setUsername(username);
  }

  function checkIfCompleted() {
    let localStorageTask = localStorage.getItem(`${routineId}${date}`);
    if (!localStorageTask) {
      setTaskCompleteLocal(false);
    }
    if (localStorageTask && priority !== "Nan") {
      setTaskComplete(true);
    }
  }

  const saveDescriptionTimeout = () => {
    handleEditRoutine();
    const fetchInterval = setTimeout(() => {
      updateRoutineValues();
    }, 3000);

    return () => clearTimeout(fetchInterval);
  };

  function setTaskOccurance() {
    if (dateIndex === 1) {
      let localStorageOccurance = localStorage.getItem(
        `${routineId}${date}occur`
      );
      if (localStorageOccurance === true) {
        return;
      }
      if (!localStorageOccurance) {
        localStorage.setItem(`${routineId}${date}occur`, true);
        incrementStatOccured();
        return;
      }
    }
  }

  async function completeTask() {
    dispatch(incrementTotal(1));
    if (priority === "Highest") {
      dispatch(incrementHighest(1));
    }
    if (priority === "High") {
      dispatch(incrementHigh(1));
    }
    let localStorageTask = localStorage.getItem(`${routineId}${date}`);
    if (!localStorageTask) {
      setTaskComplete(true);
      let body = {
        highOc: 0,
        highestOc: 0,
        highComp: 0,
        highestComp: 0,
        weekOccurIndex: 0,
        weekOccurIncre: 0,
        weekCompIndex: 0,
        weekCompIncre: 1,
      };
      priority === "Highest"
        ? (body.highestComp += 1)
        : (body.highestComp += 0);
      priority === "High" ? (body.highComp += 1) : (body.highComp += 0);
      body.weekCompIndex = weekdayToIndex[day];
      const usableJson = JSON.stringify(body);
      const userStats = await incrementUserStats(usableJson, username);
      localStorage.setItem(`${routineId}${date}`, true);
    } else {
      console.log("This task already compelte ");
    }
  }

  // When Description is changed, setTimeout for minimal fetches

  async function incrementStatOccured() {
    let body = {
      highOc: 0,
      highestOc: 0,
      highComp: 0,
      highestComp: 0,
      weekOccurIndex: 0,
      weekOccurIncre: 0,
      weekCompIndex: 0,
      weekCompIncre: 0,
    };
    priority === "Highest" ? (body.highestOc += 1) : (body.highestOc += 0);
    priority === "High" ? (body.highOc += 1) : (body.highOc += 0);
    const usableJson = JSON.stringify(body);
    const userStats = await incrementUserStats(usableJson, username);
  }

  return (
    <>
      <div
        className={`bg-lightModeGray dark:bg-baseGray shadow-xl p-2 rounded-lg mr-[2px]  ${
          blockSize === "fullsize"
            ? `${taskLengths[length]} ${timeStart[startTime]} absolute`
            : taskLengthSmall[length]
        } ${
          dateIndex === 0
            ? " dark:border-yellow-600 border-yellow-500"
            : dateIndex === 1
            ? "dark:border-green-500 border-green-500"
            : "dark:border-customBlue border-customBlue"
          // dateIndex === 0 ? " border-customPurple" : dateIndex === 1 ? "border-customPink" : "border-customCyan"
        } ${
          editBlock === true ? "z-50" : "z-40"
        } dark:border-[1px] border-[1px] `}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div
              className={`${
                length === "length30" ? "" : "flex"
              } w-full justify-between`}
            >
              <div className="">
                <h1
                  className="text-sm font-semibold cursor-pointer text-black dark:text-white"
                  onClick={() => setEditBlock(true)}
                >
                  {routine.title}
                </h1>
              </div>
              <div
                className={`${priority === "Highest" ? "" : "hidden"} ${
                  blockSize === "fullsize"
                    ? "text-lg badge-md"
                    : "text-xs badge-xs"
                } badge font-semibold badge-secondary`}
              >
                !!!
              </div>
              <div
                className={`${priority === "High" ? "" : "hidden"} ${
                  blockSize === "fullsize"
                    ? "text-lg badge-md"
                    : "text-xs badge-xs"
                } badge text-white font-semibold badge-primary`}
              >
                !
              </div>
            </div>
            <div className={`mt-1`}>
              <textarea
                onChange={(e) => {
                  setDescriptionInput(e.target.value);
                  handleEditRoutine();
                  saveDescriptionTimeout();
                }}
                defaultValue={routine.description}
                className="text-sm text-black dark:text-gray-400 w-full h-[120px] max-h-[120px] min-h-[120px] resize-none bg-transparent focus:focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div
            className={`justify-between h-6 ${
              blockSize === "fullsize" ? "flex" : "hidden"
            }`}
          >
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={() => setEditBlock(true)}
                className={`${
                  editBlock ? "hidden" : ""
                } w-6 h-6 text-black dark:text-white cursor-pointer hover:scale-95 duration-100`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {editBlock && (
                <TaskBlockEdit
                  closeBtn={() => setEditBlock(false)}
                  length={length}
                  title={title}
                  description={description}
                  priority={priority}
                  relatedDays={relatedDays}
                  routineId={routineId}
                />
              )}
            </div>
            <button
              onClick={() => completeTask()}
              className={`btn btn-xs dark:btn-outline btn-success hover:bg-green text-black dark:text-green-500 ${
                taskComplete === false ? "block" : "hidden"
              } ${dateIndex >= 2 ? "hidden" : "block"} ${
                priority === "Nan" ? "hidden" : "block"
              } ${taskCompleteLocal === false ? "block" : "hidden"}`}
            >
              Complete
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-7 w-7 text-green-500 dark:text-green-500 ${
                taskComplete === true ? "block" : "hidden"
              } `}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );

  // ALL FETCH/API FUNCTIONS

  async function updateRoutineValues() {
    let body = {
      title: titleInput,
      description: descriptionInput,
    };
    const usableJson = JSON.stringify(body);
    const response = await fetch(
      `https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/individ/${routineId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: usableJson,
      }
    );
    const data = await response.json();
    if (!data) {
      console.error("fetch invalid, try again");
    }
  }

  async function incrementUserStats(statsBody) {
    let user = await Auth.getProfile();
    let username = user.data.username;
    try {
      const response = await fetch(
        `https://routine-server-87a5f72bed6e.herokuapp.com/api/users/stats/${username}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: statsBody,
        }
      );
      const data = await response.json();
      console.log(data.statSheet);
      dispatch(setHighestPer(data.statsheet.highestPriorityPercent));
      dispatch(setHighPer(data.statSheet.highPriorityPercent));
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
export default TaskBlock;

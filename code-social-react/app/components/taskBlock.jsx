"use client";

import { useState, useEffect } from "react";
import { taskLengths, timeStart, weekdayToIndex } from "../verify/lengthArrays";
import TaskBlockEdit from "./taskBlockEdit";
import Auth from "../verify/auth";

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
}) {
  const [username, setUsername] = useState("");
  const [taskComplete, setTaskComplete] = useState(false);
  const [taskCompleteLocal, setTaskCompleteLocal] = useState(true);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [editBlock, setEditBlock] = useState(false);

  useEffect(() => {
    setTitleInput(title);
    setDescriptionInput(description);
    let user = Auth.getProfile();
    let username = user.data.username;
    setUsername(username);
    let localStorageTask = localStorage.getItem(`${routineId}${date}`);
    if (!localStorageTask) {
      setTaskCompleteLocal(false);
      return;
    }
    if (localStorageTask && priority !== "Nan") {
      setTaskComplete(true);
    }
  }, []);

  // FOR COMPLETE BUTTON

  async function completeTask() {
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
      const userStats = await incrementUserStats(usableJson);
      localStorage.setItem(`${routineId}${date}`, true);
    } else {
      console.log("This task already compelte ");
    }
  }

  async function incrementUserStats(statsBody) {
    try {
      const response = await fetch(
        `http://localhost:5050/api/users/stats/${username}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: statsBody,
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  // When Title or Description are changed, setTimeout for minimal fetches

  useEffect(() => {
    const fetchInterval = setTimeout(() => {
      updateRoutineValues();
    }, 3000);

    return () => clearTimeout(fetchInterval);
  }, [titleInput, descriptionInput]);

  async function updateRoutineValues() {
    let body = {
      title: titleInput,
      description: descriptionInput,
    };
    const usableJson = JSON.stringify(body);
    const response = await fetch(
      `http://localhost:5050/api/routines/individ/${routineId}`,
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
    console.log(data);
  }

  return (
    <>
      {/* <dialog id="edit_modal" >
        <TaskBlockEdit
         />
      </dialog> */}
      <div
        className={`bg-lightestGray dark:bg-baseGray shadow-xl p-2 rounded-lg mr-[2px]  ${
          blockSize === "fullsize"
            ? `${taskLengths[length]} ${timeStart[startTime]} z-40 absolute`
            : taskLengthSmall[length]
        } ${
          dateIndex === 0 ? " border-red-800" : "border-green-800"
        } border-[1px] `}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div
              className={`${
                length === "length30" ? "" : "flex"
              } w-full justify-between`}
            >
              <div className="-mt-[4px]">
                <input
                  className={`text-sm font-semibold text-white bg-transparent focus:outline-none`}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  type="text"
                ></input>
                <h1
                  className={`${
                    blockSize === "fullsize"
                      ? "text-md font-semibold"
                      : "text-[9px]"
                  } text-gray-400`}
                >
                  {time}
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
                onChange={(e) => setDescriptionInput(e.target.value)}
                defaultValue={descriptionInput}
                className="text-sm text-gray-400 w-full h-[120px] max-h-[120px] min-h-[120px] resize-none bg-transparent focus:focus:outline-none"
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
                } w-6 h-6 cursor-pointer hover:scale-95 duration-100`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {editBlock && (
                <div className="h-32 w-96 z-[9999] fixed bg-darkestBaseGray -mt-[104px] p-1">
                  <h1 className="text-sm text-black dark:text-white">
                    Active Days
                  </h1>
                  <div className="flex">
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                      />
                    </label>
                  </div>
                  <div className="flex">
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                        checked="checked"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                      />
                    </label>
                    <label className="cursor-pointer label">
                      <span className="label-text mr-1">Tue</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        name="tuesday"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => completeTask()}
              className={`btn btn-xs btn-success btn-outline ${
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
              className={`h-7 w-7 text-green-500 ${
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
}

export default TaskBlock;

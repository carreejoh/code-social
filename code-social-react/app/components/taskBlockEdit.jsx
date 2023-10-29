"use client";
import { editModalMarginLeft } from "../verify/lengthArrays";
import { useState, useEffect } from "react";
import Auth from "../verify/auth";

// REDUX TEST

import { useDispatch, useSelector } from "react-redux";
import { addRoutine, editRoutine } from "../redux/reducers/counterSlice";
import { selectRoutineById } from "../redux/selectors";

function TaskBlockEdit({
  closeBtn,
  length,
  title,
  description,
  priority,
  relatedDays,
  routineId,
}) {

  const dispatch = useDispatch();
  let routine = useSelector(state => selectRoutineById(state, routineId))

  const [sunday, checkSunday] = useState(false);
  const [monday, checkMonday] = useState(false);
  const [tuesday, checkTuesday] = useState(false);
  const [wednesday, checkWednesday] = useState(false);
  const [thursday, checkThursday] = useState(false);
  const [friday, checkFriday] = useState(false);
  const [saturday, checkSaturday] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [username, setUsername] = useState("");

  const allDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const handleEditRoutine = () => {
    let updatedRoutine = {
      id: routineId,
      title: titleInput,
      description: descriptionInput,
      priority: newPriority
    };
    dispatch(editRoutine(updatedRoutine))
    console.log(routine)
  }

  useEffect(() => {
    let user = Auth.getProfile();
    let username = user.data.username;
    setUsername(username);
    setTitleInput(title);
    setDescriptionInput(description);
    setNewPriority(priority);
    allDays.forEach((day) => {
      if (relatedDays.includes("sunday")) {
        checkSunday(true);
      }
      if (relatedDays.includes("monday")) {
        checkMonday(true);
      }
      if (relatedDays.includes("tuesday")) {
        checkTuesday(true);
      }
      if (relatedDays.includes("wednesday")) {
        checkWednesday(true);
      }
      if (relatedDays.includes("thursday")) {
        checkThursday(true);
      }
      if (relatedDays.includes("friday")) {
        checkFriday(true);
      }
      if (relatedDays.includes("saturday")) {
        checkSaturday(true);
      }
    });
  }, []);

  async function updateRoutineMaster() {
    let updatedDaysArray = [];
    monday ? updatedDaysArray.push("monday") : "";
    tuesday ? updatedDaysArray.push("tuesday") : "";
    wednesday ? updatedDaysArray.push("wednesday") : "";
    thursday ? updatedDaysArray.push("thursday") : "";
    friday ? updatedDaysArray.push("friday") : "";
    saturday ? updatedDaysArray.push("saturday") : "";
    sunday ? updatedDaysArray.push("sunday") : "";
    let body = {
      title: titleInput,
      description: descriptionInput,
      dayOfWeek: updatedDaysArray,
      priority: newPriority,
      username: username,
    };
    const editRoutine = await editExistingRoutine(body)
    const deleteAll = await removeRoutinesFromUser()
    const addNew = await addRoutineToUser(body);
    closeBtn();
    window.location.href = "/"
  }

  async function removeRoutinesFromUser() {
    try {
      const usableJson = JSON.stringify({dayOfWeek: allDays})
      console.log(usableJson)
      console.log(routineId)
      const response = await fetch(
        `https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/delete/${username}/${routineId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: usableJson
        }
      );
      const data = await response.json()
      if(!data) {
        return false
      }
      return true
    } catch (err) {
      console.error(err);
    }
  }

  async function editExistingRoutine(body) {
    const usableJson = JSON.stringify(body);
    console.log(usableJson)
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
    return data;
  }


  async function addRoutineToUser(body) {
    const usableJson = JSON.stringify(body);
    const response = await fetch(
      `https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/add/${username}/${routineId}`,
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
    return data;
  }

  return (
    <div
      className={`h-56 w-[500px] z-[9999] fixed bg-darkestBaseGray -mt-[166px] p-2 rounded-md ${editModalMarginLeft[length]}`}
    >
      <div className="flex justify-between border-b-[1px] border-lightestGray">
        <input
          className={`text-md font-semibold text-white dark:text-white bg-transparent focus:outline-none`}
          defaultValue={title}
          onChange={(e) => {setTitleInput(e.target.value); handleEditRoutine()}}
          type="text"
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 cursor-pointer"
          onClick={closeBtn}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="">
        <textarea
          onChange={(e) => {setDescriptionInput(e.target.value); handleEditRoutine()}}
          defaultValue={description}
          className="text-sm text-gray-400 w-full h-[80px] max-h-[80px] min-h-[80px] resize-none bg-transparent focus:outline-none border-lightestGray"
        ></textarea>
        <h4 className="text-xs mt-2 w-full border-t-[1px] border-lightestGray pt-1">
          Selected Days:
        </h4>
        <div className="flex">
          <button
            onClick={() => checkSunday(!sunday)}
            className={`${
              sunday === true ? "text-blue-500" : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Sun
          </button>
          <button
            onClick={() => checkMonday(!monday)}
            className={`${
              monday === true ? "text-blue-500" : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Mon
          </button>
          <button
            onClick={() => checkTuesday(!tuesday)}
            className={`${
              tuesday === true ? "text-blue-500  " : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Tue
          </button>
          <button
            onClick={() => checkWednesday(!wednesday)}
            className={`${
              wednesday === true ? "text-blue-500" : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Wed
          </button>
          <button
            onClick={() => checkThursday(!thursday)}
            className={`${
              thursday === true ? "text-blue-500" : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Thurs
          </button>
          <button
            onClick={() => checkFriday(!friday)}
            className={`${
              friday === true ? "text-blue-500" : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Fri
          </button>
          <button
            onClick={() => checkSaturday(!saturday)}
            className={`${
              saturday === true ? "text-blue-500" : "text-gray-500"
            } mr-3 text-md font-semibold duration-75`}
          >
            Sat
          </button>
        </div>
        <h4 className="text-xs mt-2">Priority:</h4>
        <div className="flex justify-between ">
          <div className="flex">
            <button
              onClick={() => setNewPriority("Nan")}
              className={`${
                newPriority === "Nan" ? "text-gray-200" : "text-gray-500"
              } mr-3 font-semibold`}
            >
              Lowest
            </button>
            <button
              onClick={() => setNewPriority("High")}
              className={`${
                newPriority === "High" ? "text-customPurple" : "text-gray-500"
              } mr-3 font-semibold`}
            >
              High
            </button>
            <button
              onClick={() => setNewPriority("Highest")}
              className={`${
                newPriority === "Highest" ? "text-customPink" : "text-gray-500"
              } mr-3 font-semibold`}
            >
              Highest
            </button>
          </div>
          <button
            onClick={() => updateRoutineMaster()}
            className="hover:scale-95 duration-100 text-white dark:text-white "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskBlockEdit;

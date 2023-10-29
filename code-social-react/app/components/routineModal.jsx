"use client"

import MathMod from "../verify/math"
import Auth from "../verify/auth"
import { useState, useRef } from "react";

function RoutineModal() {

  const [sunday, checkSunday] = useState(false);
  const [monday, checkMonday] = useState(false);
  const [tuesday, checkTuesday] = useState(false);
  const [wednesday, checkWednesday] = useState(false);
  const [thursday, checkThursday] = useState(false);
  const [friday, checkFriday] = useState(false);
  const [saturday, checkSaturday] = useState(false);
  const [priority, setPriority] = useState("Nan");

  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const titleRef = useRef("");
  const descriptionRef = useRef("");

  async function handleRoutineForm() {
    let dayOfWeek = [];
    const verifyForm = await checkFormData();

    if (verifyForm === false) {
      return;
    }

    sunday === true ? dayOfWeek.push("sunday") : "";
    monday === true ? dayOfWeek.push("monday") : "";
    tuesday === true ? dayOfWeek.push("tuesday") : "";
    wednesday === true ? dayOfWeek.push("wednesday") : "";
    thursday === true ? dayOfWeek.push("thursday") : "";
    friday === true ? dayOfWeek.push("friday") : "";
    saturday === true ? dayOfWeek.push("saturday") : "";

    postRoutine(dayOfWeek);
  }

  async function postRoutine(dayOfWeek) {
    // Convert form data to api data
    let startTime = await MathMod.timeStringToNumber(startTimeRef.current.value);
    let endTime = await MathMod.timeStringToNumber(endTimeRef.current.value);
    let firstLength = endTime - startTime;
    let length = await MathMod.convertToMinutes(firstLength);
    let user = Auth.getProfile();
    let username = user.data.username;
    let title = titleRef.current.value;
    let description = descriptionRef.current.value;

    if (!username) {
      alert("Log in to save routines");
      return;
    }

    const newRoutine = await fetch(
      "https://routine-server-87a5f72bed6e.herokuapp.com/api/routines/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          dayOfWeek,
          title,
          description,
          length,
          startTime,
          endTime,
          priority,
        }),
      }
    );
    const routine = await newRoutine.json();
    console.log(routine);
  }

  // Validate all criteria is met

  function checkFormData() {
    if (
      !sunday &&
      !monday &&
      !tuesday &&
      !wednesday &&
      !thursday &&
      !friday &&
      !saturday &&
      !sunday
    ) {
      alert("No days selected");
      return false;
    }
    if (startTimeRef === "" || endTimeRef === "") {
      alert("Please select start and end times");
      return false;
    }
    if (titleRef.current.value === "") {
      alert("Please add a title");
      return false;
    }
  }

  return (
    <>
      <div className="modal-box bg-darkestBaseGray dark:bg-darkestBaseGray p-2 rounded-lg ">
        {/* <label>Title</label> */}
        <div className="flex w-full justify-between h-8">

          <input
            ref={titleRef}
            type="text"
            name="title"
            placeholder="Event Title"
            className="bg-transparent focus:outline-none font-semibold p-[2px] text-lg mb-1"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer"
            onClick={() => document.getElementById("add_routine_modal").close()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <textarea
          ref={descriptionRef}
          name="description"
          placeholder="Description"
          className="w-full mb-1 border-lightestGray max-h-48 h-24 p-[3px] focus:outline-none bg-transparent"
        ></textarea>
        <div className="h-[1px] dark:bg-darkestBaseGray w-[100%]"></div>
        {/* <label className="">Priority</label> */}
        <div className="flex w-full mt-1 h-9 justify-between">
          {/* <div className="h-12 w-[1px] bg-lightestGray">

                </div> */}
          <div className="flex ml-1">
            <select
              ref={startTimeRef}
              defaultValue={"default"}
              name="startTime"
              className="select select-bordered max-w-xs max-h-20 select-sm focus:outline-none"
            >
              <option disabled>Start Time</option>
              <option className="text-white">00:00</option>
              <option className="text-white">00:30</option>
              <option className="text-white">01:00</option>
              <option className="text-white">01:30</option>
              <option className="text-white">02:00</option>
              <option className="text-white">02:30</option>
              <option className="text-white">03:00</option>
              <option className="text-white">03:30</option>
              <option className="text-white">04:00</option>
              <option className="text-white">04:30</option>
              <option className="text-white">05:00</option>
              <option className="text-white">05:30</option>
              <option className="text-white">06:00</option>
              <option className="text-white">06:30</option>
              <option className="text-white">07:00</option>
              <option className="text-white">07:30</option>
              <option className="text-white">08:00</option>
              <option className="text-white">08:30</option>
              <option className="text-white">09:00</option>
              <option className="text-white">09:30</option>
              <option className="text-white">10:00</option>
              <option className="text-white">10:30</option>
              <option className="text-white">11:00</option>
              <option className="text-white">11:30</option>
              <option className="text-white">12:00</option>
              <option className="text-white">12:30</option>
              <option className="text-white">13:00</option>
              <option className="text-white">13:30</option>
              <option className="text-white">14:00</option>
              <option className="text-white">14:30</option>
              <option className="text-white">15:00</option>
              <option className="text-white">15:30</option>
              <option className="text-white">16:00</option>
              <option className="text-white">16:30</option>
              <option className="text-white">17:00</option>
              <option className="text-white">17:30</option>
              <option className="text-white">18:00</option>
              <option className="text-white">18:30</option>
              <option className="text-white">19:00</option>
              <option className="text-white">19:30</option>
              <option className="text-white">20:00</option>
              <option className="text-white">20:30</option>
              <option className="text-white">21:00</option>
              <option className="text-white">21:30</option>
              <option className="text-white">22:00</option>
              <option className="text-white">22:30</option>
              <option className="text-white">23:00</option>
              <option className="text-white">23:30</option>
            </select>
            <select
              ref={endTimeRef}
              name="endTime"
              className="select select-bordered max-w-xs select-sm focus:outline-none ml-2"
            >
              <option disabled>End Time</option>
              <option className="text-white">00:00</option>
              <option className="text-white">00:30</option>
              <option className="text-white">01:00</option>
              <option className="text-white">01:30</option>
              <option className="text-white">02:00</option>
              <option className="text-white">02:30</option>
              <option className="text-white">03:00</option>
              <option className="text-white">03:30</option>
              <option className="text-white">04:00</option>
              <option className="text-white">04:30</option>
              <option className="text-white">05:00</option>
              <option className="text-white">05:30</option>
              <option className="text-white">06:00</option>
              <option className="text-white">06:30</option>
              <option className="text-white">07:00</option>
              <option className="text-white">07:30</option>
              <option className="text-white">08:00</option>
              <option className="text-white">08:30</option>
              <option className="text-white">09:00</option>
              <option className="text-white">09:30</option>
              <option className="text-white">10:00</option>
              <option className="text-white">10:30</option>
              <option className="text-white">11:00</option>
              <option className="text-white">11:30</option>
              <option className="text-white">12:00</option>
              <option className="text-white">12:30</option>
              <option className="text-white">13:00</option>
              <option className="text-white">13:30</option>
              <option className="text-white">14:00</option>
              <option className="text-white">14:30</option>
              <option className="text-white">15:00</option>
              <option className="text-white">15:30</option>
              <option className="text-white">16:00</option>
              <option className="text-white">16:30</option>
              <option className="text-white">17:00</option>
              <option className="text-white">17:30</option>
              <option className="text-white">18:00</option>
              <option className="text-white">18:30</option>
              <option className="text-white">19:00</option>
              <option className="text-white">19:30</option>
              <option className="text-white">20:00</option>
              <option className="text-white">20:30</option>
              <option className="text-white">21:00</option>
              <option className="text-white">21:30</option>
              <option className="text-white">22:00</option>
              <option className="text-white">22:30</option>
              <option className="text-white">23:00</option>
              <option className="text-white">23:30</option>
            </select>
          </div>
        </div>
        <h4 className="text-xs mt-2 w-full border-t-[1px] border-lightestGray pt-1">
          Selected Days:
        </h4>
        <div className="flex">
          <button
            onClick={() => checkSunday(!sunday)}
            className={`${sunday === true ? "text-blue-500" : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Sun
          </button>
          <button
            onClick={() => checkMonday(!monday)}
            className={`${monday === true ? "text-blue-500" : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Mon
          </button>
          <button
            onClick={() => checkTuesday(!tuesday)}
            className={`${tuesday === true ? "text-blue-500  " : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Tue
          </button>
          <button
            onClick={() => checkWednesday(!wednesday)}
            className={`${wednesday === true ? "text-blue-500" : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Wed
          </button>
          <button
            onClick={() => checkThursday(!thursday)}
            className={`${thursday === true ? "text-blue-500" : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Thurs
          </button>
          <button
            onClick={() => checkFriday(!friday)}
            className={`${friday === true ? "text-blue-500" : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Fri
          </button>
          <button
            onClick={() => checkSaturday(!saturday)}
            className={`${saturday === true ? "text-blue-500" : "text-gray-500"
              } mr-3 text-md font-semibold duration-75`}
          >
            Sat
          </button>
        </div>
        <h4 className="text-xs mt-2">Priority:</h4>
        <div className="flex justify-between ">
          <div className="flex">
            <button
              onClick={() => setPriority("Nan")}
              className={`${priority === "Nan" ? "text-gray-200" : "text-gray-500"
                } mr-3 font-semibold`}
            >
              Lowest
            </button>
            <button
              onClick={() => setPriority("High")}
              className={`${priority === "High" ? "text-customPurple" : "text-gray-500"
                } mr-3 font-semibold`}
            >
              High
            </button>
            <button
              onClick={() => setPriority("Highest")}
              className={`${priority === "Highest" ? "text-customPink" : "text-gray-500"
                } mr-3 font-semibold`}
            >
              Highest
            </button>
          </div>
          <button
            onClick={() => handleRoutineForm()}
            type="submit"
            className="hover:scale-95 duration-100 text-white dark:text-white "
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default RoutineModal;
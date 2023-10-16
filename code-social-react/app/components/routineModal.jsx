"use client"

import MathMod from "../verify/math"
import Auth from "../verify/auth"

function RoutineModal() {


    async function handleRoutineForm(e) {
        e.preventDefault();
        let dayOfWeek = [];
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const verifyForm = await checkFormData(formJson);
    
        if (verifyForm === false) {
          return;
        }
    
        formJson.sunday ? dayOfWeek.push("sunday") : "";
        formJson.monday ? dayOfWeek.push("monday") : "";
        formJson.tuesday ? dayOfWeek.push("tuesday") : "";
        formJson.wednesday ? dayOfWeek.push("wednesday") : "";
        formJson.thursday ? dayOfWeek.push("thursday") : "";
        formJson.friday ? dayOfWeek.push("friday") : "";
        formJson.saturday ? dayOfWeek.push("saturday") : "";
        postRoutine(formJson, dayOfWeek);
        console.log(formJson);
      }
    
      async function postRoutine(routineData, dayOfWeek) {
        // Convert form data to api data
        let startTime = await MathMod.timeStringToNumber(routineData.startTime);
        let endTime = await MathMod.timeStringToNumber(routineData.endTime);
        let firstLength = endTime - startTime;
        let length = await MathMod.convertToMinutes(firstLength);
        let user = Auth.getProfile();
        let username = user.data.username;
    
        if (!username) {
          alert("Log in to save routines");
          return;
        }
    
        let priority = routineData.priority;
        let title = routineData.title;
        let description = routineData.description;
        // let dayOfWeek = routineData.dayOfWeek
    
        const newRoutine = await fetch(
          "http://localhost:5050/api/routines/create",
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
    
      function checkFormData(form) {
        if (
          !form.sunday &&
          !form.monday &&
          !form.tuesday &&
          !form.wednesday &&
          !form.thursday &&
          !form.friday &&
          !form.saturday &&
          !form.sunday
        ) {
          alert("No days selected");
          return false;
        }
        if (!form.startTime || !form.endTime) {
          alert("Please select start and end times");
          return false;
        }
        if (!form.title) {
          alert("Please add a title");
          return false;
        }
      }

    return(
        <>
          <div className="modal-box bg-baseGray p-2 rounded-lg ">
            <form
              className="w-full h-full bg-baseGray"
              onSubmit={handleRoutineForm}
            >
              {/* <label>Title</label> */}
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                className="bg-transparent focus:outline-none font-semibold p-[3px] text-lg mb-1"
              ></input>
              <textarea
                name="description"
                placeholder="Description"
                className="w-full mt-1 mb-1 border-lightestGray max-h-48 h-24 p-[3px] focus:outline-none bg-transparent"
              ></textarea>
              <div className="h-[1px] bg-lightestGray w-[100%]"></div>
              {/* <label className="">Priority</label> */}
              <div className="flex w-full mt-1 h-9 justify-between">
                <select
                  defaultValue={"default"}
                  className="select select-bordered w-[33%] max-w-xs select-sm focus:outline-none mr-1"
                  name="priority"
                >
                  <option disabled>Priority?</option>
                  <option className="text-white">Nan</option>
                  <option className="text-[#641AE6]">High</option>
                  <option className="text-[#D926A9]">Highest</option>
                </select>
                {/* <div className="h-12 w-[1px] bg-lightestGray">

                </div> */}
                <div className="flex ml-1">
                  <select
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
              {/* <div className="h-[1px] bg-lightestGray w-[100%]"></div> */}
              <div className="flex">
                <label className="cursor-pointer label">
                  <span className="label-text mr-1">Sun</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    name="sunday"
                  />
                </label>
                <label className="cursor-pointer label">
                  <span className="label-text mr-1">Mon</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    name="monday"
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
                  <span className="label-text mr-1">Wed</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    name="wednesday"
                  />
                </label>
                <label className="cursor-pointer label">
                  <span className="label-text mr-1">Thurs</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    name="thursday"
                  />
                </label>
              </div>
              <div className="flex">
                <label className="cursor-pointer label">
                  <span className="label-text mr-1">Fri</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    name="friday"
                  />
                </label>
                <label className="cursor-pointer label">
                  <span className="label-text mr-1">Sat</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    name="saturday"
                  />
                </label>
              </div>
              <div className="w-full justify-center">
                <div className="w-2"></div>
                <button type="submit" className="justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
    )
}

export default RoutineModal;
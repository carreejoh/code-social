"use client";
import NavBtn from "./secondaryNavBtn";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SignUpModal from "./signupModal";
import LoginModal from "./loginModal";
import Auth from "../../verify/auth";
import MathMod from "../../verify/math";

function Sidebar() {
  const [signupModal, toggleSignupModal] = useState(false);
  const [loginModal, toggleLoginModal] = useState(false);

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

  return (
    <>
      {/* <div className="toast">
        <div className="alert alert-error">
          <span>New message arrived.</span>
        </div>
      </div> */}
      <div className="z-30 w-16 pt-3 h-[100vh] bg-darkestBaseGray fixed justify-center">
        {/* <button
        className="btn"
        onClick={() => document.getElementById("add_routine_modal").showModal()}
      >
        open modal
      </button> */}
        <dialog id="add_routine_modal" className="modal">
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
        </dialog>
        <Link href={"/"}>
          <h1 className="text-center text-3xl hover:scale-105 duration-100">
            Ro
          </h1>
        </Link>
        <div className="w-16 p-2 text-center mt-6">
          <button
            className="mt-4 text-white"
            onClick={() =>
              document.getElementById("add_routine_modal").showModal()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <Link href={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 hover:scale-95 duration-100 inline-block mt-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
          </Link>
          <Link href={"/stats"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 hover:scale-95 duration-100 inline-block mt-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>
          </Link>
          <Link href={"/notes"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 hover:scale-95 duration-100 inline-block mt-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </Link>
          {Auth.loggedIn() ? (
            <button className="mt-10" onClick={() => Auth.logout()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          ) : (
            <>
              <button className="mt-10" onClick={() => toggleSignupModal(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </button>
              <button className="mt-2" onClick={() => toggleLoginModal(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      {signupModal && (
        <SignUpModal closeModal={() => toggleSignupModal(false)} />
      )}
      {loginModal && <LoginModal closeModal={() => toggleLoginModal(false)} />}
    </>
  );
}

export default Sidebar;

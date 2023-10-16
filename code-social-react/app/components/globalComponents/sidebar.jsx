"use client";
import NavBtn from "./secondaryNavBtn";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SignUpModal from "./signupModal";
import LoginModal from "./loginModal";
import Auth from "../../verify/auth";
import MathMod from "../../verify/math";
import RoutineModal from "../routineModal"

function Sidebar() {
  const [signupModal, toggleSignupModal] = useState(false);
  const [loginModal, toggleLoginModal] = useState(false);

  function handleDarkLightMode(mode) {
    let application = window.document.body.classList;
    if(mode === "dark") {
      application.add("dark")
      localStorage.setItem("routineColorMode", "dark")
      return;
    }
    if(mode === "light") {
      application.remove("dark")
      localStorage.setItem("routineColorMode", "light")
      return;
    }
  }

  useEffect(() => {
    let colorMode = localStorage.getItem("routineColorMode");
    if(colorMode === "dark") {
      handleDarkLightMode("dark")
    }
  }, [])

  

  return (
    <>

      <div className="z-30 w-16 pt-3 h-[100vh] bg-darkBaseWhite dark:bg-darkestBaseGray fixed justify-center shadow-2xl">
        {/* <button
        className="btn"
        onClick={() => document.getElementById("add_routine_modal").showModal()}
      >
        open modal
      </button> */}
    <dialog id="add_routine_modal" className="modal">
      <RoutineModal/>
    </dialog>
        <Link href={"/"}>
          <h1 className="text-center text-black dark:text-white text-3xl hover:scale-105 duration-100">
            Ro
          </h1>
        </Link>
        <div className="w-16 p-2 text-black dark:text-white text-center mt-6">
          <button
            className="mt-4 text-black dark:text-white"
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
          <button onClick={() => handleDarkLightMode("dark")}>
            Dark 
          </button>
          <button onClick={() => handleDarkLightMode("light")}>
            Light
          </button>
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

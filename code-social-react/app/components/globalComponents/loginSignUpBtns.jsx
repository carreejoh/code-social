"use client";

import { useState, useEffect, useRef } from "react";
import SignUpModal from "./signupModal";
import LoginModal from "./loginModal";
import Auth from "../../verify/auth"

function LoginSignUpBtn() {
  const [signupModal, toggleSignupModal] = useState(false);
  const [loginModal, toggleLoginModal] = useState(false);

  function handleDarkLightMode(mode) {
    let application = window.document.body.classList;
    if (mode === "dark") {
      application.add("dark");
      localStorage.setItem("routineColorMode", "dark");
      return;
    }
    if (mode === "light") {
      application.remove("dark");
      localStorage.setItem("routineColorMode", "light");
      return;
    }
  }

  useEffect(() => {
    let colorMode = localStorage.getItem("routineColorMode");
    if (colorMode === "dark") {
      handleDarkLightMode("dark");
    }
  }, []);
  return (
    <>
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
      <button onClick={() => handleDarkLightMode("dark")}>Dark</button>
          <button onClick={() => handleDarkLightMode("light")}>Light</button>
      {signupModal && (
        <SignUpModal closeModal={() => toggleSignupModal(false)} />
      )}
      {loginModal && <LoginModal closeModal={() => toggleLoginModal(false)} />}
    </>
  );
}

export default LoginSignUpBtn;

"use client";
import { useState, useEffect, useRef } from "react";
import Auth from "../../verify/auth";

function LoginModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, showError] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");

  async function Login(event) {
    event.preventDefault();
    try {
      if (username && password) {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const userToken = await response.json();
        if (userToken.message === "Incorrect Username") {
          showError(true);
          showErrorMessage("Username is incorrect.")
          return;
        }
        if (userToken.message === "Incorrect Password") {
          showError(true)
          showErrorMessage("Password is incorrect.")
          return;
        }
        Auth.login(userToken.token);
        localStorage.setItem("codeSpotUser", `${username}`);
      } else {
        showError(true)
        showErrorMessage("Please enter username and password.")
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="z-50 inset-0 fixed flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-80 bg-lightModeGray dark:bg-darkestBaseGray rounded-lg p-2 text-left">
        <div className="w-full flex justify-between">
          <h1 className="text-black dark:text-white font-semibold">Login</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={closeModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {error && (
          <div className="w-full bg-red-900 mt-1 border-[2px] border-red-400 p-1">
            <h1 className="text-sm text-white">{errorMessage}</h1>
          </div>
        )}
        <form className="mt-1">
          <h1 className="text-black dark:text-white text-sm">Username</h1>
          <input
            placeholder="username"
            className="text-white focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
            max={30}
          ></input>
          <h1 className="text-black dark:text-white text-sm mt-2">Password</h1>
          <input
            placeholder="username"
            className="text-white focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            max={100}
          ></input>
          <div className="w-full mt-2 text-right">
            <button onClick={Login}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

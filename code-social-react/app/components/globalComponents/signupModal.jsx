"use client";
import { useState, useEffect, useRef } from "react";
import {
  samePassword,
  emailValidation,
  passwordLength,
} from "../../verify/verify";
import Auth from "../../verify/auth";
import PostUser from "../../api/postUser";

function SignUpModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, showError] = useState(false);
  const [errorMessage, showErrorMessage] = useState("");


  //Verify email and password on front-end, and make POST request

  async function SignUpVerify(event) {
    event.preventDefault();

    const checkPswd = await samePassword(password, confirmPassword);
    const checkEmail = await emailValidation(email);
    const pswdLength = await passwordLength(password);

    if (checkPswd !== true) {
      showError(true)
      showErrorMessage("Passwords don't match.")
      return;
    }
    if (checkEmail !== true) {
      showError(true)
      showErrorMessage("Invalid email address.")
      return;
    }
    if (pswdLength !== true) {
      showError(true)
      showErrorMessage("Password must be 8 characters long.")
      return;
    }
    SignUp();
  }

  async function SignUp() {
    const newUser = await fetch("https://routine-server-87a5f72bed6e.herokuapp.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username, email, password }),
    });
    const userToken = await newUser.json();
    if(userToken.message === "This email is being used") {
      showError(true)
      showErrorMessage("This email is taken.")
      return;
    }
    if(userToken.message === "This username is being used") {
      showError(true)
      showErrorMessage("This username is taken.")
      return;
    }
    Auth.login(userToken.token);
    localStorage.setItem("codeSpotUser", `${username}`);
  }

  // Actual content

  return (
    <div className="z-50 inset-0 fixed flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-80 bg-lightModeGray dark:bg-darkestBaseGray rounded-lg p-2 text-left">
        <div className="w-full flex justify-between">
          <h1 className="text-black dark:text-white font-semibold">Sign-Up</h1>
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
        <form className=" mt-1">
          <h1 className="text-black dark:text-white text-sm">Username</h1>
          <input
            placeholder="username"
            className="text-white focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
            max={30}
          ></input>
          <h1 className="text-black dark:text-white text-sm mt-2"> Email</h1>
          <input
            placeholder=""
            className="text-white focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            max={50}
          ></input>
          <h1 className="text-black dark:text-white text-sm mt-2">Password</h1>
          <input
            placeholder=""
            className="text-white focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            max={100}
          ></input>
          <h1 className="text-black dark:text-white text-sm mt-2">
            Confirm Password
          </h1>
          <input
            placeholder=""
            className="text-white focus:outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
            max={100}
          ></input>
          <div className="w-full mt-2 text-right">
            <button onClick={SignUpVerify}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;

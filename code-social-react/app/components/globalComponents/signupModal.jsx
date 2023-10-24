"use client";
import { useState, useEffect, useRef } from "react";
import {
  samePassword,
  emailValidation,
  passwordLength,
} from "../../verify/verify";
import Auth from "../../verify/auth";

function SignUpModal({ closeModal }) {
  //UseState for managing form

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Verify email and password on front-end, and make POST request

  async function SignUpVerify(event) {
    event.preventDefault();

    const checkPswd = await samePassword(password, confirmPassword);
    const checkEmail = await emailValidation(email);
    const pswdLength = await passwordLength(password);

    if (checkPswd !== true) {
      alert("Password and confirm password are different!");
      return;
    }
    if (checkEmail !== true) {
      alert("Invalid email address!");
      return;
    }
    if (pswdLength !== true) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    SignUp();
  }

  async function SignUp() {
    const newUser = await fetch("http://localhost:5050/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const userToken = await newUser.json();
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
        <form className=" mt-3">
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

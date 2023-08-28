"use client";
import { useState, useEffect, useRef } from "react";
import { samePassword, emailValidation, passwordLength } from "../verify/verify";
import Auth from "../verify/auth";

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
      alert("Password must be at least 8 characters long!")
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
    const userToken = await newUser.json()
    Auth.login(userToken.token);
    localStorage.setItem("codeSpotUser", `${username}`)
  }

  // Actual content

  return (
    <div className="z-50 inset-0 fixed flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-80 h-96 bg-slate-600 rounded-lg p-2">
        <h1>Sign-Up</h1>
        <button onClick={closeModal}>Close</button>
        <form className="">
          <h1>Username</h1>
          <input
            placeholder="username"
            className="text-black"
            onChange={(e) => setUsername(e.target.value)}
            max={30}
          ></input>
          <h1>Email</h1>
          <input
            placeholder="username"
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
            max={50}
          ></input>
          <h1>Password</h1>
          <input
            placeholder="username"
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
            max={100}
          ></input>
          <h1>Confirm Password</h1>
          <input
            placeholder="username"
            className="text-black"
            onChange={(e) => setConfirmPassword(e.target.value)}
            max={100}
          ></input>
          <button onClick={SignUpVerify}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;

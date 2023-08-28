"use client";
import { useState, useEffect, useRef } from "react";
import Auth from "../verify/auth";

function LoginModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    try {
      if (username && password) {
        const response = await fetch("http://localhost:5050/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        const userToken = await response.json();
        Auth.login(userToken.token);
        localStorage.setItem("codeSpotUser", `${username}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="z-50 inset-0 fixed flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-80 h-96 bg-slate-600 rounded-lg p-2">
        <h1>Login</h1>
        <button onClick={closeModal}>Close</button>
        <form className="">
          <h1>Username</h1>
          <input
            placeholder="username"
            className="text-black"
            onChange={(e) => setUsername(e.target.value)}
            max={30}
          ></input>
          <h1>Password</h1>
          <input
            placeholder="username"
            className="text-black"
            onChange={(e) => setPassword(e.target.value)}
            max={100}
          ></input>
          <button onClick={Login}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

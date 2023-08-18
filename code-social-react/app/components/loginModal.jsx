"use client";
import { useState, useEffect, useRef } from "react";

function LoginModal({ closeModal }) {
  //UseState for managing form

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function Login() {
    console.log("No functionality yet")
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
          <button onClick={Login}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

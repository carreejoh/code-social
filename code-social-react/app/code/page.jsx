"use client";

import { useState, useEffect } from "react";
import CodeBody from "./codeComponents/codeBody";
import SidebarIcons from "./codeComponents/sidebarIcons";
import YourFiles from "./codeComponents/yourFiles";
import Auth from "../verify/auth";

function Code() {
  let user = Auth.getProfile();
  let userId = user?.data?._id;
  const [files, toggleFiles] = useState(false);
  const [inputValue, changeInputValue] = useState("");
  const [codeOutput, changeCodeOutout] = useState("");
  const [username, setUsername] = useState(null);
  const [userData, setUserData] = useState();

  // Get User Data on load

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, []);

  // SIDEBAR FUNCTIONS

  function runCode() {
    let capturedOutput = "";
    let originalConsoleLog = console.log;
    console.log = function (message) {
      capturedOutput += message + "\n";
    };
    new Function(inputValue)();
    console.log = originalConsoleLog;
    changeCodeOutout(capturedOutput);
  }

  async function saveCode() {
    console.log(username);
    let user = "";
    if (Auth.loggedIn() !== true) {
      alert("You Must Be Logged In To Save Files");
      return;
    }
    if (inputValue === "") {
      alert("Cannot Save Empty File");
      return;
    }
    if (username === null) {
      alert("There was an error saving this code. Reload page and try again");
      return;
    }
    const postCode = await postCodeApi(
      username,
      "tempTitle",
      "JavaScript",
      inputValue
    );
    if (!postCode) {
      alert("Something went wrong, please try again");
    }
  }

  // CLIENT SIDE API ROUTES

  async function postCodeApi(username, title, language, code) {
    try {
      const postCode = await fetch("http://localhost:5050/api/code/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, title, language, code }),
      });
      const data = await postCode.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  function getUser() {
    fetch(`http://localhost:5050/api/users/userId/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setUsername(data.username);
        console.log(userData);
      });
  }

  return (
    <div className="h-[100vh] overflow-y-hidden w-full flex">
      {/* <Sidebar /> */}
      <div className="h-[100vh] pt-12 z-40 flex">
        <div className=" w-12 flex-col bg-mainGray">
          {Auth.loggedIn() ? (
            <SidebarIcons
              onClick={() => toggleFiles(!files)}
              icon={
                "M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
              }
            />
          ) : (
            <></>
          )}
          <SidebarIcons
            onClick={() => runCode()}
            icon={
              "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            }
          />
          <SidebarIcons
            icon={
              "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            }
          />
          <SidebarIcons
            onClick={() => saveCode()}
            icon={
              "M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            }
          />
          <SidebarIcons icon={"M12 4.5v15m7.5-7.5h-15"} />
          <SidebarIcons
            icon={
              "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            }
          />
        </div>

        <div
          className={`${
            files ? "translate-x-0" : "w-0 translate-x-[-300px]"
          } z-30 duration-100 ease-in-out transform`}
        >
          <div className="w-48 pl-12 h-[100vh] bg-mainGray duration-200 ease-in-out">
            {userData === undefined ? <YourFiles userData={userData} /> : <></>}
          </div>
        </div>
      </div>
      <div className="pt-12 w-full bg-darkestBlack">
        <div className="w-full h-12 flex items-center justify-center">
          <h1>File.js</h1>
        </div>
        <div className="h-[95vh] w-full overflow-y-hidden">
          <CodeBody
            changeInputValue={changeInputValue}
            codeOutput={codeOutput}
          />
        </div>
      </div>
    </div>
  );
}

export default Code;

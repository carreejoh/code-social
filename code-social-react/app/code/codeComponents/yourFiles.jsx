"use client";
import { useEffect, useState } from "react";
import IndividualFile from "./individualFile";

function YourFiles({ userData }) {
  const [userFiles, setUserFiles] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if(userData) {
      setUsername(userData.username)
      getUserFiles(username);
    }
  }, [userData]);

  // CLIENT SIDE API ROUTES

  function getUserFiles(username) {
    fetch(`http://localhost:5050/api/code/${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserFiles(data);
        console.log(userFiles)
      });
  }

  return (
  <div className="w-full h-full">
    <ul className="w-full h-full">
      {userFiles.map((file, index) => (
        <IndividualFile fileData={file} key={index}/>
      ))}
    </ul>
  </div>
  );
}

export default YourFiles;


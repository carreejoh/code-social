"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRoutine } from "../redux/reducers/counterSlice";
import Note from "../notes/components/note"

// import Blah from "./components/blah"

function Notes() {
  

  return (
    <div className="w-full h-[93.2vh] bg-darkBaseGray pl-20 pr-20 pb-10 overflow-y-scroll">
      <div className=" pt-4">
        <h1 className="text-2xl font-semibold">Notes:</h1>
      </div>
      <h1 className="text-md font-semibold mt-8">School</h1>
      <div className="w-full grid grid-cols-6 mt-2 gap-8 gap-y-4">
        <Note size={"large"} title={"title"}/>
        <Note size={"small"} title={"title"}/>
        <Note size={"large"} title={"title"}/>
        <Note size={"small"} title={"title"}/>
        <Note size={"small"} title={"title"}/>
        <Note size={"large"} title={"title"}/>
      </div>
      <h1 className="text-md font-semibold mt-8">Gym</h1>
      <div className="w-full grid grid-cols-6 mt-2 gap-8 gap-y-4">
        <Note size={"large"} title={"title"}/>
        <Note size={"small"} title={"title"}/>
        <Note size={"large"} title={"title"}/>
        <Note size={"small"} title={"title"}/>
        <Note size={"small"} title={"title"}/>
      </div>
    </div>
  );
}

export default Notes;

"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../features/counterSlice";

import Blah from "./components/blah"

function Notes() {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="w-full h-[90vh] bg-darkBaseGray rounded-tl-lg ">
      <div className="w-full h-full grid grid-cols-7">
        <div className="col-span-1 h-full bg-transparent border-r-[2px] border-darkestBaseGray rounded-tl-lg"></div>
        <div className="col-span-4 h-full bg-transparent overflow-y-scroll pt-2 pl-4 pr-4">
          <h1>2023 Goals</h1>
          <div className="w-full h-[90vh] pt-2">
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <Blah/>
            {/* <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;

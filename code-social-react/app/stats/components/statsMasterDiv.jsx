"use client";

import { useState, useEffect } from "react";
import GeneralStats from "./generalStats"
import PriorityPercent from "./priorityPercent"

function StatsMasterDiv() {
  return (
    <div className="w-full pl-16 pr-16 pt-4 grid grid-cols-2 gap-x-4 gap-y-3">
      <GeneralStats/>
      <div className="col-span-1 h-72 bg-baseGray rounded-lg shadow-xl"></div>
      <PriorityPercent/>
      <div className="col-span-1 h-72 bg-baseGray rounded-lg shadow-xl"></div>
    </div>
  );
}

export default StatsMasterDiv;

"use client";
import { useState, useEffect } from "react";

function GeneralStats({userData}) {

  let now = new Date()
  let nowUTC = now.getTime()

  let daysOnRo = Math.floor((nowUTC - userData.creation + 86400000) / 86400000)

  return (
    <div className="col-span-1 h-72 dark:bg-baseGray bg-white rounded-lg shadow-xl p-2">
      <h1 className="text-md font-semibold h-8">General </h1>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">Tasks Completed</h1>
          <h1 className="text-4xl font-bold">{userData.statSheet?.totalCompleted}</h1>
        </div>
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">Days on Ro</h1>
          <h1 className="text-4xl font-bold">{daysOnRo}</h1>
        </div>
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">Highest Priority Completed</h1>
          <h1 className="text-4xl font-bold">{userData.statSheet?.highestCompleted}</h1>
        </div>
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">High Priority Completed</h1>
          <h1 className="text-4xl font-bold">{userData.statSheet?.highCompleted}</h1>
        </div>
      </div>
    </div>
  );
}

export default GeneralStats;

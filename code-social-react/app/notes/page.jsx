"use client"

import Sidebar from "../components/homeSidebar";
// import TodayContainer from "./components/todayContainer";
// import ScheduleContainer from "./components/scheduleContainer";
import WelcomeInfo from "../components/welcomeInfo";
import {DndContext} from '@dnd-kit/core';

import {Draggable} from './components/noteCard';
// import {Droppable} from './Droppable';

function Notes() {
  return (
    <>
      <Sidebar />
      <div className="w-[100vw] h-[100vh] pl-16 bg-darkBaseGray overflow-hidden">
        <div className="h-24">
          <WelcomeInfo/>
        </div>
        <div className=" bg-baseGray h-full w-full">
            {/* <DndContext>
              <Draggable/>
            </DndContext> */}
        </div>
      </div>
    </>
  );
}

export default Notes;
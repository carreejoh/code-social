"use client";
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./components/draggable";
import Droppable from "./components/droppable";

function Notes() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );
  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
  return (
    <div className="w-full h-[90vh] bg-green-900 rounded-tl-lg pl-2 pr-2 pt-2">
      <div className="h-12 w-full bg-orange-900"></div>
      <div className="w-full h-full pt-2 z-30">
      <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>
        {isDropped ? draggableMarkup : 'Drop here'}
      </Droppable>
    </DndContext>
      </div>
    </div>
  );
}

export default Notes;

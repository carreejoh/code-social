"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable() {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : "red",
  };

  return (
    <div ref={setNodeRef} style={style} className="h-48 w-full bg-white z-30 fixed mt-24"></div>
  );
}

export default Droppable;

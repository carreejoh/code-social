"use client";
import ToDoBlock from "./toDoBlock"

function ToDo({ toDo, toggleToDo }) {
  return (
    <div
      className={`${
        toDo === false ? "translate-x-0" : "translate-x-[680px]"
      } duration-150 ease-in-out w-[680px] h-[88vh] p-2 rounded-tl-lg rounded-bl-lg shadow-2xl bg-darkestBaseWhite dark:bg-darkestBaseGray fixed z-[1000] right-0 top-[9%] border-l-2 border-t-2 border-b-2 border-black dark:border-0`}
    >
      <div className="w-full flex justify-between">
        <h1 className="font-semibold dark:text-white text-black">
          To Do List:
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-black dark:text-white"
          onClick={() => toggleToDo(!toDo)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="w-full grid grid-cols-2 h-[84vh] pt-2 pb-1 ">
        <ToDoBlock/>
      </div>
    </div>
  );
}

export default ToDo;

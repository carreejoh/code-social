"use client";

function SmallTaskBlock({ title, time, priority, activity, desc, length }) {
  const taskLengths = {
    length30: "w-[32px]",
    // w-32 = 128px
    // 128px = 30min (on xl screens)
    length60: "w-16",
    length90: "w-24",
  };

  const taskType = {
    exercise: "border-red-400",
    routine: "border-green-700",
  };

  return (
    <div
      className={`bg-baseGray p-2 rounded-lg mr-[2px] h-32 ${taskLengths[length]} cursor-pointer`}
    >
      <div className="flex flex-col justify-between h-full">
        <div
          className={`${
            length === "length30" ? "" : "flex"
          } w-full justify-between`}
        >
          <div className="">
            <h1 className="text-sm font-semibold text-white">{title}</h1>
            <h1 className="text-sm text-gray-300">{time}</h1>
          </div>
          <div
            className={`${
              priority === "highest" ? "" : "hidden"
            } badge text-lg font-semibold badge-md badge-secondary`}
          >
            !!!
          </div>
          <div
            className={`${
              priority === "high" ? "" : "hidden"
            } badge text-white text-lg font-semibold badge-md badge-primary`}
          >
            !
          </div>
        </div>
        <div className="flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-[-9px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
          <button className="btn btn-xs btn-success btn-outline">Complete</button>
        </div>
      </div>
    </div>
  );
}

export default SmallTaskBlock;
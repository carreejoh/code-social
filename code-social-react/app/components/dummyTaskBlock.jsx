"use client";

function DummyTaskBlock({ title, priority, desc, length, complete }) {
  const taskLengths = {
    30: "w-[128px]",
    60: "w-[256px]",
    90: "w-[384px]",
  };

  return (
    <div className={`bg-lightModeGray dark:bg-baseGray shadow-xl p-2 rounded-lg ${taskLengths[length]} mr-[3px] h-48 dark:border-customBlue border-customBlue border-[1px]`}>
      <div className="flex justify-between h-8">
        <h1 className="text-black dark:text-white text-sm font-semibold">
          {title}
        </h1>
        <div
                className={`${priority === "Highest" ? "" : "hidden"}  badge font-semibold badge-secondary`}
              >
                !!!
              </div>
              <div
                className={`${priority === "High" ? "" : "hidden"} badge text-white font-semibold badge-primary`}
              >
                !
              </div>
      </div>
      <p className="text-gray-500 text-sm">{desc}</p>
      <div className="flex h-8 justify-between items-center mt-[116px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 text-black dark:text-white`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`h-7 w-7 text-green-700 dark:text-green-500 ${
            complete === true ? "block" : "hidden"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <button
          onClick={() => completeTask()}
          className={`btn btn-xs btn-outline hover:bg-green text-green-700 dark:text-green-500 ${
            complete === false ? "block" : "hidden"
          } `}
        >
          Complete
        </button>
      </div>
    </div>
  );
}

export default DummyTaskBlock;

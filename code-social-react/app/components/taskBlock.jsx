"use client";

function TaskBlock({
  title,
  time,
  priority,
  activity,
  desc,
  length,
  blockSize,
  startTime
}) {
  const taskLengths = {
    // w-32 = 128px
    // 128px = 30min (on xl screens)
    // 1 Hr
    30: "w-[124px] h-56",
    60: "w-[252px] h-56",
    // 2 Hr
    90: "w-[380px] h-56",
    120: "w-[512px] h-56",
    // 3 Hr
    150: "w-[640px] h-56",
    180: "w-[768px] h-56",
    // 4 Hr
    210: "w-[896px] h-56",
    240: "w-[1024px] h-56"
  };

  const taskLengthSmall = {
    30: "w-[64px] h-32",
    60: "w-[96px] h-32",
    90: "w-[128px] h-32",
    120: "w-[160px] h-32",
    150: "w-[192px] h-32"
  }

  const timeStart = {
    2500: "ml-[0px]",
    2530: "ml-[128px]",
    100: "ml-[258px]",
    130: "ml-[384px]",
    200: "ml-[512px]",
    230: "ml-[640px]",
    300: "ml-[768px]",
    330: "ml-[896px]",
    400: "ml-[1024px]",
    430: "ml-[1152px]",
    500: "ml-[1280px]",
    530: "ml-[1408px]",
    600: "ml-[1536px]",
    630: "ml-[1664px]",
    700: "ml-[1792px]",
    730: "ml-[1920px]",
    800: "ml-[2048px]",
    830: "ml-[2176px]",
    900: "ml-[2304px]",
    930: "ml-[2432px]",
    1000: "ml-[2560px]",
    1030: "ml-[2688px]",
    1100: "ml-[2816px]",
    1130: "ml-[2944px]",
    1200: "ml-[3072px]",
    1230: "ml-[3200px]",
    1300: "ml-[3328px]",
    1330: "ml-[3456px]",
    1400: "ml-[3584px]",
    1430: "ml-[3712px]",
    1500: "ml-[3840px]",
    1530: "ml-[3968px]",
    1600: "ml-[4096px]",
    1630: "ml-[4224px]",
    1700: "ml-[4352px]",
    1730: "ml-[4480px]",
    1800: "ml-[4608px]",
    1830: "ml-[4736px]",
    1900: "ml-[4864px]",
    1930: "ml-[4992px]",
    2000: "ml-[5120px]",
  }

  return (
    <div
      className={`bg-baseGray p-2 rounded-lg mr-[2px]  ${
        blockSize === "fullsize" ? `${taskLengths[length]} ${timeStart[startTime]} fixed` : taskLengthSmall[length]
      } cursor-pointer `}
    >
      <div className="flex flex-col justify-between h-full">
        <div
          className={`${
            length === "length30" ? "" : "flex"
          } w-full justify-between`}
        >
          <div className="">
            <h1 className={`${blockSize === "fullsize" ? "text-sm font-semibold" : "text-[12px]"} text-white`}>{title}</h1>
            <h1 className={`${blockSize === "fullsize" ? "text-sm font-semibold" : "text-[9px]"} text-gray-400`}>{time}</h1>
          </div>
          <div
            className={`${
              priority === "Highest" ? "" : "hidden"
            } ${blockSize === "fullsize" ? "text-lg badge-md" : "text-xs badge-xs"} badge font-semibold badge-secondary`}
          >
            !!!
          </div>
          <div
            className={`${
              priority === "High" ? "" : "hidden"
            } ${blockSize === "fullsize" ? "text-lg badge-md" : "text-xs badge-xs"} badge text-white font-semibold badge-primary`}
          >
            !
          </div>
        </div>
        <div className={`justify-between ${blockSize === "fullsize" ? "flex" : "hidden"}`}>
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
          <button className="btn btn-xs btn-success btn-outline">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskBlock;

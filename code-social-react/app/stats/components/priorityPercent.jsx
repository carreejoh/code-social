"use client";

function PriorityPercent({ userData }) {

  console.log(userData.statSheet)

  return (
    <div className="col-span-1 h-72 dark:bg-baseGray bg-white rounded-lg shadow-2xl p-2">
      <h1 className="text-md font-semibold h-8">
        Priority Completion Percentages
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 h-[232px] ">
          <div className="flex pt-6 justify-left">
            <h1 className="text-sm text-gray-500 pl-8">Highest Priority</h1>
            <div className="text-lg badge-md badge badge-secondary ml-2">
              !!!
            </div>
          </div>
          <div
            className="radial-progress ml-10 mt-2 text-black dark:text-white font-semibold text-xl"
            style={{ "--value": userData.statSheet?.highestPriorityPercent, "--size": "140px", "--thickness": "8px" }}
          >
            {userData.statSheet?.highestPriorityPercent}%
          </div>
         
        </div>
        <div className="col-span-1 h-[232px] ">
          <div className="flex pt-6 justify-left">
            <h1 className="text-sm text-gray-500 pl-8">High Priority</h1>
            <div className="text-lg badge-md badge badge-primary ml-2">!</div>
          </div>
          <div
            className="radial-progress ml-10 mt-2 text-black dark:text-white font-semibold text-xl"
            style={{ "--value": userData.statSheet?.highPriorityPercent, "--size": "140px", "--thickness": "8px" }}
          >
            {userData.statSheet?.highPriorityPercent}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriorityPercent;

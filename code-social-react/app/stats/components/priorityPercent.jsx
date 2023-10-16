"use client";

function PriorityPercent({ userData }) {
  return (
    <div className="col-span-1 h-72 bg-darkestBaseGray rounded-lg shadow-2xl p-2">
      <h1 className="text-md font-semibold h-8">
        Priority Completion Percentages
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 h-[232px] ">
          <div className="flex pt-6 justify-center">
            <h1 className="text-sm text-gray-500">Highest Priority</h1>
            <div className="text-lg badge-md badge badge-secondary ml-2">
              !!!
            </div>
          </div>
          <div
            className="radial-progress ml-10 mt-2"
            style={{ "--value": `40`, "--size": "140px", "--thickness": "8px" }}
          >
            70%
          </div>
         
        </div>
        <div className="col-span-1 h-[232px] ">
          <div className="flex pt-6 justify-center">
            <h1 className="text-sm text-gray-500">High Priority</h1>
            <div className="text-lg badge-md badge badge-primary ml-2">!</div>
          </div>
          <div
            className="radial-progress ml-10 mt-2"
            style={{ "--value": "100", "--size": "140px", "--thickness": "8px" }}
          >
            70%
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriorityPercent;

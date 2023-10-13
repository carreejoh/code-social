"use client";

function PriorityPercent() {
  return (
    <div className="col-span-1 h-72 bg-baseGray rounded-lg shadow-xl p-2">
      <h1 className="text-md font-semibold h-8">Priority Completion Percentage</h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 h-[232px] bg-black">
        <h1 className="text-sm text-gray-500">Tasks Completed</h1>
        </div>
        <div className="col-span-1 h-[232px] bg-black">

        </div>
      </div>
    </div>
  );
}

export default PriorityPercent;

"use client";

function ProductiveDay() {
  return (
    <div className="col-span-1 h-72 bg-darkestBaseGray rounded-xl shadow-2xl p-2">
        <h1 className="text-md font-semibold h-8">
            Productivity By Days
          </h1>
      <div className="grid grid-rows-2 h-full">
        <div className="row-span-1 pt-8">
        <h1 className="text-sm text-gray-500 pl-5">Most Productive Day</h1>
          <div className="pl-5 flex pt-1 items-center">
            <h1 className="text-3xl font-semibold">Wednesday</h1>
            <h1 className="text-xl font-semibold ml-3">30/34 Tasks</h1>
          </div>
        </div>
        <div className="row-span-1 ">
        <h1 className="text-sm text-gray-500 pl-5">Least Productive Day</h1>
          <div className="pl-5 flex pt-1 items-center">
            <h1 className="text-3xl font-semibold">Sunday</h1>
            <h1 className="text-xl font-semibold ml-3">10/22 Tasks</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductiveDay;

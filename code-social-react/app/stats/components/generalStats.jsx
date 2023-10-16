function GeneralStats({userData}) {
  return (
    <div className="col-span-1 h-72 bg-darkestBaseGray rounded-lg shadow-xl p-2">
      <h1 className="text-md font-semibold h-8">General </h1>

      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">Tasks Completed</h1>
          <h1 className="text-4xl font-bold">{userData.totalCompleted}</h1>
        </div>
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">Days on Ro</h1>
          <h1 className="text-4xl font-bold">100</h1>
        </div>
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">Highest Priority Completed</h1>
          <h1 className="text-4xl font-bold">{userData.highestCompleted}</h1>
        </div>
        <div className="col-span-1 h-28 pt-6  pl-5">
          <h1 className="text-sm text-gray-500">High Priority Completed</h1>
          <h1 className="text-4xl font-bold">{userData.highCompleted}</h1>
        </div>
      </div>
    </div>
  );
}

export default GeneralStats;

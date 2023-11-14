import StatsMasterDiv from "./components/statsMasterDiv";

function Stats() {
  return (
    <div className="w-full h-[95vh] bg-darkBaseWhite dark:bg-darkBaseGray rounded-tl-lg xl:pl-64 xl:pr-64 lg:pl-16 lg:pr-16">
      <h1 className="text-3xl font-semibold pt-4 pl-16 text-black dark:text-white">Statistics</h1>
      <div className="w-full h-full pt-2">
        <StatsMasterDiv/>
      </div>
    </div>
  );
}

export default Stats;

import StatsMasterDiv from "./components/statsMasterDiv";

function Stats() {
  return (
    <div className="w-full h-full bg-darkBaseGray rounded-tl-lg pl-96 pr-96">
      <h1 className="text-3xl font-semibold pt-4 pl-16">Statistics</h1>
      <div className="w-full h-full pt-2">
        <StatsMasterDiv/>
      </div>
    </div>
  );
}

export default Stats;

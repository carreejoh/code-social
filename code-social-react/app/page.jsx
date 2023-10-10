import Sidebar from "./components/homeSidebar";
// import TodayContainer from "./components/todayContainer";
import ScheduleContainer from "./components/scheduleContainer";
import WelcomeInfo from "./components/welcomeInfo";

function Home() {
  return (
    <>
      <Sidebar />
      <div className="w-[100vw] h-[100vh] pl-16 bg-darkBaseGray overflow-hidden">
        <div className="h-24">
          <WelcomeInfo />
        </div>
        <div className=" bg-darkestBaseGray">
          <ScheduleContainer />
        </div>
      </div>
    </>
  );
}

export default Home;

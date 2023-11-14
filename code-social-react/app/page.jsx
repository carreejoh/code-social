"use client"
import ScheduleContainer from "./components/homeComponents/scheduleContainer";
// import WelcomeInfo from "./components/welcomeInfo";
import { Suspense, useState } from "react";
import LoadingSpinner from "./components/globalComponents/loadingSpinner";

function Home() {

  // Reload only this component on any edit
  const [key, setKey] = useState(0);

  const reloadComponent = () => {
    setKey(prevKey => prevKey + 1);
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScheduleContainer key={key} reloadComponent={reloadComponent}/>
    </Suspense>
  );
}

export default Home;

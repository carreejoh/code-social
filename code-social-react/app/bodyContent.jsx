"use client";
// import Header from './components/header';
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import Sidebar from "./components/globalComponents/sidebar";
import WelcomeInfo from "./components/welcomeInfo";

const Header = dynamic(() => import("./components/globalComponents/header"), {
  ssr: false,
});

function BodyContent({ children }) {
  return (
    <>
      <Sidebar />
      <div className="w-[100vw] h-[100vh] pl-16 bg-darkBaseGray overflow-hidden">
        <div className="h-24">
          <WelcomeInfo />
        </div>
        <div className=" bg-darkestBaseGray ">
        <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
}

export default BodyContent;

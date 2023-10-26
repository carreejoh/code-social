// import Header from './components/header';
import { Suspense } from "react";
// import dynamic from "next/dynamic";
import Loading from "./loading";
import Sidebar from "./components/globalComponents/sidebar";
import WelcomeInfo from "./components/welcomeInfo";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = Infinity,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

function BodyContent({ children }) {
  return (
    <>
      <Sidebar />
      <div className="w-[100vw] h-[100vh] pl-16 bg-baseWhite dark:bg-darkBaseGray overflow-hidden">
        <div className="h-16">
          <WelcomeInfo />
        </div>
        <div className=" bg-darkestBaseGray dark:bg-darkestBaseGray ">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </>
  );
}

export default BodyContent;

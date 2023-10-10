"use client";
// import Header from './components/header';
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";

const Header = dynamic(() => import("./components/globalComponents/header"), {
  ssr: false,
});

function BodyContent({ children }) {
  return (
    <>
      {/* <Header /> */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}

export default BodyContent;

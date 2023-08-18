"use client";
import NavBtn from "./globalComponents/secondaryNavBtn";
import { useState } from "react";
import SignUpModal from "./signupModal";
import LoginModal from "./loginModal";

function Header() {
  const [signupModal, toggleSignupModal] = useState(false);
  const [loginModal, toggleLoginModal] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between pr-72 pl-72 z-40 fixed h-12 bg-mainGray border-b-2 border-mainOrange">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-mainOrange"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
            />
          </svg>
          <h1 className="text-xl text-white">Code_Spot</h1>
        </div>
        <div className="flex items-center justify-around w-64">
          <NavBtn link={"#"} text={"Home"} textColor={"white"} />
          <NavBtn link={"#"} text={"Code"} textColor={"white"} />
          <NavBtn link={"#"} text={"Explore"} textColor={"white"} />
          {/* <NavBtn link={"#"} text={"Profile"} textColor={"white"} /> */}
          <NavBtn
            link={"#"}
            text={"Sign-Up"}
            textColor={"white"}
            onClick={() => toggleSignupModal(true)}
          />
          <NavBtn
            link={"#"}
            text={"Login"}
            textColor={"white"}
            onClick={() => toggleLoginModal(true)}
          />
        </div>
      </div>
      {signupModal && (
        <SignUpModal closeModal={() => toggleSignupModal(false)}/>
      )}
      {loginModal && (
        <LoginModal closeModal={() => toggleLoginModal(false)}/>
      )}
    </>
  );
}

export default Header;

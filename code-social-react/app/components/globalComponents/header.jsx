"use client";
import NavBtn from "./secondaryNavBtn";
import { useState, useEffect } from "react";
import SignUpModal from "./signupModal";
import LoginModal from "./loginModal";
import Auth from "../../verify/auth";

function Header() {
  const [signupModal, toggleSignupModal] = useState(false);
  const [loginModal, toggleLoginModal] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between pr-4 pl-4 z-40 fixed h-12 bg-darkestBaseGray border-b-[1px] border-lightestGray">
        <div className="flex items-center">
          <h1 className="text-xl text-white">Routine</h1>
          <button className="ml-3 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center">
          <NavBtn link={"/"} text={"Dashboard"} textColor={"white"} />
          <NavBtn link={"/Stats"} text={"Stats"} textColor={"white"} />
          {Auth.loggedIn() ? (
            <NavBtn
              link={"#"}
              text={"Sign-Out"}
              textColor={"white"}
              onClick={() => Auth.logout()}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      {signupModal && (
        <SignUpModal closeModal={() => toggleSignupModal(false)} />
      )}
      {loginModal && <LoginModal closeModal={() => toggleLoginModal(false)} />}
    </>
  );
}

export default Header;

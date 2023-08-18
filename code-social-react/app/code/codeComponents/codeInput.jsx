"use client"
import React from "react";
import CodeEditor from "./codeIDE";

function CodeInput() {
    return(
        <div className={`w-full h-full duration-100 ease-in-out transform bg-mainDarkGray overflow-x-hidden rounded-lg`} id="codeIDEDiv">
            <div className="rounded-xl">
                <CodeEditor/>
            </div>
        </div>
    )
}

export default CodeInput;


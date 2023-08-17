"use client";
import CodeInput from "./codeInput";
import CodeOutput from "./codeOutput";
import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

function CodeBody() {
  const [sizes, setSizes] = useState(["50%", "50%", "auto"]);
  const [smallSize, setSmallSize] = useState(["50%", "50%", "50%"]);

  return (
    <div className="flex h-[90.1vh] w-[100%] overflow-x-hidden">
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane
          minSize="0%"
          maxSize="80%"
          className="p-1 border-[2px] border-r-[1px] border-l-[0px] border-transparent"
        >
          <div className="w-full h-full bg-mainDarkGray rounded-lg overflow-x-hidden"></div>
        </Pane>
        <Pane>
          <SplitPane
            split="horizontal"
            sizes={smallSize}
            onChange={setSmallSize}
          >
            <Pane
              minSize="0%"
              maxSize="80%"
              className="p-1 border-[1px] border-t-[2px] border-transparent"
            >
              <CodeInput />
            </Pane>
            <Pane
              minSize="0%"
              maxSize="80%"
              className="p-1 border-[1px] border-b-[2px] border-transparent"
            >
              <CodeOutput />
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </div>
  );
}

export default CodeBody;

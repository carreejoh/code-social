"use client"
import React from "react";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-cloud9_night";
import "ace-builds/src-noconflict/ext-language_tools";

function CodeEditor({ changeInputValue }) {

  function onChange(newValue) {
    changeInputValue(newValue);
  }

  const editorStyle = {
    width: "100%",
    height: "90vh"
  }

  return (
      <AceEditor
        mode="javascript"
        theme="cloud9_night"
        onChange={onChange}
        className="w-full"
        name="EditorDiv"
        style={editorStyle}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
      />
  );
}

export default CodeEditor;
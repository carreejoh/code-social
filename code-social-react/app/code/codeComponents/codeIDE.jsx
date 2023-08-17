import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import { ReactDOM } from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

// function CodeIDE() {
//   render (
//     (
//       <AceEditor
//         mode="java"
//         theme="github"
//         onChange={onChange}
//         name="codeIDEDiv"
//         editorProps={{ $blockScrolling: true }}
//       />
//     ),
//     document.getElementById("codeIDEDiv")
//   );
// }

// function CodeIDE() {
//     return (
//         <AceEditor
//         mode="java"
//         theme="github"
//         onChange={onChange}
//         name="codeIDEDiv"
//         editorProps={{ $blockScrolling: true }}
//       />
//     );
//   }

//   const codeEditor = document.getElementById('codeIDEDiv');

//   render(<CodeIDE />, codeEditor);

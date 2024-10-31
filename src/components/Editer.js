import { useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactModule from "./ReactModule";

const Editer = () => {
  // 퀼 에디터
  const formats: string[] = [
    "header",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "code-block",
    "clean",
  ];
  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
      },
    }),
    []
  );

  return (
    <div id="EditerBox">
      <div id="toolBar" style={{ background: "white" }}>
        <div>
          <ReactModule />
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          style={{ height: "300px" }}
        />
      </div>
    </div>
  );
};
export default Editer;

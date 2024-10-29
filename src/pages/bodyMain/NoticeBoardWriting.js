import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import ReactModule from "../../components/ReactModule";
import Input from "../../components/Input";
//게시판
const NoticeBoardWriting = () => {
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
    <div id="noticeBordePage">
      <div>
        <Input label="게시글 제목 : " type="text" />
      </div>
      <div id="toolBar">
        <ReactModule />
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        style={{ height: "400px" }}
      />
      <button>만들기</button>
    </div>
  );
};
export default NoticeBoardWriting;

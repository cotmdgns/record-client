import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo, useEffect, useState } from "react";
import ReactModule from "../../components/ReactModule";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

//게시판
const NoticeBoardWriting = () => {
  const { member } = useAuth();
  const [borad, setBorad] = useState({
    userCode: member?.userCode,
    noticeBoardH1: "",
    noticeBoardText: "",
  });
  const boradText = (text) => {
    setBorad({ ...borad, noticeBoardText: text });
  };
  const createBoradBtn = async () => {
    // await createNoticeBoard(borad);
  };

  useEffect(() => {
    if (member?.userCode != null) {
      createBoradBtn();
    }
  }, [member]);

  useEffect(() => {}, [borad]);

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
        <Input
          label="게시글 제목 : "
          type="text"
          change={(e) => setBorad({ ...borad, noticeBoardH1: e.target.value })}
        />
      </div>
      <div id="toolBar">
        <ReactModule />
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        style={{ height: "400px" }}
        onChange={boradText}
      />
      <button onClick={createBoradBtn}>만들기</button>
    </div>
  );
};
export default NoticeBoardWriting;

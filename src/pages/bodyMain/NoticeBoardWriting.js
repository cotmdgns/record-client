import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo, useEffect, useState } from "react";
import ReactModule from "../../components/ReactModule";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import { createNoticeBoard } from "../../api/noticeBoardAPI";
import { useNavigate } from "react-router-dom";
import "../../assets/noticeBoard.scss";

//게시판
const NoticeBoardWriting = () => {
  const { member } = useAuth();
  const navigate = useNavigate();
  const [borad, setBorad] = useState({
    userCode: "",
    noticeBoardH1: "",
    noticeBoardText: "",
  });
  const boradText = (text) => {
    setBorad({ ...borad, noticeBoardText: text });
  };
  const createBoradBtn = async () => {
    if (borad.noticeBoardH1 != "" && borad.noticeBoardText != "") {
      await createNoticeBoard(borad);
      alert("입력되었습니다.");
      navigate("/noticeBoard");
    } else {
      alert("제대로 입력 되지않았습니다!");
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (member != null) {
      setBorad({ ...borad, userCode: member?.userCode });
    }
    console.log(borad);
  }, [member]);

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

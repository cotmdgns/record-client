import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import ReactModule from "../../components/ReactModule";
import Input from "../../components/Input";
//게시판
const NoticeBoard = () => {
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
    <div id="oneOneInquiryWriting">
      <div id="oneOneInquiryWritingH1">1:1 문의하기</div>
      <div>
        <Input label="문의 제목* : " type="text" />
        <div>
          <div>문의 내용* :</div>
          <textarea id="oneOneInquiryTextarea"></textarea>
        </div>
        <div>
          <div>문의 파일 : </div>
          <input label="이미지 생성 : " type="file" accept="image/*" multiple />
        </div>
      </div>
      <button>문의 하기</button>
    </div>
  );
};
export default NoticeBoard;

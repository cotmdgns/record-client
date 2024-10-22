import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//게시판
const NoticeBoard = () => {
  return (
    <>
      <div>
        <ReactQuill theme="snow" />
      </div>
    </>
  );
};
export default NoticeBoard;

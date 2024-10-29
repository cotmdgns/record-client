import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
  const navigate = useNavigate();
  const page = () => {
    navigate("noticeBoardWriting");
  };
  const detailBtn = (code) => {
    navigate(`detailNoticBorad/${code}`);
  };
  return (
    <div id="noticeBordePage">
      <h1>게시판 머리</h1>
      <button onClick={page}>글쓰기</button>
      <div>여기가 map 돌려서 보여주럭</div>
      <a onClick={() => detailBtn()}>gdgd</a>
    </div>
  );
};
export default NoticeBoard;

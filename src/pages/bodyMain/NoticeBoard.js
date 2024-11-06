import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewBoard } from "../../api/noticeBoardAPI";
import "../../assets/noticeBoard.scss";

const NoticeBoard = () => {
  const navigate = useNavigate();
  const page = () => {
    navigate("noticeBoardWriting");
  };
  const detailBtn = (code) => {
    navigate(`detailNoticBorad/${code}`, { state: { code } });
  };

  const [viewNoticeBoard, setViewNoticeBoard] = useState([]);
  const viewBoardAll = async () => {
    const result = await viewBoard();
    setViewNoticeBoard(result.data);
  };
  useEffect(() => {
    viewBoardAll();
    console.log(viewNoticeBoard);
  }, []);

  return (
    <div id="noticeBordePage">
      <div id="noticeBordeH1">
        <h1>게시판</h1>
      </div>
      <table id="noticeBordePageTable">
        <thead>
          <tr id="noticeBordePageTheadTr">
            <th>번호</th>
            <th>제목</th>
            <th>생성날짜</th>
            <th>글쓴이</th>
          </tr>
        </thead>
        <tbody id="noticeBordePageTbody">
          {viewNoticeBoard.map((Board) => (
            <tr
              id="noticeBordePageTr"
              key={Board.noticeBoardCode}
              onClick={() => detailBtn(Board.noticeBoardCode)}
            >
              <td>{Board.noticeBoardCode}</td>
              <td>{Board.noticeBoardH1}</td>
              <td>
                {Board.noticeBoardCreated.replace("T", " ").substr(0, 16)}
              </td>
              <td>{Board.userTable.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="creatBtn">
        <button onClick={page}>글쓰기</button>
      </div>
    </div>
  );
};
export default NoticeBoard;

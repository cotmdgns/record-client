import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DetailOneOneView } from "../../api/oneOneInquiry";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/oneOneInquiry.scss";
import Editer from "../../components/Editer";

const DetailOneOnePage = () => {
  const { OneOneCode } = useParams();
  const [detailView, setDetailView] = useState(null);
  const detailViewCode = async () => {
    const result = await DetailOneOneView(OneOneCode);
    setDetailView(result.data);
  };
  const [showEditer, setShowEditer] = useState(false);

  const { member } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    detailViewCode();
    console.log(detailView);
    console.log(member);
    console.log(OneOneCode);
  }, []);

  const AllViewBtn = () => {
    navigator("/OneOneInquiry");
  };

  const toggleBtn = () => {
    setShowEditer(!showEditer);
  };

  return (
    <div id="detailOneOnePage">
      <div id="detailOneOnePageBox">
        <div id="detailOneOnePageUserName">
          작성자 : {detailView?.userTable.userName}
        </div>
        <div id="detailOneOnePageH1">제목 : {detailView?.oneOneInquiryH1}</div>
        <div id="detailOneOnePageCreated">
          생성날짜 :{" "}
          {detailView?.oneOneInquiryCreated?.replace("T", " ").substr(0, 16)}
        </div>
      </div>
      <div id="detailOneOnePageText">
        <div>{detailView?.oneOneInquiryText}</div>
      </div>
      <Editer />
      <div>
        <button onClick={AllViewBtn}>목록보기</button>

        {/* 디테일 코드가 2 같다면않다면? 유저코드3 이면 true && 유저코드가3 이고 3이랑*/}
        {detailView?.userTable.userCode !== member?.userCode &&
        member?.userCode == 3 ? (
          <button onClick={toggleBtn}>답글쓰기</button>
        ) : null}
      </div>
    </div>
  );
};
export default DetailOneOnePage;

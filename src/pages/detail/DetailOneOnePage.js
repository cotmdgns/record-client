import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DetailOneOneView } from "../../api/oneOneInquiry";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/oneOneInquiry.scss";

const DetailOneOnePage = () => {
  const { OneOneCode } = useParams();
  const [detailView, setDetailView] = useState(null);
  const detailViewCode = async () => {
    const result = await DetailOneOneView(OneOneCode);
    setDetailView(result.data);
  };
  const { member } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    detailViewCode();
    console.log(detailView);
    console.log(member);
  }, []);

  const AllViewBtn = () => {
    navigator("/OneOneInquiry");
  };
  return (
    <div id="detailOneOnePage">
      <div id="detailOneOnePageBox">
        <div id="detailOneOnePageUserName">
          작성자 : {detailView?.userTable.userName}
        </div>
        <div id="detailOneOnePageH1">제목 : {detailView?.oneOneInquiryH1}</div>
        <div id="detailOneOnePageCreated">
          생성날짜 :
          {detailView?.oneOneInquiryCreated?.replace("T", " ").substr(0, 16)}
        </div>
      </div>
      <div id="detailOneOnePageText">
        <div>내용 : {detailView?.oneOneInquiryText}</div>
      </div>
      <div>
        <button onClick={AllViewBtn}>목록보기</button>
        <button>답글쓰기</button>
      </div>
    </div>
  );
};
export default DetailOneOnePage;

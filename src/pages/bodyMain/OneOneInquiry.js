import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllViewOneOneInquiry } from "../../api/oneOneInquiry";
import { useAuth } from "../../contexts/AuthContext";
const OneOneInquiry = () => {
  const [allViewOneOne, setAllViewOneOne] = useState([]);
  const viewALlOneOne = async () => {
    const result = await AllViewOneOneInquiry();
    setAllViewOneOne(result.data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    viewALlOneOne();
  }, []);
  const { member } = useAuth();

  useEffect(() => {
    console.log(allViewOneOne);
    console.log(member);
  }, [allViewOneOne]);

  // 글쓰기 페이지 이동
  const createOneOneInquiry = () => {
    navigate("oneOneInquiryWriting");
  };

  // 디테일 페이지 이동하기
  const DetailOneOnePage = (code) => {
    console.log("gd", code);
    if (member?.userManager == 3) {
      navigate(`detailOneOnePage/${code.oneOneInquiryCode}`);
    } else if (member?.userCode === code.userTable.userCode) {
      navigate(`detailOneOnePage/${code.oneOneInquiryCode}`);
    } else {
      alert("관리자만 들어올수있습니다.");
    }
  };

  return (
    <div id="oneOneInquiry">
      <div id="oneOneInquiryH1">1:1 문의하기</div>

      <table id="oneOneInquiryTable">
        <thead id="">
          <tr id="oneOneInquiryTableTr">
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody id="oneOneInquiryTbody">
          {allViewOneOne.map((viewOneOne) => (
            <tr
              id="oneOneInquiryTr"
              key={viewOneOne.oneOneInquiryCode}
              onClick={() => DetailOneOnePage(viewOneOne)}
            >
              <th>{viewOneOne.oneOneInquiryCode}</th>
              <td>
                {viewOneOne.userTable.userManager === member?.userManager
                  ? viewOneOne.oneOneInquiryH1
                  : "비밀 답변입니다."}
              </td>
              <th>{viewOneOne.userTable.userName}</th>
              <th>
                {viewOneOne.oneOneInquiryCreated
                  .replace("T", " ")
                  .substr(0, 16)}
              </th>
              <th>
                {viewOneOne.oneOneInquiryState === 0 ? "답변대기" : "답변완료"}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="oneOneInquiryButton">
        <button onClick={createOneOneInquiry}>글쓰기</button>
      </div>
    </div>
  );
};
export default OneOneInquiry;

import { useState, useEffect, useMemo } from "react";
import Editer from "../../components/Editer";
import { Navigate, useNavigate } from "react-router-dom";
import { AllViewOneOneInquiry } from "../../api/oneOneInquiry";

const OneOneInquiry = () => {
  const [allViewOneOne, setAllViewOneOne] = useState([]);

  const viewALlOneOne = async () => {
    const result = await AllViewOneOneInquiry();
    setAllViewOneOne(result.data);
  };

  useEffect(() => {
    viewALlOneOne();
    console.log(allViewOneOne);
  }, []);
  const navigate = useNavigate();

  const createOneOneInquiry = () => {
    navigate("oneOneInquiryWriting");
  };
  return (
    <div id="oneOneInquiry">
      <div>
        <div>1:1 문의하기</div>
        {allViewOneOne.map((viewOneOne) => (
          <a key={viewOneOne.oneOneInquiryCode}>
            <div>
              <div>
                생성날짜 :{" "}
                {viewOneOne.oneOneInquiryCreated
                  .replace("T", " ")
                  .substr(0, 16)}
              </div>
              <div>제목 : {viewOneOne.oneOneInquiryH1}</div>
              <div>내용 : {viewOneOne.oneOneInquiryText}</div>
              <div>
                상태코드 0이면 처리중, 1이면 답변완료 :{" "}
                {viewOneOne.oneOneInquiryState}
              </div>
            </div>
          </a>
        ))}
      </div>
      <button onClick={createOneOneInquiry}>글쓰기</button>
    </div>
  );
};
export default OneOneInquiry;

import "../../assets/oneOneInquiry.scss";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { createOneOneInquiry } from "../../api/oneOneInquiry";
import { useNavigate } from "react-router-dom";

const OneOneInquiryWriting = () => {
  const { member } = useAuth();
  const [userMember, setUserMember] = useState("");
  const [oneOneInquiry, setOneOneInquiry] = useState({
    oneOneInquiryH1: "",
    oneOneInquiryText: "",
    oneOneInquiryFile: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setUserMember(member);
  }, [oneOneInquiry.oneOneInquiryText]);
  const img = (e) => {
    const result = e.target.files[0];
    setOneOneInquiry({ ...oneOneInquiry, oneOneInquiryFile: result });
  };
  const [click, setClick] = useState(false);
  const clickBth = () => {
    setClick(true);
  };

  const style = {
    backgroundColor: "#51b6a0",
    color: "white",
  };
  const oneOneBtn = async () => {
    const formdate = new FormData();
    formdate.append("userCode", member.userCode);
    formdate.append("oneOneInquiryH1", oneOneInquiry.oneOneInquiryH1);
    formdate.append("oneOneInquiryText", oneOneInquiry.oneOneInquiryH1);
    if (click) {
      const result = await createOneOneInquiry(formdate);
      if (result.status === 200) {
        alert("정상적으로 작성되었습니다.");
        navigate("/oneOneInquiry");
      }
    } else {
      alert("확인 버튼을 눌러주세요");
    }
  };

  return (
    <div id="oneOneInquiryWriting">
      <div id="oneOneInquiryWritingH1">1:1 문의하기</div>
      <div id="oneOneInquiryWritingBox">
        <div>
          개인정보 수집 및 이용 동의 <p>(필수)</p>
        </div>
        <div>
          <div>1. 수집항목</div>
          <div>이름, 이메일</div>
          <div>2. 목적</div>
          <div>문의/신고(반품,교환)접수 및 결과 회신</div>
          <div>3. 보유 및 이용 기간</div>
          <div>
            전자상거래법 시행령 제6조(소비자의 불만 및 분쟁처리 관한 기록)에
            따라 3년 보관 후 파기합니다. ※고객님께서는 개인정보 수집에 동의를
            거부할 권리가 있으며, 동의 거부 시 1:1 문의하기 이용이 불가합니다.
          </div>
        </div>
        <div>
          <div>
            위의 개인정보 수집 및 이용에 동의합니다. (확인 후 문의가
            가능합니다.)
          </div>
        </div>
      </div>
      <button
        id="oneOneInquiryWritingButton"
        style={click ? style : null}
        onClick={clickBth}
      >
        확인
      </button>

      <div id="oneOneInquiryWritingText">
        <Input
          id="inputText"
          label="문의 제목* : "
          type="text"
          value={oneOneInquiry.oneOneInquiryH1}
          change={(e) =>
            setOneOneInquiry({
              ...oneOneInquiry,
              oneOneInquiryH1: e.target.value,
            })
          }
        />
        <div>
          <textarea
            id="oneOneInquiryTextarea"
            value={oneOneInquiry.oneOneInquiryText}
            onChange={(e) =>
              setOneOneInquiry({
                ...oneOneInquiry,
                oneOneInquiryText: e.target.value.substring(0, 500),
              })
            }
          ></textarea>
          <div>
            문자 수 제한 : {oneOneInquiry.oneOneInquiryText.length} / 500
          </div>
        </div>
      </div>
      <button id="oneOneInquiryWritingButton" onClick={oneOneBtn}>
        문의 하기
      </button>
    </div>
  );
};
export default OneOneInquiryWriting;

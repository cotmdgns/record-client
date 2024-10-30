import "../assets/footer.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const noticeBoard = () => {
    // 게시판
    navigate("/noticeBoard");
  };
  const eventBoard = () => {
    // 이벤트
    navigate("/eventBoard");
  };
  const productInquiry = () => {
    // 포토리뷰
    navigate("/productInquiry");
  };
  const oneOneInquiry = () => {
    // 1:1 문의하기
    navigate("/oneOneInquiry");
    window.location.href = "/oneOneInquiry";
  };
  return (
    <>
      <div id="paddingTop"></div>
      <div id="footerLine">
        <div id="footerBox">
          <div>
            <ul>
              <li>고객지원센터</li>
              <li>운영시간 09:00 ~ 18:00 / 점심시간 : 12:00 ~ 13:00</li>
              <li>토,일 공휴일 휴무</li>
            </ul>
            <ul>
              <li>반폼배송지</li>
              <li>오늘도 푸르게푸르게 두산생명</li>
            </ul>
          </div>
          <div>
            <ul>
              <li onClick={noticeBoard}>게시판</li>
              <li onClick={eventBoard}>이벤트</li>
              <li onClick={productInquiry}>포토리뷰</li>
              {/* <li onClick={noticeBoard}>포토리뷰</li> */}
              <li onClick={oneOneInquiry}>1:1문의하기</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="footerLine">
        <div id="footerBoxBody">
          <div>회사소개</div>
          <div>이용약관</div>
          <div>개인정보처리방침</div>
          <div>이용안내</div>
        </div>
      </div>
      <div id="footerLine">
        <div id="footerBoxFooter">
          <div id="footerInfoList">
            <div>대표 : 히오스</div>
            <div>사업자등록번호 : 15-87-889-9999-42</div>
          </div>
          <div id="footerInfoList">
            <div>통신판매업신고번호 : 제2099-메트로-4040호</div>
          </div>
          <div id="footerInfoList">
            <div>개인정보관리자 : 히오스</div>
            <div>주소 : 메트로시 마추피추구 온정로 202 아트팩토리</div>
          </div>
          <div id="footerInfoList">
            <div>메일 : cotmdgns@naver.com</div>
            <div>호스팅 제공 : 엔에이치앤커머스(주)</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;

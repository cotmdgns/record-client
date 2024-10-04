import "../../assets/signup.scss";
import { FaRecordVinyl } from "react-icons/fa";

const Signup = () => {
  return (
    <>
      <div id="BodyBack">
        <div id="BodySignup">
          <div id="BodyBoxLeft">
            <div>
              <FaRecordVinyl />
            </div>
            <div>Record</div>
          </div>
          <div id="BodyBoxRight">
            <div>
              <label>아이디</label>
              <input type="text" placeholder="아이디" />
            </div>
            <div>
              <label>비밀번호</label>
              <input type="password" placeholder="비밀번호" />
            </div>
            <div>
              <label>이름</label>
              <input type="text" placeholder="이름" />
            </div>
            <div>
              <label>전화번호</label>
              <input type="text" placeholder="전화번호" />
            </div>
            <div>
              <label>생년월일</label>
              <input type="text" placeholder="생년월일 8자" />
            </div>
            <div>
              <button>남자</button>
              <button>여자</button>
            </div>
            <div>
              <button>가입하기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

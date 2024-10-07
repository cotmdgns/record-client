import "../../assets/signup.scss";
import { FaRecordVinyl } from "react-icons/fa";
import Input from "../../components/Input";
import { useState, useEffect } from "react";

const Signup = () => {
  const [member, setMember] = useState({
    userId: "",
    userPwd: "",
    userName: "",
    userPhone: "",
    userBirthdayData: "",
    userGender: "",
  });

  const ManGender = () => {
    setMember({ ...member, userGender: "남" });
  };

  const WomanGender = () => {
    setMember({ ...member, userGender: "여" });
  };

  const submit = () => {};
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
            <div id="BodyBox">
              <h1 id="BodyBoxH1">회원가입</h1>
              <Input
                label="ID"
                placeholder="아이디를 입력해주세요"
                type="text"
                value={member.userId}
                change={(e) => setMember({ ...member, userId: e.target.value })}
              />
              <Input
                label="PASSWORD"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                value={member.userPwd}
                change={(e) =>
                  setMember({ ...member, userPwd: e.target.value })
                }
              />
              <Input
                label="NAME"
                placeholder="이름을 입력해주세요"
                type="text"
                value={member.userName}
                change={(e) =>
                  setMember({ ...member, userName: e.target.value })
                }
              />
              <Input
                label="PHONE"
                placeholder="전화번호 8자리 입력"
                type="text"
                value={member.userPhone}
                change={(e) =>
                  setMember({ ...member, userPhone: e.target.value })
                }
              />
              <div>
                <div id="BodyButton">
                  <button onClick={ManGender}>남</button>
                  <button onClick={WomanGender}>여</button>
                </div>
              </div>
              <div>
                <button onClick={submit}>가입하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

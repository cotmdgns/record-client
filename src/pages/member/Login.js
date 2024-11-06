import "../../assets/login.scss";
import { FaRecordVinyl } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { login } from "../../api/member";
import { useAuth } from "../../contexts/AuthContext";

const Login = ({ close, signUpPage }) => {
  const [member, SetMember] = useState({
    userId: "",
    userPwd: "",
  });
  const [Check, SetCheck] = useState("");
  const { login: authLogin } = useAuth();
  const styleFalse = {
    color: "red",
  };

  let enterBoo = true;
  const loginButton = async () => {
    // 아이디 및 비밀번호 입력안했을떄
    if (member.userId === "" && member.userPwd === "") {
      SetCheck("아이디와 비밀번호를 입력해주세요");
    } else if (member.userId === "" && member.userPwd !== "") {
      SetCheck("아이디를 입력해주세요");
    } else if (member.userId !== "" && member.userPwd === "") {
      SetCheck("비밀번호를 입력해주세요");
    }
    // 재대로 입력했을때
    if (member.userId !== "" && member.userPwd !== "") {
      try {
        const result = await login(member);

        authLogin(result.data);
        alert("로그인 성공했당게여");
        SetCheck("");
        close();
      } catch {
        alert("회원정보가 틀립니다.");
      }
    }
  };

  // 엔터처리 (3번이 실행이됨 한번만 했으면 좋겠는데)

  document.addEventListener("keydown", function (event) {
    if (window.event.keyCode === 13 && enterBoo) {
      loginButton();
    }
    enterBoo = false;
  });

  return (
    <>
      <div id="BodyBack">
        <div id="BodyLogin">
          <div id="BodyLoginLeft">
            <div>
              <div id="Body1">
                <FaRecordVinyl />
                <div>Record</div>
              </div>
              <div id="Body2">
                <div>
                  아직 회원이 아니신가요?
                  <button onClick={signUpPage}>회원가입 페이지로 이동</button>
                </div>
              </div>
            </div>
          </div>
          <div id="BodyLoginRight">
            <div id="BodyBox">
              <div id="BodyBoxdiv">
                <button id="buttonClose" onClick={close}>
                  <IoMdClose />
                </button>
              </div>
              <h1 id="BodyBoxH1">Login</h1>
              <div>
                <Input
                  label="ID"
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  value={member.userId}
                  change={(e) =>
                    SetMember({ ...member, userId: e.target.value })
                  }
                />
                <Input
                  label="PASS"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={member.userPwd}
                  change={(e) =>
                    SetMember({ ...member, userPwd: e.target.value })
                  }
                />
              </div>
              <div id="styleLogin" style={styleFalse}>
                {Check}
              </div>
              <div id="buttonLogin">
                <button onClick={loginButton}>Login Up Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

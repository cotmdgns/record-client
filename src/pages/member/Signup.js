import "../../assets/signup.scss";
import { FaRecordVinyl } from "react-icons/fa";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { idCheck, signup } from "../../api/member";
import { IoMdClose } from "react-icons/io";

let memberBirth = /^\d{2}(0[0-9]|1[0-2])(0[0-9]|(1|2)[0-9]|3[0-1])$/;
let memberPwd =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,15}$/;
let memberPhone = /^010\d{8}$/;
let memberId = /^[a-z0-9]{6,15}$/;
let memberEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Signup = ({ close, loginPage }) => {
  const [member, setMember] = useState({
    userId: "",
    userPwd: "",
    userName: "",
    userPhone: "",
    userBirthdayData: "",
    userEmail: "",
    userGender: "",
  });
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setphone] = useState("");
  const [birthdayData, setbirthdayData] = useState("");
  const [email, setEmail] = useState("");
  const [userIdCheck, setUserIdCheck] = useState(false);

  // 회원가입,버튼 스타일
  const styleTrue = {
    color: "green",
  };
  const styleFalse = {
    color: "red",
  };
  const ButtonStyle = {
    backgroundColor: "rgb(226, 226, 226)",
  };
  //

  //id중복체크
  const Check = async (id) => {
    const result = await idCheck(id);
    if (result.data !== "") {
      setId("존재하는 아이디 입니다.");
      setUserIdCheck(false);
    } else {
      setUserIdCheck(true);
    }
  };
  // 아이디 체크 임펙트
  useEffect(() => {
    //아이디 체크 (DB에 왔다가서 확인후 널이 아니면 불가능, 널이면 가능)
    //아이디 체크 (정규 표현식)
    if (member.userId !== "") {
      if (memberId.test(member.userId)) {
        Check(member.userId);
        setId("가능한 아이디 입니다.");
      } else {
        setId("6~15자의 영문 소문자, 숫자로만 이루어진 아이디를 만들어주세요");
      }
    } else {
      setId("");
    }
  }, [member.userId]);
  // 비밀번호 체크 임펙트
  useEffect(() => {
    //비밀번호 체크
    if (member.userPwd !== "") {
      if (memberPwd.test(member.userPwd)) {
        setPwd("비밀번호 합격");
      } else {
        setPwd("비밀번호 아직 안됨");
      }
    } else {
      setPwd("");
    }
  }, [member.userPwd]);
  // 전화번호 체크 임펙트
  useEffect(() => {
    //폰 체크
    if (member.userPhone !== "") {
      if (memberPhone.test(member.userPhone)) {
        setphone("폰 합격");
      } else {
        setphone("폰 다시 입력해주세요");
      }
    } else {
      setphone("");
    }
  }, [member.userPhone]);
  // 생년월일 체크 임펙트
  useEffect(() => {
    //생년월일 체크
    if (member.userBirthdayData !== "") {
      if (
        member.userBirthdayData.length < 6 ||
        !memberBirth.test(member.userBirthdayData)
      ) {
        setbirthdayData("생년월일 ㄴㄴ 불합격");
      } else {
        setbirthdayData("생년월일 ㅇㅋ 합격");
      }
    } else {
      setbirthdayData("");
    }
  }, [member.userBirthdayData]);

  useEffect(() => {
    if (member.userEmail !== "") {
      if (memberEmail.test(member.userEmail)) {
        setEmail("맞는듯?");
      } else {
        setEmail("아닌듯???");
      }
    }
  }, [member.userEmail]);

  useEffect(() => {
    console.log(member.userGender);
  }, [member.userGender]);
  //회원가입 버튼
  const submit = () => {
    // 성별 체크 안했을때
    if (member.userGender === "" || member.userGender === null) {
      console.log("성별체크 나 안됬는데?");
    }
    // 다 입력이 되었을때 호출
    if (
      member.userId.trim !== "" &&
      memberId.test(member.userId) &&
      userIdCheck &&
      member.userPwd.trim !== "" &&
      memberPwd.test(member.userPwd) &&
      member.userPhone.trim !== "" &&
      memberPhone.test(member.userPhone) &&
      member.userBirthdayData.trim !== "" &&
      memberBirth.test(member.userBirthdayData) &&
      member.userName.trim !== "" &&
      member.userGender !== ""
    ) {
      signup(member);
      alert("회원가입 하셨습니다 ㅊㅊ");
      close();
    } else {
      alert("제대로 입력하지 않았습니다.");
    }
  };
  return (
    <>
      <div id="BodyBack">
        <div id="BodySignup">
          <div id="BodyBoxLeft">
            <div>
              <div id="Body1">
                <FaRecordVinyl />
                <div>Record</div>
              </div>
              <div id="Body2">
                <div>
                  기존 회원이신가여?
                  <button onClick={loginPage}>로그인 페이지로 이동</button>
                </div>
              </div>
            </div>
          </div>
          <div id="BodyBoxRight">
            <div id="BodyBox">
              <div id="BodyBoxdiv">
                <button id="buttonClose" onClick={close}>
                  <IoMdClose />
                </button>
              </div>
              <h1 id="BodyBoxH1">Sign Up</h1>

              <Input
                label="ID"
                placeholder="아이디를 입력해주세요"
                type="text"
                value={member.userId}
                change={(e) => setMember({ ...member, userId: e.target.value })}
                divState={id}
                style={
                  memberId.test(member.userId) && userIdCheck
                    ? styleTrue
                    : styleFalse
                }
              />
              <Input
                label="PASSWORD"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                value={member.userPwd}
                change={(e) =>
                  setMember({ ...member, userPwd: e.target.value })
                }
                divState={pwd}
                style={memberPwd.test(member.userPwd) ? styleTrue : styleFalse}
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
                placeholder="전화번호 입력"
                type="text"
                value={member.userPhone}
                change={(e) =>
                  setMember({ ...member, userPhone: e.target.value })
                }
                divState={phone}
                style={
                  memberPhone.test(member.userPhone) ? styleTrue : styleFalse
                }
              />
              <Input
                label="BIRTHDAYDATE"
                placeholder="생년월일 8자리"
                type="text"
                value={member.userBirthdayData}
                change={(e) =>
                  setMember({ ...member, userBirthdayData: e.target.value })
                }
                divState={birthdayData}
                style={
                  memberBirth.test(member.userBirthdayData)
                    ? styleTrue
                    : styleFalse
                }
              />
              <Input
                label="Email"
                placeholder="이메일을 입력해주세여"
                type="text"
                value={member.userEmail}
                change={(e) =>
                  setMember({ ...member, userEmail: e.target.value })
                }
                divState={email}
                style={
                  memberEmail.test(member.userEmail) ? styleTrue : styleFalse
                }
              />
              <div id="noneInput">
                <div id="BodyButton">
                  <button
                    id="ButtonMan"
                    style={member.userGender === "남" ? ButtonStyle : null}
                    onClick={() => {
                      setMember({ ...member, userGender: "남" });
                    }}
                  >
                    남
                  </button>
                  <button
                    id="ButtonWoMan"
                    style={member.userGender === "여" ? ButtonStyle : null}
                    onClick={() => {
                      setMember({ ...member, userGender: "여" });
                    }}
                  >
                    여
                  </button>
                </div>
              </div>
              <div id="BodySubmit">
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

import { useState, useEffect, useRef } from "react";
import { idCheck, userUpDatePut } from "../../api/member";
import "../../assets/myPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Address from "../../components/address";

const MyPage = () => {
  // 비밀번호 체크
  const [pwdDefualt, setPwdDefualt] = useState("");
  const [pwdUpdata, setPwdUpdata] = useState("");
  const [pwdUpdataTrue, setPwdUpdataTrue] = useState("");
  // 이메일 입력란
  const [emailUpdata, setEmailUpdata] = useState("");
  // 이미지 변경
  const [preview, setPreview] = useState("");

  const [member, setMember] = useState([]);
  const [page, setPage] = useState(1);
  const [checkPwd, setCheckPwd] = useState("");
  // 인풋 disabled 처리
  const navigate = useNavigate();
  const { logDelete, logout } = useAuth();

  const id = localStorage.getItem("id");

  const maPageMember = async () => {
    const result = await idCheck(id);
    setMember(result.data);
  };
  useEffect(() => {
    maPageMember();
  }, []);

  useEffect(() => {
    console.log(member);
  }, [member]);

  // 업데이트 페이지 이동
  const memberUpdate = () => {
    setPage(2);
  };
  // 업데이트 수정 완료
  const memberUpdateBack = () => {
    // if (window.confirm("수정하시겠습니까?")) {
    //   alert("수정되었습니다.");
    //   setPage(1);
    // } else {
    //   setPage(2);
    // }
    setPage(1);
  };

  // 삭제
  const memberDelete = () => {
    // 눌렀을경우 모달창이 뜨면서 정말로 삭제하시겠습니까?
    // 다시한번 삭제하겠습니다 누르면 모든 정보 삭제시키기
    setPage(3);
  };
  const memberDeleteSuccess = () => {
    if (member.userPwd === checkPwd) {
      if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
        logDelete(member.userCode);
        navigate("/");
      } else {
        setPage(1);
      }
    } else {
      alert("회원정보가 틀립니다");
    }
  };
  const memberDeleteBack = () => {
    setPage(1);
  };

  // 이미지 업데이트 (프리뷰)
  const imgPreview = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };
  // 프리뷰 이미지 삭제하기
  const imgPreviewDeleteBtn = () => {
    setPreview("");
  };

  /* 수정하기 버튼 모음 */
  const pwdBtn = async () => {
    if (
      pwdUpdata === pwdUpdataTrue &&
      pwdUpdata !== null &&
      pwdUpdataTrue !== null
    ) {
      const response = await userUpDatePut({
        userCode: member.userCode,
        userId: member.userId,
        userPwd: pwdUpdataTrue,
        oldUserPwd: pwdDefualt,
      });
      let state = response.data;
      console.log(state);
      switch (state) {
        case 1:
          alert("새 비밀번호와 같습니다.");
          break;
        case 2:
          // 성공적으로 변경되면 자동으로 로그아웃되게
          alert("비밀번호가 성공적으로 변경습니다!");
          navigate("/");
          logout();
          break;
        case 3:
          alert("현재 비밀번호와 다릅니다!");
          break;
      }
    } else {
      alert("변경된 비밀번호가 다릅니다.");
    }
  };

  // 이메일 변경
  const emailBtn = async () => {
    if (emailUpdata !== null && emailUpdata !== "") {
      const result = await userUpDatePut({
        userCode: member.userCode,
        userEmail: emailUpdata,
      });
      member.userEmail = result.data;
      alert("이메일이 변경되었습니다!");
      setEmailUpdata("");
    } else {
      alert("입력해주세요.");
    }
  };
  const imgUpdataBtn = async () => {
    if (preview !== "" && preview !== null) {
      const formData = new FormData();
      formData.append("userCode", member.userCode);
      formData.append("userImg", preview);
      const result = await userUpDatePut(formData);
    } else {
      alert("ss");
    }
  };

  return (
    <>
      <div id="myPageBody" key={member.userCode}>
        <div id="myPageBodyImgBox">
          {preview == "" ? (
            <img src={member.userImg} id="myPageImg"></img>
          ) : (
            <img src={preview} id="myPageImg"></img>
          )}
          {page === 2 ? (
            <div id="">
              <div>프로필 이미지 변경하기</div>
              <div>
                <label>
                  이미지 업로드
                  <Input
                    type="file"
                    accept="image/*"
                    change={imgPreview}
                    styleInput={{ display: "none" }}
                  />
                </label>
                <button id="myPageButton" onClick={imgPreviewDeleteBtn}>
                  이미지 되돌리기
                </button>
              </div>
              <button onClick={imgUpdataBtn}>수정하기</button>
            </div>
          ) : null}
        </div>
        <div id="myPageBodyInForMation">
          {page === 1 ? (
            <div id="OnePage">
              <div id="OnePageProfile">
                <div>이름 : {member.userName}</div>
                <div>성별 : {member.userGender}</div>
                <div>이메일 : {member.userEmail}</div>
                <div>휴대번호 {member.userPhone}</div>
                <div>생년월일 : {member.userBirthdayData}</div>
                <div>이미지 주소 : {member.userImg}</div>
              </div>
              <div id="myPageButton">
                <button onClick={memberUpdate}>수정하기</button>
                <button onClick={memberDelete}>회원탈퇴</button>
              </div>
            </div>
          ) : page === 2 ? (
            <div id="myPageBodyUpdate">
              <div id="">
                <div>비밀번호 수정</div>
                <div>
                  <Input
                    placeholder="현재 비밀번호"
                    type="password"
                    value={pwdDefualt}
                    change={(e) => setPwdDefualt(e.target.value)}
                  />
                  <Input
                    placeholder="새 비밀번호"
                    type="password"
                    value={pwdUpdata}
                    change={(e) => setPwdUpdata(e.target.value)}
                  />
                  <Input
                    placeholder="새 비밀번호 확인"
                    type="password"
                    value={pwdUpdataTrue}
                    change={(e) => setPwdUpdataTrue(e.target.value)}
                  />
                  <button id="myPageButton" onClick={pwdBtn}>
                    수정하기
                  </button>
                </div>
              </div>
              <div id="">
                <div>이메일 등록하기</div>
                <div>
                  <Input
                    placeholder="이메일 등록하기"
                    type="text"
                    value={emailUpdata}
                    change={(e) => setEmailUpdata(e.target.value)}
                  />
                  <button id="myPageButton" onClick={emailBtn}>
                    수정하기
                  </button>
                </div>
              </div>
              <div>
                <Address />
                <button onClick={memberUpdateBack}>수정하기</button>
              </div>
              <button onClick={memberUpdateBack}>뒤로가기</button>
            </div>
          ) : (
            <div>
              <Input
                label="현재 비밀번호 : "
                type="password"
                value={checkPwd}
                change={(e) => setCheckPwd(e.target.value)}
              />
              <button id="myPageButton" onClick={memberDeleteSuccess}>
                탈퇴하기
              </button>
              <button id="myPageButton" onClick={memberDeleteBack}>
                뒤로가기
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MyPage;

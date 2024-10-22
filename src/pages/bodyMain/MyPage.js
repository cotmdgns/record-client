import { useState, useEffect } from "react";
import { idCheck, userUpDatePut } from "../../api/member";
import "../../assets/myPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";

const MyPage = () => {
  // 비밀번호 체크
  const [pwdDefualt, setPwdDefualt] = useState("");
  const [pwdUpdata, setPwdUpdata] = useState("");
  const [pwdUpdataTrue, setPwdUpdataTrue] = useState("");
  const [member, setMember] = useState([]);

  const [page, setPage] = useState(1);
  const [checkPwd, setCheckPwd] = useState("");
  // 인풋 disabled 처리
  const navigate = useNavigate();
  const { logDelete } = useAuth();

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
  const memberUpdateSuccess = () => {
    // if (window.confirm("수정하시겠습니까?")) {
    //   alert("수정되었습니다.");
    //   setPage(1);
    // } else {
    //   setPage(2);
    // }
    setPage(1);
  };
  // const memberUpdateBack = () => {
  //   if (window.confirm("수정한 정보가 사라집니다.")) {
  //     setPage(1);
  //   } else {
  //     setPage(2);
  //   }
  // };

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

  // 이미지 업데이트
  const memberImgUpdate = () => {
    // 기본적으로 회원가입을 했을경우 해당 유저의 이미지는 디폴트값으로 설정되있으면서
    // 수정하기 눌렀을경우
    // 1. 해당유저 폴더가 있는지 확인한 후
    // 2. 해당 유저의 프로필 폴더를 만들어주기
    // 하단버튼에 수정완료를 눌렀을때 변경되기
    // 그러면 이미지 수정버튼을눌렀을때 그냥 해당 디폴트값 사진 위에 올려놓고 수정안하기했을때 다시 놀린사진은 없애버리기
    alert("이미지 수정하기!");
  };

  /* 수정하기 버튼 모음 */
  //  pwdDefualt   ,pwdUpdata  ,pwdUpdataTrue
  const pwdBtn = async () => {
    if (pwdUpdata === pwdUpdataTrue) {
      const response = await userUpDatePut({
        userCode: member.userCode,
        userId: member.userId,
        userPwd: pwdUpdataTrue,
        oldUserPwd: pwdDefualt,
      });
      if (response.status === 401) {
        alert(response.data);
      }
    } else {
      alert("새 비밀번호와 새 비밀번호 확인이 다릅니다.");
    }
  };
  return (
    <>
      <div id="myPageBody" key={member.userCode}>
        <div id="myPageBodyImgBox">
          <img src={member.userImg} id="myPageImg"></img>
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
                  <Input placeholder="이메일 등록하기" type="text" />
                  <button id="myPageButton">수정하기</button>
                </div>
              </div>
              <div id="">
                <div>프로필 이미지 변경하기</div>
                <div>
                  <Input type="file" />
                  <button id="myPageButton">수정하기</button>
                </div>
              </div>
              <button onClick={memberUpdateSuccess}>수정완료</button>
              {/* <button onClick={memberUpdateBack}>뒤로가기</button> */}
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

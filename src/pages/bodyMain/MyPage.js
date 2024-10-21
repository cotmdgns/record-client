import { useState, useEffect } from "react";
import { idCheck, userDelete } from "../../api/member";
import "../../assets/myPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";

const MyPage = () => {
  const [member, setMember] = useState([]);
  const [page, setPage] = useState(1);
  const [userUpdate, setUserUpdate] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const navigate = useNavigate();
  const { logDelete } = useAuth();
  const id = localStorage.getItem("id");

  const maPageMember = async () => {
    const result = await idCheck(id);
    setMember(result.data);
  };
  useEffect(() => {
    maPageMember();
    console.log(member);
  }, []);

  useEffect(() => {
    console.log(member);
  }, [member]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  // 수정, 삭제 모달창 두개 띄우면서 찐찐막 확인하기
  // 업데이트 페이지 이동
  const memberUpdate = () => {
    setPage(2);
  };
  // 업데이트 수정 완료
  const memberUpdateSuccess = () => {
    if (window.confirm("수정하시겠습니까?")) {
      setPage(1);
    } else {
      setPage(2);
    }
  };
  const memberUpdateBack = () => {
    setPage(1);
  };

  // 삭제
  const memberDelete = () => {
    // 눌렀을경우 모달창이 뜨면서 정말로 삭제하시겠습니까?
    // 다시한번 삭제하겠습니다 누르면 모든 정보 삭제시키기
    setPage(3);
  };
  const memberDeleteSuccess = () => {
    if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
      logDelete(member);
      //   navigate("/");
      //   logDelete();
    } else {
      setPage(1);
    }
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
  return (
    <>
      <div id="myPageBody" key={member.userCode}>
        <div id="myPageBodyImgBox">
          <img src={member.userImg} id="myPageImg"></img>
          {page === 2 ? (
            <>
              <Input type="file" />
            </>
          ) : null}
        </div>
        <div id="myPageBodyInForMation">
          {page === 1 ? (
            <div>
              <div>
                <div>ID : {member.userId}</div>
                <div>PASSWORD : {member.userPwd}</div>
                <div>NAME : {member.userName}</div>
                <div>GENDER : {member.userGender}</div>
                <div>EMAIL : {member.userEmail}</div>
                <div>PHONE {member.userPhone}</div>
                <div>BIRTHDAYDATE : {member.userBirthdayData}</div>
              </div>
              <div>
                <button onClick={memberUpdate}>수정하기</button>
                <button onClick={memberDelete}>회원탈퇴</button>
              </div>
            </div>
          ) : page === 2 ? (
            <div id="myPageBodyUpdate">
              <div>수정페이지롱</div>
              <Input label="ID : " type="text" placeholder={member.userId} />
              <Input label="기존 비밀번호 : " type="password" />
              <Input label="수정할 비밀번호 : " type="password" />
              <Input type="text" />
              <Input type="text" />
              <Input type="text" />
              <button onClick={memberUpdateSuccess}>수정완료</button>
              <button onClick={memberUpdateBack}>뒤로가기</button>
            </div>
          ) : (
            <div>
              <Input label="현재 비밀번호" type="password" />
              <button onClick={memberDeleteSuccess}>누른다?</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default MyPage;

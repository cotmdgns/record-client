import { useState, useEffect, useRef } from "react";
import { idCheck, userUpDatePut, userImgUpDatePut } from "../../api/member";
import "../../assets/myPage.scss";
import "../../assets/orderInquiry.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import { userId } from "../../api/orderInquiry";

const MyPage = () => {
  // 비밀번호 체크
  const [pwdDefualt, setPwdDefualt] = useState("");
  const [pwdUpdata, setPwdUpdata] = useState("");
  const [pwdUpdataTrue, setPwdUpdataTrue] = useState("");
  // 이메일 입력란
  const [emailUpdata, setEmailUpdata] = useState("");
  // 이미지 변경
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null); // 서버에 보낼 파일

  const [member, setMember] = useState(null);
  const [userOrder, setUserOrder] = useState([]);
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

  // 해당 유저 구매내역 및 주문조회
  const userOrderTable = async () => {
    const result = await userId(id);
    setUserOrder(result.data);
  };

  useEffect(() => {
    userOrderTable();
    maPageMember();
    console.log(userOrder);
  }, []);

  useEffect(() => {
    console.log(userOrder);
  }, [member, userOrder]);

  // 업데이트 페이지 이동
  const memberUpdate = () => {
    setPage(2);
  };
  // 업데이트 수정 완료
  const memberUpdateBack = () => {
    setPage(1);
  };

  // 삭제
  const memberDelete = () => {
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
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // 파일 상태 업데이트
    const url = URL.createObjectURL(selectedFile); // 미리보기 URL 생성
    setPreview(url); // 미리보기 상태 업데이트
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
      formData.append("userImg", file);
      await userImgUpDatePut(formData);
      alert("변경되었습니다!");
    } else {
      alert("사진은 삽입해주세요.");
    }
  };

  return (
    <>
      <div id="myPageBodyBack">
        <div id="myPageBody" key={member?.userCode}>
          <div id="myPageBodyImgBox">
            {preview === "" && member !== null ? (
              <img
                src={
                  "http://192.168.10.51:8084/userFolder/" +
                  member?.userId +
                  "/userProfile/" +
                  member?.userImg
                }
                id="myPageImg"
              />
            ) : (
              <img src={preview} id="myPageImg" />
            )}
            {page === 2 ? (
              <div id="TwoPage">
                <div id="TwoPageInput">
                  <label>
                    프로필 이미지 변경하기
                    <Input
                      type="file"
                      accept="image/*"
                      change={imgPreview}
                      styleInput={{ display: "none" }}
                    />
                  </label>
                </div>
                <div id="TwoPageButton">
                  <button onClick={imgUpdataBtn}>수정하기</button>
                  <button onClick={memberUpdateBack}>뒤로가기</button>
                </div>
              </div>
            ) : (
              <div id="OnePage">
                <div id="OnePageProfile">
                  <div>이름 : {member?.userName}</div>
                  <div>성별 : {member?.userGender}</div>
                  <div>이메일 : {member?.userEmail}</div>
                  <div>생년월일 : {member?.userBirthdayData}</div>
                </div>
                <div id="myPageButton">
                  <button onClick={memberUpdate}>수정하기</button>
                  <button onClick={memberDelete}>회원탈퇴</button>
                </div>
              </div>
            )}
          </div>
          <div id="myPageBodyInForMation">
            {page === 1 ? (
              <div id="orderInquiryBody">
                <div id="orderInquiryBodyOrder">
                  <h1 id="orderInquiryBodyOrderH1">내 주문 내역</h1>
                  <div id="orderInquiryProductOrder">
                    <div id="mapageOrderProduct">
                      <h1 id="mapageOrderProductStateH1">주문 확인중</h1>
                      {userOrder.filter((order) => order.orderStateCode === 1)
                        .length != 0 ? (
                        userOrder
                          .filter((order) => order.orderStateCode === 1)
                          .map((order, index) => (
                            <div
                              id="mapageOrderProductMap"
                              key={order.orderCode || index}
                            >
                              {order.orderStateCode === 1 && (
                                <div id="mapageOrderProductState">
                                  <img
                                    id="mapageOrderProductStateImg"
                                    src={
                                      "http://192.168.10.51:8084/Product/" +
                                      order?.product.productType +
                                      "/" +
                                      order?.product.productCode +
                                      "/" +
                                      order?.productImg.productImgAddress
                                    }
                                  />
                                  <div id="mapageOrderProductStateBox">
                                    <div id="mapageOrderProductStateBoxH1">
                                      <div>
                                        {" "}
                                        <div>{order.product.productType}</div>
                                        <div id="mapageOrderProductStateBoxH1Name">
                                          노래 제목 :{" "}
                                          {order.product.productName}
                                        </div>
                                      </div>
                                      <div id="mapageOrderProductStateBoxH1Address">
                                        {order.userOrderCreated}
                                      </div>
                                    </div>
                                    <div id="mapageOrderProductStateBoxBdoy">
                                      <div>
                                        {order.product.productExplanation}
                                      </div>
                                    </div>
                                    <div id="mapageOrderProductStateBoxFooter">
                                      <div>
                                        {" "}
                                        <div>
                                          주소 : {"["}
                                          {order.address.zonecode}
                                          {"] "}
                                          {order.address.jibunAddress}
                                          {", "}
                                          {order.address.roadAddress}
                                        </div>
                                        <div>
                                          상세설명 :{" "}
                                          {order.address.addressDetail}
                                        </div>
                                      </div>

                                      <div id="mapageOrderProductStateBoxFooterPrice">
                                        {order.product.productPrice}원
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                      ) : (
                        <div id="userOrderNull">정보가 없습니다😂</div>
                      )}
                    </div>

                    <div id="mapageOrderProduct">
                      <h1 id="mapageOrderProductStateH1">주문 배송중</h1>
                      {userOrder.filter((order) => order.orderStateCode === 2)
                        .length != 0 ? (
                        userOrder
                          .filter((order) => order.orderStateCode === 2)
                          .map((order, index) => (
                            <div
                              id="mapageOrderProductMap"
                              key={order.orderCode || index}
                            >
                              {order.orderStateCode === 2 && (
                                <div id="mapageOrderProductState">
                                  <img
                                    id="mapageOrderProductStateImg"
                                    src={
                                      "http://192.168.10.51:8084/Product/" +
                                      order?.product.productType +
                                      "/" +
                                      order?.product.productCode +
                                      "/" +
                                      order?.productImg.productImgAddress
                                    }
                                  />
                                  <div id="mapageOrderProductStateBox">
                                    <div id="mapageOrderProductStateBoxH1">
                                      <div>
                                        {" "}
                                        <div>{order.product.productType}</div>
                                        <div id="mapageOrderProductStateBoxH1Name">
                                          노래 제목 :{" "}
                                          {order.product.productName}
                                        </div>
                                      </div>
                                      <div id="mapageOrderProductStateBoxH1Address">
                                        {order.userOrderCreated}
                                      </div>
                                    </div>
                                    <div id="mapageOrderProductStateBoxBdoy">
                                      <div>
                                        {order.product.productExplanation}
                                      </div>
                                    </div>
                                    <div id="mapageOrderProductStateBoxFooter">
                                      <div>
                                        {" "}
                                        <div>
                                          주소 : {"["}
                                          {order.address.zonecode}
                                          {"] "}
                                          {order.address.jibunAddress}
                                          {", "}
                                          {order.address.roadAddress}
                                        </div>
                                        <div>
                                          상세설명 :{" "}
                                          {order.address.addressDetail}
                                        </div>
                                      </div>

                                      <div id="mapageOrderProductStateBoxFooterPrice">
                                        {order.product.productPrice}원
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                      ) : (
                        <div id="userOrderNull">정보가 없습니다😂</div>
                      )}
                    </div>
                    <div id="mapageOrderProduct">
                      <h1 id="mapageOrderProductStateH1">주문 완료</h1>
                      {userOrder.filter((order) => order.orderStateCode === 3)
                        .length != 0 ? (
                        userOrder
                          .filter((order) => order.orderStateCode === 3)
                          .map((order, index) => (
                            <div
                              id="mapageOrderProductMap"
                              key={order.orderCode || index}
                            >
                              {order.orderStateCode === 3 && (
                                <div id="mapageOrderProductState">
                                  <img
                                    id="mapageOrderProductStateImg"
                                    src={
                                      "http://192.168.10.51:8084/Product/" +
                                      order?.product.productType +
                                      "/" +
                                      order?.product.productCode +
                                      "/" +
                                      order?.productImg.productImgAddress
                                    }
                                  />
                                  <div id="mapageOrderProductStateBox">
                                    <div id="mapageOrderProductStateBoxH1">
                                      <div>
                                        {" "}
                                        <div>{order.product.productType}</div>
                                        <div id="mapageOrderProductStateBoxH1Name">
                                          노래 제목 :{" "}
                                          {order.product.productName}
                                        </div>
                                      </div>
                                      <div id="mapageOrderProductStateBoxH1Address">
                                        {order.userOrderCreated}
                                      </div>
                                    </div>
                                    <div id="mapageOrderProductStateBoxBdoy">
                                      <div>
                                        {order.product.productExplanation}
                                      </div>
                                    </div>
                                    <div id="mapageOrderProductStateBoxFooter">
                                      <div>
                                        {" "}
                                        <div>
                                          주소 : {"["}
                                          {order.address.zonecode}
                                          {"] "}
                                          {order.address.jibunAddress}
                                          {", "}
                                          {order.address.roadAddress}
                                        </div>
                                        <div>
                                          상세설명 :{" "}
                                          {order.address.addressDetail}
                                        </div>
                                      </div>

                                      <div id="mapageOrderProductStateBoxFooterPrice">
                                        {order.product.productPrice}원
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                      ) : (
                        <div id="userOrderNull">정보가 없습니다😂</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : page === 2 ? (
              <div id="myPageBodyUpdate">
                <div id="myPageBodyUpdateH1">마이 페이지 수정</div>
                <div id="myPageBodyUpdateBox">
                  <div id="myPageBodyUpdateBoxH1">비밀번호 수정</div>
                  <div id="myPageBodyUpdateBoxBody">
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
                <div id="myPageBodyUpdateBox">
                  <div id="myPageBodyUpdateBoxH1">이메일 등록하기</div>
                  <div id="myPageBodyUpdateBoxBody">
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
              </div>
            ) : (
              <div id="myPageDelete">
                <div id="myPageDeleteBox">
                  <div>
                    1. 사용하고 계시는 아이디는 재사용 및 복구가 불가능합니다.
                    탈퇴 시 해당 아이디는 즉시 탈퇴 처리 되며, 탈퇴한 아이디는
                    본인과 타인 모두 재사용 및 복구가 불가 하오니 신중하게
                    선택하시기 바랍니다.
                  </div>
                  <div>
                    2. 탈퇴 후 회원정보는 모두 삭제됩니다. 탈퇴 시 아이디를
                    제외한 회원정보는 모두 삭제되며, 삭제된 데이터는 복구되지
                    않습니다.
                  </div>
                  <div>
                    3. 탈퇴 후에도 게시판에 등록한 게시물은 그대로 남아
                    있습니다. 홈페이지에 올린 게시글 및 댓글은 탈퇴 시 자동
                    삭제되지 않고 그대로 남아 있으므로, 삭제를 원하는 게시글이
                    있다면 반드시 탈퇴 전 삭제하시기 바랍니다.
                  </div>
                  <div>
                    4. 회원 탈퇴(데이터 삭제)를 원하시면 아래로 연락주시기
                    바랍니다.
                  </div>
                </div>
                <Input
                  label="현재 비밀번호 : "
                  type="password"
                  value={checkPwd}
                  change={(e) => setCheckPwd(e.target.value)}
                />
                <div id="myPageButton">
                  <button onClick={memberDeleteSuccess}>탈퇴하기</button>
                  <button onClick={memberDeleteBack}>뒤로가기</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;

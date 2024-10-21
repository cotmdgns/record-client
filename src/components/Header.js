import "../assets/header.scss";
import { useState, useEffect } from "react";
import Signup from "../pages/member/Signup";
import Login from "../pages/member/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Header = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSingUp, setToggleSingUp] = useState(false);
  // 로그아웃
  const { logout, nullCheck } = useAuth();
  const navigate = useNavigate();

  // 로그인
  const login = () => {
    setToggleLogin(true);
  };
  // 회원가입
  const singUp = () => {
    setToggleSingUp(true);
  };

  // 장바구니
  const shoppingSave = () => {
    if (!nullCheck()) {
      alert("로그인 해주세요.");
      setToggleLogin(true);
      navigate("/");
    } else {
      navigate("/shoppingSaveRoom");
    }
  };
  // 주문조회
  const product = () => {
    if (!nullCheck()) {
      alert("로그인 해주세요.");
      setToggleLogin(true);
      navigate("/");
    } else {
      navigate("/orderInquiry");
    }
  };
  // 마이페이지
  const myPage = () => {
    if (!nullCheck()) {
      alert("로그인 해주세요.");
      setToggleLogin(true);
      navigate("/");
    } else {
      navigate("/myPage");
    }
  };

  const signUpPage = () => {
    setToggleSingUp(true);
    setToggleLogin(false);
  };

  const loginPage = () => {
    setToggleSingUp(false);
    setToggleLogin(true);
  };

  const close = () => {
    setToggleLogin(false);
    setToggleSingUp(false);
  };

  const mainpage = () => {
    navigate("/");
  };

  return (
    <>
      <div id="headerBox">
        <div id="headerBoxLogo" onClick={mainpage}>
          Record
        </div>
        <div id="headerBoxSeach"></div>
        <div id="headerBoxRightBox">
          {toggleLogin ? <Login close={close} signUpPage={signUpPage} /> : null}
          {toggleSingUp ? <Signup close={close} loginPage={loginPage} /> : null}
          {localStorage.getItem("id") === null ? (
            <>
              <button id="headerBoxRightLogin" onClick={login}>
                로그인
              </button>
              <button id="headerBoxRightSignup" onClick={singUp}>
                회원가입
              </button>
            </>
          ) : (
            <>
              <button
                id="headerBoxRightLogin"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                로그아웃
              </button>
            </>
          )}

          <button id="headerBoxRightShoppingSave" onClick={shoppingSave}>
            장바구니
          </button>
          <button
            id="headerBoxRightProduct"
            onClick={() => {
              product();
            }}
          >
            주문조회
          </button>
          <button
            id="headerBoxRightMyPage"
            onClick={() => {
              myPage();
            }}
          >
            마이페이지
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;

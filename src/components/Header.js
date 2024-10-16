import "../assets/header.scss";
import { useState } from "react";
import Signup from "../pages/member/Signup";
import Login from "../pages/member/Login";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSingUp, setToggleSingUp] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setToggleLogin(true);
  };
  const singUp = () => {
    setToggleSingUp(true);
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

          <button id="headerBoxRightLogin" onClick={login}>
            로그인
          </button>
          <button id="headerBoxRightSignup" onClick={singUp}>
            회원가입
          </button>
          <button id="headerBoxRightShoppingSave">장바구니</button>
          <button id="headerBoxRightProduct">주문조회</button>
          <button id="headerBoxRightMyPage">마이페이지</button>
        </div>
      </div>
    </>
  );
};
export default Header;

import "../assets/header.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Signup from "../pages/member/Signup";
import Login from "../pages/member/Login";

const Header = () => {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleSingUp, setToggleSingUp] = useState(false);

  const login = () => {
    setToggleSingUp(!toggleSingUp);
    setToggleLogin(false);
  };
  const singUp = () => {
    setToggleLogin(!toggleLogin);
    setToggleSingUp(false);
  };

  return (
    <>
      <div id="headerBox">
        <div id="headerBoxLogo">Record</div>
        <div id="headerBoxSeach"></div>
        <div id="headerBoxRightBox">
          <button id="headerBoxRightLogin" onClick={login}>
            로그인
          </button>
          {toggleSingUp ? <Login /> : null}
          <button id="headerBoxRightSignup" onClick={singUp}>
            회원가입
          </button>
          {toggleLogin ? <Signup /> : null}
          <button id="headerBoxRightShoppingSave">장바구니</button>
          <button id="headerBoxRightProduct">주문조회</button>
          <button id="headerBoxRightMyPage">마이페이지</button>
        </div>
      </div>
    </>
  );
};
export default Header;

import "../assets/header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const login = () => {
    console.log("로그인하러가여");
    navigate("/login");
  };
  const signup = () => {
    console.log("회원가입하러가여");
    navigate("/signup");
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
          <button id="headerBoxRightSignup" onClick={signup}>
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

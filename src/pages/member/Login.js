import "../../assets/login.scss";
import { FaRecordVinyl } from "react-icons/fa";

const Login = () => {
  return (
    <>
      <div id="BodyBack">
        <div id="BodyLogin">
          <div id="BodyLoginLeft">
            <div>
              <FaRecordVinyl />
            </div>
            <div>Record</div>
          </div>
          <div id="BodyLoginRight">
            <div>
              <label>아이디</label>
              <input type="text" placeholder="아이디" />
            </div>
            <div>
              <label>아이디</label>
              <input type="password" placeholder="비밀번호" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

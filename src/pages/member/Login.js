import "../../assets/login.scss";
import { FaRecordVinyl } from "react-icons/fa";

const Login = ({ onClose, change }) => {
  const aa = () => {
    console.log("gdgd");
    change = false;
    console.log(change);
  };
  return (
    <>
      <div id="BodyBack">
        <div id="BodyLogin">
          <div id="BodyLoginLeft">
            <div>
              <div id="Body1">
                <FaRecordVinyl />
                <div>Record</div>
              </div>
              <div id="Body2">
                <div>
                  아직 회원이 아니신가요?<button onClick={aa}>gd</button>
                </div>
              </div>
            </div>
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

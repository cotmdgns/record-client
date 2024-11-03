import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allViewShoppingSave } from "../../api/shoppingSave";
import { useAuth } from "../../contexts/AuthContext";

const ShoppingSaveRoom = () => {
  const { member } = useAuth();
  const navigate = useNavigate();

  // 장바구니 정보들
  const [userSaveProduct, setUserSaveProduct] = useState([]);
  const productSave = async () => {
    const result = await allViewShoppingSave(member?.userCode);
    setUserSaveProduct(result.data);
  };

  const CreateCode = 2;
  const CreateOrder = () => {
    navigate("/createOrder", { state: { CreateCode } });
  };

  useEffect(() => {
    productSave();
  }, []);
  useEffect(() => {
    console.log(userSaveProduct);
  }, [member]);

  return (
    <div id="shoppingSaveRoom">
      {/* <div>{userSaveProduct}</div> */}

      <div>
        <button onClick={CreateOrder}>결제하기</button>
      </div>
    </div>
  );
};
export default ShoppingSaveRoom;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  allViewShoppingSave,
  createShoppingSaveDelete,
} from "../../api/shoppingSave";
import { useAuth } from "../../contexts/AuthContext";

const ShoppingSaveRoom = () => {
  const { member } = useAuth();
  const navigate = useNavigate();
  const CreateCode = 2;
  const CreateOrder = () => {
    navigate("/createOrder", { state: { CreateCode } });
  };
  // 장바구니 정보들
  const [userSaveProduct, setUserSaveProduct] = useState([]);
  const productSave = async () => {
    const result = await allViewShoppingSave(member?.userCode);
    setUserSaveProduct(result.data);
  };
  const deleteShoppingSave = async (data) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await createShoppingSaveDelete({
        shoppingCode: data,
      });
      alert("삭제되었습니다");
    }
  };
  useEffect(() => {
    if (member?.userCode != null) {
      productSave();
    }
    console.log(userSaveProduct);
  }, [member]);

  return (
    <div id="shoppingSaveRoom">
      <div>장바구니</div>
      {userSaveProduct.map((product) => (
        <div key={product.shoppingCode}>
          <div>{product.product.productName}</div>
          <div>{product.product.productExplanation}</div>
          <div>{product.product.productPrice}</div>
          <div>{product.product.productType}</div>
          <button onClick={() => deleteShoppingSave(product.shoppingCode)}>
            삭제하기
          </button>
        </div>
      ))}
      <div>
        <button onClick={CreateOrder}>결제하기</button>
      </div>
    </div>
  );
};
export default ShoppingSaveRoom;

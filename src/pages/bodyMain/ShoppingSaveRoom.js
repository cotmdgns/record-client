import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  allViewShoppingSave,
  createShoppingSaveDelete,
} from "../../api/shoppingSave";
import { useAuth } from "../../contexts/AuthContext";
import { useSaveListAuth } from "../../contexts/UserSaveListContext";
import "../../assets/shoppingSaveRomm.scss";

const ShoppingSaveRoom = () => {
  const { member } = useAuth();
  const { productSaveList } = useSaveListAuth();
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
      productSaveList();
    }
  };
  useEffect(() => {
    if (member?.userCode != null) {
      productSave();
    }
  }, [member]);

  useEffect(() => {
    if (member?.userCode != null) {
      productSave();
    }
  }, [deleteShoppingSave]);

  return (
    <>
      {userSaveProduct != "" ? (
        <>
          <div id="shoppingSaveRoomH1">장바구니</div>
          <div id="shoppingSaveRoomBack">
            <div id="shoppingSaveRoom">
              {userSaveProduct.map((product) => (
                <div id="shoppingSaveRoomBody" key={product.shoppingCode}>
                  <div id="shoppingSaveRoomImg">
                    <img
                      id="createOrderImg"
                      src={
                        "http://192.168.10.51:8084/Product/" +
                        product.product.productType +
                        "/" +
                        product.product.productCode +
                        "/" +
                        product.productImg
                      }
                    />
                  </div>
                  <div id="shoppingSaveRoomText">
                    <div id="shoppingSaveRoomTextH1">
                      <div>상품타입 : {product.product.productType}</div>
                      <div>상품 이름 : {product.product.productName}</div>
                    </div>
                    {/* <div></div> */}
                    <div id="shoppingSaveRoomTextBodyDiv">
                      <div id="shoppingSaveRoomTextBodyDivDiv">
                        <div>가격 : {product.product.productPrice}원</div>
                        <div>정보 : {product.product.productExplanation}</div>
                      </div>
                      <div id="shoppingSaveRoomTextBodyButton">
                        <button
                          onClick={() =>
                            deleteShoppingSave(product.shoppingCode)
                          }
                        >
                          삭제하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="shoppingSaveRoomCreate">
            <button onClick={CreateOrder}>결제하기</button>
          </div>
        </>
      ) : (
        <>
          <div id="shoppingSaveRoomH1">장바구니</div>
          <div id="shoppingSaveRoomNull">
            <div>저장된 정보가 없습니다..😂</div>
          </div>
        </>
      )}
    </>
  );
};
export default ShoppingSaveRoom;

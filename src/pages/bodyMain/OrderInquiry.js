import { useEffect, useState } from "react";
import { idCheck } from "../../api/member";
import { userId } from "../../api/orderInquiry";
import "../../assets/orderInquiry.scss";
// <div id=""></div>
// 상품 정보 컴포넌트 뺴기

const OrderInquiry = () => {
  const [user, setUser] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const userIdToken = localStorage.getItem("id");
  // 해당 유저 정보 가져와서 옆에 보여주기
  const userIdInForMation = async () => {
    const result = await idCheck(userIdToken);
    setUser(result.data);
  };
  // 해당 유저 구매내역 및 주문조회
  const userOrderTable = async () => {
    const result = await userId(userIdToken);
    setUserOrder(result.data);
  };

  useEffect(() => {
    userIdInForMation();
    userOrderTable();
  }, []);
  useEffect(() => {
    console.log(userOrder);
  }, [userOrder]);

  return (
    <>
      <div id="orderInquiryBody">
        <div id="Bodyleft">
          <div id="">
            나는 상품 정보
            {userOrder.map((order) => (
              <div key={order.orderCode}>
                <div>{order.orderStateCode}여기가 1,2,3,4 상태 코드</div>
                <div>{order.product.productCode}</div>
                <div>{order.product.productExplanation}</div>
                <div>{order.product.productName}</div>
                <div>{order.product.productPrice}</div>
                <div>{order.product.productType}</div>
                <div>{order.userOrderCreated}</div>
              </div>
            ))}
          </div>
        </div>
        <div id="BodyRight">
          <div ket={user.userCode}>
            <div id="">{user.userName}</div>
            <div id="">{user.userId}</div>
            <div id="">{user.userCode}</div>
            <div id="">{user.userEmail}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderInquiry;

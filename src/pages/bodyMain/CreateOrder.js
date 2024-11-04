import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  createShoppingSaveOrderDelete,
  createShoppingSaveOrderView,
  CreateProductOrder,
} from "../../api/shoppingSave";

const CreateOrder = () => {
  const { member } = useAuth();
  const location = useLocation();
  const { CreateCode } = location.state || {};

  //////////////////////////////////////////////////////////// 1 ( 바로 결제하기 했을때 상황들 )
  const [viewProduct, setViewProduct] = useState(null);
  // 해당상품 보여주기
  const viewSaveProduct = async () => {
    const result = await createShoppingSaveOrderView(member?.userCode);
    setViewProduct(result.data);
  };

  // 나가면 자동으로 삭제하기
  const saveOrderClean = async () => {
    await createShoppingSaveOrderDelete({
      userCode: member?.userCode,
      productCode: viewProduct?.product.productCode,
    });
  };

  // 결제하기 버튼 눌렀을 떄 상황
  const createOrderBtn = async () => {
    await CreateProductOrder({
      userCode: member?.userCode,
      productCode: viewProduct?.product.productCode,
    });
  };
  ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////// 2 ( 장바구니에서 결제페이지 넘어갔을때 상황 )

  // 현재 진행상황
  // 들어오면 삭제 완료 나가면 삭제완료
  // 해당 정보 가져와서 화면단에 보여주기
  // 결제하기 누르면 만들어지면서 마이페이지에 나오게끔 만들기
  ////////////////////////////////////////////////////////////

  useEffect(() => {}, []);

  useEffect(() => {
    if (member != null) {
      viewSaveProduct();
    }
    console.log(viewProduct);
    console.log(member);
  }, [member]);

  // 언마운트
  useEffect(() => {
    // return () => {
    //   saveOrderClean();
    // };
  }, []);
  return (
    <div id="createOrderBody">
      {/* 바로 결제페이지 */}
      {CreateCode === 1 && (
        <>
          <div>
            <div>배송지 선택하기</div>
          </div>
          <div>
            <div>주문 상품</div>
            <div>
              <div>{viewProduct?.product.productName}</div>
              <div>{viewProduct?.product.productPrice}</div>
              <div>{viewProduct?.product.productExplanation}</div>
              <div>{viewProduct?.productImg}</div>
            </div>
            <button onClick={createOrderBtn}>결제하기</button>
            <button onClick={saveOrderClean}>결제취소</button>
          </div>
        </>
      )}
      {/* 장바구니 결제페이지 */}
      {CreateCode === 2 && (
        <div>
          장바구니에서 왔어요 <div>1. 이러쿵 저러쿵</div>
          <div>2. 이러쿵 저러쿵</div>
          <div>2. 이러쿵 저러쿵</div>
          <div>2. 이러쿵 저러쿵</div>
          <div>2. 이러쿵 저러쿵</div>
        </div>
      )}
    </div>
  );
};
export default CreateOrder;

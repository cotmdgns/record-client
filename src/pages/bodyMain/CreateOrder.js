import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  createShoppingSaveOrderDelete,
  createShoppingSaveOrderView,
} from "../../api/shoppingSave";

const CreateOrder = () => {
  const { member } = useAuth();
  const location = useLocation();
  const { CreateCode } = location.state || {};

  //////////////////////////////////////////////////////////// 1 ( 바로 결제하기 했을때 상황들 )
  const [viewProduct, setViewProduct] = useState("");
  // 해당상품 보여주기
  const viewSaveProduct = async () => {
    const result = await createShoppingSaveOrderView(member?.userCode);
    setViewProduct(result.data);
    console.log(result.data);
  };

  // 나가면 자동으로 삭제하기
  const saveOrderClean = async () => {
    await createShoppingSaveOrderDelete({
      userCode: member?.userCode,
      product: viewProduct.productCode,
    });
  };
  ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////// 2 ( 장바구니에서 결제페이지 넘어갔을때 상황 )

  ////////////////////////////////////////////////////////////
  useEffect(() => {
    if (member !== null) {
      viewSaveProduct();
    }
  }, []);

  // 언마운트
  useEffect(() => {
    return () => {
      saveOrderClean();
    };
  }, []);
  return (
    <div id="createOrderBody">
      {/* 바로 결제페이지 */}
      {CreateCode === 1 && (
        <div>
          디테일 페이지에서 왔어요
          <div>1. 이러쿵 저러쿵</div>
          <div>1. 이러쿵 저러쿵</div>
          <div>1. 이러쿵 저러쿵</div>
          <div>1. 이러쿵 저러쿵</div>
          <div>1. 이러쿵 저러쿵</div>
          <button>결제하기</button>
          <button>결제취소</button>
        </div>
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

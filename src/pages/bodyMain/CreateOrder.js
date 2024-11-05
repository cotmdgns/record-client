import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  createShoppingSaveOrderDelete,
  createShoppingSaveOrderView,
  CreateProductOrder,
} from "../../api/shoppingSave";

const CreateOrder = () => {
  const navigate = useNavigate();
  const { member } = useAuth();
  const location = useLocation();
  const { CreateCode } = location.state || {};

  //////////////////////////////////////////////////////////// 1 ( 바로 결제하기 했을때 상황들 )
  const [viewProduct, setViewProduct] = useState(null);
  // 해당상품 보여주기
  const viewSaveProduct = async () => {
    try {
      const result = await createShoppingSaveOrderView(member?.userCode);
      setViewProduct(result.data);
    } catch (error) {
      navigate("/");
    }
  };

  // 나가면 자동으로 삭제하기
  const saveOrderClean = async () => {
    await createShoppingSaveOrderDelete({
      userCode: member?.userCode,
      productCode: viewProduct?.product.productCode,
    });
  };
  // 유저가 결제 취소했을때 과정
  const createOrderCleanBtn = async () => {
    await createShoppingSaveOrderDelete({
      userCode: member?.userCode,
      productCode: viewProduct?.product.productCode,
    });
    alert("결제가 취소되었습니다.");
    navigate(`/mainLpPage/detailLpPage/${viewProduct?.product.productCode}`);
  };
  // 결제하기 버튼 눌렀을 떄 상황
  const createOrderBtn = async () => {
    await CreateProductOrder({
      userCode: member?.userCode,
      productCode: viewProduct?.product.productCode,
    });
    alert("결제가 완료되었습니다.");
    navigator("/");
  };

  useEffect(() => {
    // try {
    if (member != null) {
      if (CreateCode == 1) {
        viewSaveProduct();
      }
    }
    // } catch (error) {
    //   alert("정상적인 경로가 아닙니다.");
    //   navigate("/");
    // }
  }, [member]);

  // 언마운트
  useEffect(() => {
    if (viewProduct != null) {
      return () => {
        saveOrderClean();
      };
    }
  }, [viewProduct]);
  ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////// 2 ( 장바구니에서 결제페이지 넘어갔을때 상황 )

  // 현재 진행상황
  // 들어오면 삭제 완료 나가면 삭제완료
  // 해당 정보 가져와서 화면단에 보여주기
  // 결제하기 누르면 만들어지면서 마이페이지에 나오게끔 만들기
  ////////////////////////////////////////////////////////////

  useEffect(() => {}, []);

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
            <button onClick={createOrderCleanBtn}>결제취소</button>
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

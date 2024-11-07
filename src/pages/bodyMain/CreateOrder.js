import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  createShoppingSaveOrderDelete,
  createShoppingSaveOrderView,
  CreateProductOrder,
  allViewShoppingSave,
  viewOrderPrice,
} from "../../api/shoppingSave";
import "../../assets/createOrder.scss";
import AddressModal from "../../components/AddressModal";
import { allAddress } from "../../api/addressAPI";

const CreateOrder = () => {
  const navigate = useNavigate();
  const { member } = useAuth();
  const location = useLocation();
  const { CreateCode } = location.state || {};
  // 버튼 상태 관리하기
  const [activeButton, setActiveButton] = useState(null);

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
    navigate("/");
  };
  useEffect(() => {
    if (member != null) {
      if (CreateCode == 1) {
        viewSaveProduct();
      }
    }
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
  const [userSaveProduct, setUserSaveProduct] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const productSave = async () => {
    const result = await allViewShoppingSave(member?.userCode);
    setUserSaveProduct(result.data);
  };
  const price = async () => {
    const result = await viewOrderPrice(member?.userCode);
    setOrderPrice(result.data);
  };

  useEffect(() => {
    if (member != null) {
      if (CreateCode == 2) {
        productSave();
        price();
      }
    }
  }, [member]);

  const createBtn = () => {
    alert("결제할떄 주소까지 넣어서 만들어라");
  };

  const createBackBtn = () => {
    alert("결제가 취소되었습니다.");
    navigate("/shoppingSaveRoom");
  };

  ////////// ( 주소 api 모달창 )
  const [modalAddress, setModalAddress] = useState(false); // boolean으로 모달창 나올지안나올지 확인
  const close = () => {
    setModalAddress(false);
  };
  const [addressData, setAddressData] = useState([]); // 화면 조건 처리 (false이면 추가해달라 true이면 값들 나오게)
  const addressBtn = () => {
    setModalAddress(!modalAddress);
  };
  const allMemberAddressList = async () => {
    const result = await allAddress(member?.userCode);
    setAddressData(result.data);
  };
  useEffect(() => {
    if (member?.userCode != null) {
      allMemberAddressList();
    }
    console.log(addressData);
  }, []);
  //////////

  return (
    <div id="createOrderBody">
      <div id="createOrderH1">결제 페이지</div>
      <div id="createOrderAddressBox">
        <div id="createOrderH1Page">배송지 선택하기</div>
        {/* 상태코드가 바뀌게끔 만들어야지 각각 달라짐 */}
        {/* api 두개를 가져와서 하나는 코드로 찾는거 하나는*/}
        {addressData.length === 0 ? (
          <div>정보가 없으면 결제를 하실 수 없습니다.</div>
        ) : (
          <div>있으니 반복문 돌려달라</div>
        )}
      </div>
      {modalAddress ? <AddressModal close={close} /> : null}
      <button onClick={addressBtn}>변경</button>
      {/* 모달창이 뜨면서 그 안에서 주소 api가 나오고  */}
      {/* 바로 결제페이지 */}
      {CreateCode === 1 && (
        <div>
          <div id="createOrderH1Page">주문 상품</div>
          <div>
            <div>{viewProduct?.product.productName}</div>
            <div>{viewProduct?.product.productPrice}</div>
            <div>{viewProduct?.product.productExplanation}</div>
            <div>
              <img
                id="createOrderImg"
                src={
                  "http://192.168.10.51:8084/Product/" +
                  viewProduct?.product.productType +
                  "/" +
                  viewProduct?.product.productCode +
                  "/" +
                  viewProduct?.product.productImg
                }
              />
            </div>
          </div>
          <div>
            <div>현재 금액: </div>
            <div>{viewProduct?.product.productPrice}</div>
          </div>

          <button onClick={createOrderBtn}>결제하기</button>
          <button onClick={createOrderCleanBtn}>결제취소</button>
        </div>
      )}
      {/* 장바구니 결제페이지 */}
      {CreateCode === 2 && (
        <div>
          <div>
            <div id="createOrderH1Page">주문 상품</div>
            {userSaveProduct?.map((product) => (
              <div id="createOrderBox" key={product.product.productCode}>
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
                <div>
                  <div>{product.product.productName}</div>
                  <div>{product.product.productExplanation}</div>
                  <div>{product.product.productPrice}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>현재 금액: {orderPrice}</div>
          </div>
          <button onClick={createBtn}>결제하기</button>
          <button onClick={createBackBtn}>결제취소</button>
        </div>
      )}
    </div>
  );
};
export default CreateOrder;

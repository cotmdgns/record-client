import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  createShoppingSaveOrderDelete,
  createShoppingSaveOrderView,
  CreateProductOrder,
  CreateProductOrders,
  allViewShoppingSave,
  viewOrderPrice,
} from "../../api/shoppingSave";
import "../../assets/createOrder.scss";
import AddressModal from "../../components/AddressModal";
import { allAddress, viewAddress } from "../../api/addressAPI";
import { useSaveListAuth } from "../../contexts/UserSaveListContext";

let primryKey = 0;
const CreateOrder = () => {
  const { productSaveList } = useSaveListAuth();
  const navigate = useNavigate();
  const { member } = useAuth();
  const location = useLocation();
  const { CreateCode } = location.state || {};
  // 버튼 상태 관리하기
  // const [activeButton, setActiveButton] = useState(null);
  // //////////////////////////////////////////////////////////// ( 주소 관리 )
  // const [allView, setAllView] = useState([]);
  // const [addressState, setAddressState] = useState({
  //   userCode: "",
  //   addressUserState: "",
  // });

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

  const putAddressView = (data) => {
    setAddressData(data);
  };

  useEffect(() => {
    if (member?.userCode != null) {
      allMemberAddressList();
    }
  }, [member]);

  useEffect(() => {
    for (let i = 0; i < addressData.length; i++) {
      if (addressData[i].addressUserStartCode == 1) {
        primryKey = addressData[i].addressCode;
      }
    }
  }, [addressData]);

  const addressUserState = (data) => {
    switch (data) {
      case 1:
        return "집";
      case 2:
        return "회사";
      case 3:
        return "학교";
      case 4:
        return "친구";
      case 5:
        return "가족";
    }
  };
  //////////

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
    // 여기는 정보가 하나라서 이렇게 보내줄잇지만 주소같은경우는 따로 또 가져와야하나 쉽내
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
      productCodes: viewProduct?.product.productCode,
      address: primryKey,
    });
    alert("결제가 완료되었습니다.");
    productSaveList();
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
  // 종합 금액
  const price = async () => {
    const result = await viewOrderPrice(member?.userCode);
    setOrderPrice(result.data);
  };
  console.log(viewProduct);
  useEffect(() => {
    if (member != null) {
      if (CreateCode == 2) {
        productSave();
        price();
      }
    }
  }, [member]);
  const productCodes =
    userSaveProduct?.map((product) => product.product.productCode) || [];
  const createBtn = async () => {
    await CreateProductOrders({
      userCode: member?.userCode,
      productCode: productCodes,
      addressCode: primryKey,
    });
    alert("결제가 완료되었습니다.");
    productSaveList();
    navigate("/");
  };
  const createBackBtn = () => {
    alert("결제가 취소되었습니다.");
    navigate("/shoppingSaveRoom");
  };

  return (
    <div id="createOrderBody">
      <div id="createOrderH1">결제 페이지</div>
      <div id="createOrderAddressBox">
        <div id="createOrderH1Page">배송지 선택하기</div>
        {addressData.length === 0 ? (
          <div>정보가 없으면 결제를 하실 수 없습니다.</div>
        ) : (
          <div>
            {addressData.map((data) => (
              <div key={data.addressCode}>
                {data.addressUserStartCode === 1 && (
                  <div>
                    <div>도로명 : {data.zonecode}</div>
                    <div>
                      주소 : {data.jibunAddress} ( {data.roadAddress} )
                    </div>
                    <div>전화번호 : {data.addressPhone}</div>
                    <div>상세정보 : {data.addressDetail}</div>
                    <div>
                      기본 설정지 : {addressUserState(data.addressUserState)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {modalAddress ? (
        <AddressModal close={close} putAddressView={putAddressView} />
      ) : null}
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
                  viewProduct?.productImg
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

import React, { useState, useEffect } from "react";
import "../assets/address.scss";
import {
  allAddress,
  createAddress,
  putAddress,
  deleteAddress,
} from "../api/addressAPI";
import { useAuth } from "../contexts/AuthContext";

const AddressSearch = ({ putAddressView }) => {
  const { member } = useAuth();
  const [modalPage, setModalPage] = useState(1);
  const [addr, setAddr] = useState({
    zonecode: "", // 우편번호
    roadAddress: "", // 도로명주소
    jibunAddress: "", // 지번주소
    addressDetail: "", // 상세주소
    addressPhone: "", // 상세주소
    addressUserState: 0,
    userCode: "",
  });

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // 주소 검색 UI를 페이지 내에서 띄우는 함수
  const openAddressSearch = () => {
    setModalPage(2);
    setIsSearchVisible(true);
  };

  // 카카오 주소 API가 로드되고 주소 검색 UI를 표시하는 함수
  useEffect(() => {
    if (isSearchVisible) {
      if (window.daum && window.daum.Postcode) {
        new window.daum.Postcode({
          oncomplete: function (data) {
            setAddr({
              zonecode: data.zonecode,
              roadAddress: data.roadAddress,
              jibunAddress: data.jibunAddress,
              addressDetail: "",
            });
            setModalPage(3);
            setIsSearchVisible(false);
          },
        }).embed(document.getElementById("addressSearchBox"));
      } else {
        console.log("카카오 주소 API가 로드되지 않았습니다.");
      }
    }
  }, [isSearchVisible]);

  const addressStateBtn = (e) => {
    let result = e.target.textContent;
    switch (result) {
      case "집":
        setAddr({ ...addr, addressUserState: 1, userCode: member?.userCode });
        break;
      case "회사":
        setAddr({ ...addr, addressUserState: 2, userCode: member?.userCode });
        break;
      case "학교":
        setAddr({ ...addr, addressUserState: 3, userCode: member?.userCode });
        break;
      case "친구":
        setAddr({ ...addr, addressUserState: 4, userCode: member?.userCode });
        break;
      case "가족":
        setAddr({ ...addr, addressUserState: 5, userCode: member?.userCode });
        break;
    }
  };

  const [allView, setAllView] = useState([]);
  const allAddressView = async () => {
    const result = await allAddress(member?.userCode);
    setAllView(result.data);
  };
  // useEffect(() => {
  //   console.log(allView);
  // }, []);
  useEffect(() => {
    if (member?.userCode != null) {
      allAddressView();
    }
  }, [member]);

  // 생성하기 버튼
  const createBtn = async () => {
    if (member?.userCode != null) {
      const reulst = await createAddress(addr);
      setAllView(reulst.data);
      setModalPage(1);
    }
  };
  // 수정하기버튼
  const putData = async (data) => {
    if (window.confirm("변경하겠습니까?")) {
      const result = await putAddress(data);
      setAllView(result.data);
      putAddressView(result.data);
      alert("수정되었습니다.");
    }
  };
  // 삭제하기버튼
  const deleteData = async (data) => {
    if (window.confirm("삭제하시겠습니까??")) {
      const result = await deleteAddress({
        addressCode: data,
        userCode: member?.userCode,
      });
      setAllView(result.data);
      alert("삭제되었습니다.");
    }
  };

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

  return (
    <div>
      {modalPage === 1 && (
        <div>
          {allView.map((address) => (
            <div key={address.addressCode}>
              {address.addressUserStartCode == 0 && (
                <>
                  <div>도로명 : {address.zonecode}</div>
                  <div>
                    주소 : {address.jibunAddress} ( {address.roadAddress} )
                  </div>
                  <div>전화번호 : {address.addressPhone}</div>
                  <div>상세정보 : {address.addressDetail}</div>
                  <div>
                    배송지 : {addressUserState(address.addressUserState)}
                  </div>
                  <button onClick={() => putData(address)}>변경하기</button>
                  <button onClick={() => deleteData(address.addressCode)}>
                    삭제하기
                  </button>
                </>
              )}
            </div>
          ))}
          <button onClick={openAddressSearch}>추가</button>
        </div>
      )}
      {modalPage === 2 && (
        <>
          {isSearchVisible && (
            <div
              id="addressSearchBox"
              style={{ width: "100%", height: "500px", marginTop: "20px" }}
            >
              {/* 카카오 주소 검색 UI가 여기에 삽입됩니다. */}
            </div>
          )}
        </>
      )}
      {modalPage === 3 && (
        <div>
          <div>입력한 정보를 확인 후 저장해주세요</div>
          <div>상세 주소</div>
          <div>
            <input
              type="text"
              value={addr.zonecode}
              placeholder="우편번호"
              readOnly
            />
          </div>
          <div>
            <input
              type="text"
              value={addr.roadAddress}
              placeholder="도로명주소"
              readOnly
            />
          </div>
          <div>
            <input
              type="text"
              value={addr.jibunAddress}
              placeholder="지번주소"
              readOnly
            />
          </div>
          <div>
            <input
              type="text"
              value={addr.addressPhone}
              placeholder="전화번호"
              onChange={(e) =>
                setAddr({ ...addr, addressPhone: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={addr.addressDetail}
              placeholder="상세주소"
              onChange={(e) =>
                setAddr({ ...addr, addressDetail: e.target.value })
              }
            />
          </div>

          <div>
            <div onClick={addressStateBtn}>집</div>
            <div onClick={addressStateBtn}>회사</div>
            <div onClick={addressStateBtn}>학교</div>
            <div onClick={addressStateBtn}>친구</div>
            <div onClick={addressStateBtn}>가족</div>
          </div>

          <button onClick={createBtn}>추가히기</button>
        </div>
      )}
    </div>
  );
};

export default AddressSearch;

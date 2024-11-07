import React, { useState, useEffect } from "react";
import "../assets/address.scss";
import {
  allAddress,
  createAddress,
  putAddress,
  deleteAddress,
} from "../api/addressAPI";

const AddressSearch = () => {
  const [modalPage, setModalPage] = useState(1);

  //// 오늘 집에서 할껄들~~
  const [addr, setAddr] = useState({
    zonecode: "", // 우편번호
    roadAddress: "", // 도로명주소
    jibunAddress: "", // 지번주소
    addressDetail: "", // 상세주소
    addressDetail: "", // 상세주소
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
    console.log(addr);
  }, [isSearchVisible]);

  return (
    <div>
      {modalPage === 1 && (
        <div>
          <button onClick={openAddressSearch}>추가</button>
        </div>
      )}
      {modalPage === 2 && (
        <>
          {isSearchVisible && (
            <div
              id="addressSearchBox"
              style={{ width: "100%", height: "400px", marginTop: "20px" }}
            >
              {/* 카카오 주소 검색 UI가 여기에 삽입됩니다. */}
            </div>
          )}
        </>
      )}
      {modalPage === 3 && (
        <div>
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
              value={addr.addressDetail}
              placeholder="상세주소"
              onChange={(e) =>
                setAddr({ ...addr, addressDetail: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={addr.addressDetail}
              placeholder="전화번호"
              onChange={(e) =>
                setAddr({ ...addr, addressDetail: e.target.value })
              }
            />
          </div>
        </div>
      )}

      <div></div>
    </div>
  );
};

export default AddressSearch;

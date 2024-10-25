import React, { useEffect, useState } from "react";
const Address = () => {
  const [addr, setAddr] = useState({
    zonecode: "", // 우편주소
    jibunAddress: "", // 지번주소
    roadAddress: "", // 도로명주소
    addressDetail: "", // 상세 정보
  });

  const daumAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        setAddr({
          address: data.address,
          zonecode: data.zonecode,
          jibunAddress: data.jibunAddress,
        });
      },
    }).open();
  };

  useEffect(() => {
    console.log(addr);
  }, [addr]);

  return (
    <div>
      <input
        type="text"
        id="sample4_postcode"
        placeholder="우편번호"
        readOnly
      />
      <button onClick={daumAddress}>우편번호 찾기</button>
      <br />
      <input
        type="text"
        id="sample4_roadAddress"
        placeholder="도로명주소"
        readOnly
      />
      <input
        type="text"
        id="sample4_jibunAddress"
        placeholder="지번주소"
        readOnly
      />
      <span id="guide" style={{ color: "#999", display: "none" }}></span>
      <input
        type="text"
        id="sample4_detailAddress"
        placeholder="상세주소"
      ></input>
    </div>
  );
};

export default Address;

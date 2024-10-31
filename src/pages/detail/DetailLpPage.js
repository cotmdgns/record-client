import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailViewLp } from "../../api/porduct";
import "../../assets/detailPage.scss";
import { useAuth } from "../../contexts/AuthContext";
import { createShoppingSave } from "../../api/shoppingSave";

const DetailLpPage = () => {
  const { productCode } = useParams();
  const { member } = useAuth();
  const [detail, setDetail] = useState(null);
  // 디테일 페이지
  const detailPage = async () => {
    const result = await DetailViewLp(productCode);
    setDetail(result.data);
  };

  // 쇼핑 세이브
  const [shoppingSave, setShoppingSave] = useState({
    productCode: "",
    userCode: "",
  });

  // 쇼핑 세이브 저장 API
  const productSave = async () => {
    await createShoppingSave(shoppingSave);
  };

  useEffect(() => {
    detailPage();
    console.log(detail);
    console.log(member);
  }, []);

  useEffect(() => {
    setShoppingSave({
      ...shoppingSave,
      productCode: detail?.productCode,
      userCode: member?.userCode,
    });
  }, [detail]);

  useEffect(() => {}, []);
  return (
    <>
      <div id="detailPageBox">
        <div id="detailImg">
          <img
            src={
              "http://192.168.10.51:8084/Product/" +
              detail?.productType +
              "/" +
              detail?.productName +
              "/" +
              detail?.productImgAll[0].productImgAddress
            }
          />
        </div>
        <div id="detailText">
          <button onClick={productSave}>찜하기</button>
          <button>결제하기</button>
        </div>
      </div>
      <div className="quill" id="detailPage">
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: detail?.productLongtext }}
          ></div>
        </div>
      </div>
    </>
  );
};
export default DetailLpPage;

// 이코드로

// url에 저장된 코드를 가져와서
// 서버에 전달한다음 그 정보 가져오기

// 해당 페이지에 이쁘게 꾸며놓고
// 장바구니에 넣기
// 좋아요 만들기
// 이미지 일단 크게하나
// 밑에다가 나머지 사진들 보여주고
// 하나하나 눌렀을때 큰 이미지가 바뀌게끔 만들기 (state)

// 일단 내가 만든 사이트 특성상 하나밖에 안삼 (반박시 깨뭄)
// 다시만들어야겠내
// 생성페이지에서 에디터를 사용해서
// 간단하게 보여주는거 하나
// 에디터로 보여주는거 둘
// 에디터로 이쁘게 작성하고
// 그걸 네이버처럼 상점페이지 밑에 들어갈수있게끔
// 진짜 미치겠다

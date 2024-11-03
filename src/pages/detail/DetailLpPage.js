import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailViewLp } from "../../api/porduct";
import "../../assets/detailPage.scss";
import { useAuth } from "../../contexts/AuthContext";
import {
  createShoppingSave,
  deleteShoppingSave,
  createShoppingSaveOrder,
} from "../../api/shoppingSave";

const DetailLpPage = () => {
  const navigate = useNavigate();
  // 페이지 정보 코드
  const { productCode } = useParams();
  // 내정보
  const { member } = useAuth();
  const [detail, setDetail] = useState(null);

  // 디테일 페이지 정보
  const detailPage = async () => {
    const result = await DetailViewLp({
      productCode: productCode,
      userCode: member?.userCode,
    });
    setDetail(result.data);
  };

  // 쇼핑 세이브 저장 API
  const productSave = async () => {
    const result = await createShoppingSave({
      productCode: productCode,
      userCode: member?.userCode,
    });
    if (result.status === 200) {
      alert("추가 되었습니다!");
    }
  };
  // 쇼핑 세이브 삭제하기 API
  const productDelete = async () => {
    const result = await deleteShoppingSave({
      productCode: productCode,
      userCode: member?.userCode,
    });
    if (result.status === 200) {
      alert("삭제되었습니다!.");
    }
  };

  // 쇼핑 결제하기
  const CreateCode = 1;
  const productOrder = () => {
    CreateSaveOrder();
    navigate("/createOrder", { state: { CreateCode } });
  };

  const CreateSaveOrder = async () => {
    await createShoppingSaveOrder({
      productCode: productCode,
      userCode: member?.userCode,
    });
  };

  useEffect(() => {
    if (member !== null) detailPage();
    console.log(detail);
  }, [member]);

  return (
    <>
      {detail !== null && (
        <>
          <div id="detailPageBox">
            <div id="detailImg">
              <img
                src={
                  "http://192.168.10.51:8084/Product/" +
                  detail.productType +
                  "/" +
                  detail.productName +
                  "/" +
                  detail.productImgAll[0].productImgAddress
                }
              />
            </div>
            <div id="detailText">
              {detail.pageCheck ? (
                <button onClick={productDelete}>장바구니삭제</button>
              ) : (
                <button onClick={productSave}>장바구니추가</button>
              )}
              <button onClick={productOrder}>결제하기</button>
              {/* <div>
                <div>{detail.productSub}</div>
                <button>추천하기</button>
              </div> */}
            </div>
          </div>
          <div className="quill" id="detailPage">
            <div className="ql-container ql-snow">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: detail.productLongtext }}
              ></div>
            </div>
          </div>
        </>
      )}
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

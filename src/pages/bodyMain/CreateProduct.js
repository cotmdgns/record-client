import { useState, useEffect } from "react";
import { CreateLpRecordProduct } from "../../api/porduct";
import Input from "../../components/Input";
import "../../assets/createProduct.scss";
import { forEach } from "lodash";

const CreateProduct = () => {
  const [lpProduct, setLpProduct] = useState({
    productType: "LP",
    productName: "", // 이름
    productPrice: "", // 가격
    productExplanation: "", // 정보
    productQuantity: "", // 수량
    productImg: null, // 이미지
  });
  // 이미지 프리뷰
  const [lpImgPre, setLpImgPre] = useState([]);
  const imgs = (e) => {
    // 모두 콘솔로 저장되면서 값보내지는거 확인됨
    // 서버에 저장할거
    const selectedFile = e.target.files;
    setLpProduct({ ...lpProduct, productImg: selectedFile });
    // 프리뷰로 보낼꺼
    const lpUrl = Array.from(selectedFile).map((file) =>
      URL.createObjectURL(file)
    );
    setLpImgPre(lpUrl);
  };
  const createFile = async () => {
    const formDataLp = new FormData();
    formDataLp.append("productType", lpProduct.productType);
    formDataLp.append("productName", lpProduct.productName);
    formDataLp.append("productPrice", lpProduct.productPrice);
    formDataLp.append("productExplanation", lpProduct.productExplanation);
    formDataLp.append("productQuantity", lpProduct.productQuantity);
    // 배열이긴하나 한번에 못받아서 포문돌려서 하나씩 보내줘야함
    for (const file of lpProduct.productImg) {
      formDataLp.append("productImg", file);
    }

    await CreateLpRecordProduct(formDataLp);
  };
  useEffect(() => {
    console.log(lpProduct);
  }, [lpProduct]);
  const a = (e) => {
    const x = e;
  };
  return (
    <div id="createProductBody">
      <div>괸라자 페이지</div>
      {/*LP추가*/}
      <div>
        <div>LP 추가</div>
        {/* 인풋 영역 */}
        <div>
          {/* 이미지 영역 */}
          <div id="FreeViewImgLp">
            <img src="" />
            {/*클릭했을때 프리뷰 변경*/}
            {lpImgPre.map((pre, index) => (
              <div key={index} id="createFreeViewBox">
                <img
                  id="createFreeView"
                  src={pre}
                  alt={`preview ${index}`}
                  onClick={a}
                />
              </div>
            ))}
          </div>
          {/*LP타입은 default 값으로 주기*/}
          <div>
            <Input
              label="LP 제목 : "
              type="text"
              value={lpProduct.productPrice}
              change={(e) =>
                setLpProduct({ ...lpProduct, productPrice: e.target.value })
              }
            />
            <Input
              label="LP 가격 : "
              type="text"
              value={lpProduct.productName}
              change={(e) =>
                setLpProduct({ ...lpProduct, productName: e.target.value })
              }
            />
            <Input
              label="LP 정보들 : "
              type="text"
              value={lpProduct.productExplanation}
              change={(e) =>
                setLpProduct({
                  ...lpProduct,
                  productExplanation: e.target.value,
                })
              }
            />
            <Input
              label="LP 수량 : "
              type="text"
              value={lpProduct.productQuantity}
              change={(e) =>
                setLpProduct({ ...lpProduct, productQuantity: e.target.value })
              }
            />
            {/*이것만 컴포넌트 뺀건 멀티플때문에*/}
            <input
              label="이미지 생성 : "
              type="file"
              accept="image/*"
              onChange={imgs}
              multiple
            />
          </div>
        </div>
        <button onClick={createFile}>파일 전송</button>
      </div>
      {/*레코드 추가*/}
      <div>
        <div>레코드 추가</div>
        <div>
          <div>
            <img src="" />
          </div>
          {/*LP타입은 default 값으로 주기*/}
          <div>
            <div>레코드 제목</div>
            <div>레코드 가격</div>
            <div>레코드 정보들</div>
            <div>레코드 수량</div>
            <div>input으로 이미지를 여러개 받을수 있게끔 만들기</div>
          </div>
        </div>
      </div>
      {/*운영자 추가*/}
      <div>
        <div>운영자 명단</div>
      </div>
      {/*회원 추가*/}
      <div>
        <div>회원 명단</div>
      </div>
    </div>
  );
};
export default CreateProduct;

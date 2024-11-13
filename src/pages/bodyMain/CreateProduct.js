import { useState, useEffect, useMemo } from "react";
import { CreateLpRecordProduct } from "../../api/porduct";
import Input from "../../components/Input";
import "../../assets/createProduct.scss";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactModule from "../../components/ReactModule";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [lpProduct, setLpProduct] = useState({
    productType: "",
    productName: "", // 이름
    productPrice: "", // 가격
    productExplanation: "", // 정보
    productQuantity: "", // 수량
    productImg: null, // 이미지
    productLongText: "", // 에디터 부분 문자
  });
  // 이미지 프리뷰
  const [lpImgPre, setLpImgPre] = useState([]);
  const imgs = (e) => {
    // 모두 콘솔로 저장되면서 값보내지는거 확인됨
    // 서버에 저장할거
    const files = e.target.files;
    setLpProduct((prevState) => ({
      ...prevState,
      productImg: files.length > 0 ? Array.from(files) : [], // 파일이 있을 경우 배열로 설정
    }));
    // 프리뷰로 보낼꺼
    const lpUrl = Array.from(files).map((file) => URL.createObjectURL(file));
    setLpImgPre(lpUrl);
  };
  // 실험용 구간
  const QuillongText = (text) => {
    setLpProduct({ ...lpProduct, productLongText: text });
  };
  useEffect(() => {
    console.log(lpProduct);
  }, [lpProduct]);
  //

  const btnRecord = () => {
    setLpProduct({ ...lpProduct, productType: "레코드" });
  };
  const btnLp = () => {
    setLpProduct({ ...lpProduct, productType: "LP" });
  };

  const createFile = async () => {
    const formDataLp = new FormData();
    formDataLp.append("productType", lpProduct.productType);
    formDataLp.append("productName", lpProduct.productName);
    formDataLp.append("productPrice", lpProduct.productPrice);
    formDataLp.append("productExplanation", lpProduct.productExplanation);
    formDataLp.append("productQuantity", lpProduct.productQuantity);
    formDataLp.append("productLongtext", lpProduct.productLongText);

    // 배열이긴하나 한번에 못받아서 포문돌려서 하나씩 보내줘야함
    if (
      Array.isArray(lpProduct.productImg) &&
      lpProduct.productImg.length > 0
    ) {
      for (const file of lpProduct.productImg) {
        formDataLp.append("productImg", file);
      }
    } else {
      alert("이미지를 추가해주세요.");
      return;
    }
    if (
      lpProduct.productType !== "" &&
      lpProduct.productName !== "" &&
      lpProduct.productPrice !== "" &&
      lpProduct.productExplanation !== "" &&
      lpProduct.productQuantity !== "" &&
      lpProduct.productLongText !== "" &&
      lpProduct.productImg !== null
    ) {
      await CreateLpRecordProduct(formDataLp);
      alert("추가되었습니다");
      navigate("/");
    } else {
      alert("재대로 입력되지않습니다");
    }
  };
  // 이거는 미리보기 변경할수있는 기능
  useEffect(() => {
    console.log(lpProduct);
  }, [lpProduct]);
  const a = (e) => {
    const x = e;
  };

  const style = {
    backgroundColor: "#51b6a0",
  };

  // 퀼 에디터
  const formats: string[] = [
    "header",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "code-block",
    "clean",
  ];
  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
      },
    }),
    []
  );

  return (
    <>
      <div id="createProductBodyH1">관리자 페이지</div>
      <div id="createProductBodyBack">
        <div id="createProductBody">
          {/*LP추가*/}
          <div id="createProduct">
            {/* 인풋 영역 */}
            <div id="FreeView">
              {/* 이미지 영역 */}
              <div id="FreeViewImgs">
                <div id="FreeViewImg">
                  <img
                    src={
                      !lpImgPre || lpImgPre.length === 0
                        ? "/free-icon-no-pictures.png"
                        : lpImgPre[0]
                    }
                  />
                </div>
                <div id="createFreeViewBoxs">
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
              </div>
              {/*LP타입은 default 값으로 주기*/}
              <div id="createProducts">
                <div id="createProductBox">
                  <h1 id="createProductH1">LP,레코드 생성</h1>
                  <div id="createProductDiv">*양식에 맞게 입력해주세요*</div>
                </div>
                <Input
                  id="createProduct"
                  label="제목"
                  type="text"
                  value={lpProduct.productName}
                  change={(e) =>
                    setLpProduct({ ...lpProduct, productName: e.target.value })
                  }
                />
                <Input
                  id="createProduct"
                  label="가격"
                  type="text"
                  value={lpProduct.productPrice}
                  change={(e) =>
                    setLpProduct({ ...lpProduct, productPrice: e.target.value })
                  }
                />
                <Input
                  id="createProduct"
                  label="정보들"
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
                  id="createProduct"
                  label="수량 "
                  type="text"
                  value={lpProduct.productQuantity}
                  change={(e) =>
                    setLpProduct({
                      ...lpProduct,
                      productQuantity: e.target.value,
                    })
                  }
                />
                <div id="createProductButtons">
                  <div id="createProductButton">
                    <button
                      onClick={btnLp}
                      style={lpProduct.productType == "LP" ? style : null}
                    >
                      LP
                    </button>
                    <button
                      onClick={btnRecord}
                      style={lpProduct.productType == "레코드" ? style : null}
                    >
                      레코드
                    </button>
                  </div>
                  <input
                    label="이미지 생성 : "
                    type="file"
                    accept="image/*"
                    onChange={imgs}
                    multiple
                  />
                </div>
                {/*이것만 컴포넌트 뺀건 멀티플때문에*/}
              </div>
            </div>
            <div>
              <div id="toolBar">
                <ReactModule />
              </div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                style={{ height: "1000px" }}
                value={lpProduct.productLongText}
                onChange={QuillongText}
              />
            </div>
            <div id="createProductButton2">
              <button id="createProductBtn" onClick={createFile}>
                상품 만들기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateProduct;

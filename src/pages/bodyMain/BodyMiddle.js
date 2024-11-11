import "../../assets/bodyMiddle.scss";
import { MainLP, MainRecord } from "../../api/porduct";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//메인페이지
//imageBox 까지가 8081

const BodyMiddle = () => {
  const [mainLps, setMainLps] = useState([]);
  const [mainRecords, setMainRecords] = useState([]);
  const navigate = useNavigate();

  // 서버에서 가져온 상품
  const mainlps = async () => {
    const result = await MainLP();
    setMainLps(result.data);
  };
  // 서버에서 가져온 상품
  const mianRecode = async () => {
    const result = await MainRecord();
    setMainRecords(result.data);
  };
  const MainLpPage = () => {
    navigate("/mainLpPage");
  };
  const MainRecordPage = () => {
    navigate("/mainRecordPage");
  };

  const DetailLpPageMove = () => {
    navigate("/mainLpPage");
  };
  const DetailRecordPageMove = () => {
    navigate("/mainRecordPage");
  };

  useEffect(() => {
    mainlps();
    mianRecode();
  }, []);

  useEffect(() => {
    console.log(mainRecords);
  }, [mainRecords]);

  return (
    <>
      <div id="bodyMiddle">
        <div id="bodyMainLp">
          <div id="bodyMainLpImg">
            <img
              id="bodyMainLpImgBox"
              src="http://192.168.10.51:8084/ImageMain/Hero_Lifestyle_VSC-750SB-YEL_11_x700.jpg"
              alt="Hero Lifestyle"
            />
            <div id="bodyMainLpBox">
              <div id="bodyMainLpBoxImg1"></div>
              <div id="bodyMainLpBoxImg2"></div>
              <div id="bodyMainLpBoxImg3"></div>
            </div>
          </div>
          <div id="bodyMainLps">
            {mainLps.map((mainLp) => (
              <div
                id="MainLp"
                key={mainLp.productCode}
                onClick={DetailLpPageMove}
              >
                <a>
                  <img
                    id="bodyMainLpImg"
                    src={
                      "http://192.168.10.51:8084/Product/" +
                      mainLp.productType +
                      "/" +
                      mainLp.productCode +
                      "/" +
                      mainLp.productImgOne
                    }
                  />
                  <div id="bodyMainLpName">{mainLp.productName}</div>
                  <div id="bodyMainLpBox">
                    <div id="bodyMainLpPrice">{mainLp.productPrice}원</div>
                    <div id="bodyMainLpQuantity">
                      남은 수량 : {mainLp.productQuantity}개
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div id="MainButton">
            <button id="MainButton" onClick={MainLpPage}>
              페이지로 이동
            </button>
          </div>
        </div>
        <div id="bodyMainLp">
          <div id="bodyMainLpImg">
            <img
              id="bodyMainLpImgBox"
              src="http://192.168.10.51:8084/ImageMain/Hero_Lifestyle_VSC-750SB-YEL_11_x700.jpg"
              alt="Hero Lifestyle"
            />
            <div id="bodyMainLpBox">
              <div id="bodyMainLpBoxImg1"></div>
              <div id="bodyMainLpBoxImg2"></div>
              <div id="bodyMainLpBoxImg3"></div>
            </div>
          </div>
          <div id="bodyMainLps">
            {mainRecords.map((mainRecord) => (
              <div
                id="MainLp"
                key={mainRecord.productCode}
                onClick={DetailRecordPageMove}
              >
                <a>
                  <img
                    id="bodyMainLpImg"
                    src={
                      "http://192.168.10.51:8084/Product/" +
                      mainRecord.productType +
                      "/" +
                      mainRecord.productCode +
                      "/" +
                      mainRecord.productImgOne
                    }
                  />
                  <div id="bodyMainLpName">{mainRecord.productName}</div>
                  <div id="bodyMainLpBox">
                    <div id="bodyMainLpPrice">{mainRecord.productPrice}원</div>
                    <div id="bodyMainLpQuantity">
                      남은 수량 : {mainRecord.productQuantity}개
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div id="MainButton">
            <button id="MainButton" onClick={MainRecordPage}>
              페이지로 이동
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BodyMiddle;

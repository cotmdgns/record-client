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

  useEffect(() => {
    mainlps();
    mianRecode();
  }, []);

  useEffect(() => {
    console.log(mainLps);
  }, [mainLps]);

  return (
    <>
      <div id="bodyMiddle">
        <div id="bodyMainLp">
          <div id="bodyMainLpImg">
            <img
              src="http://192.168.10.51:8084/ImageMain/Hero_Lifestyle_VSC-750SB-YEL_11_x700.jpg"
              alt="Hero Lifestyle"
            />
            <div>여기는 글씨?</div>
          </div>
          <div id="bodyMainLps">
            {mainLps.map((mainLp) => (
              <div id="MainLp" key={mainLp.productCode}>
                <a>
                  <img
                    id="bodyMainLpImg"
                    src={
                      "http://192.168.10.51:8084/Product/" +
                      mainLp.productType +
                      "/" +
                      mainLp.productName +
                      "/" +
                      mainLp.productImgOne
                    }
                  />
                  <div>{mainLp.productName}</div>
                  <div>{mainLp.productPrice}</div>
                  <div>{mainLp.productExplanation}</div>
                  <div>{mainLp.productQuantity}</div>
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
        <div id="bodyMainRecord">
          <div id="bodyMainRecordImg">
            <img
              src="http://192.168.10.51:8084/ImageMain/Lifestyle_high_angle_record_on_platter_VTA-270B-ESP__14_600x600.jpg"
              alt="Hero Lifestyle"
            />
            <div>여기는 글씨?</div>
          </div>
          <div id="bodyMainRecords">
            {mainRecords.map((mainRecord) => (
              <div id="Record" key={mainRecord.productCode}>
                <a>
                  <div>{mainRecord.productName}</div>
                  <div>{mainRecord.productPrice}</div>
                  <div>{mainRecord.productExplanation}</div>
                  <div>{mainRecord.productQuantity}</div>
                  <div>{mainRecord.productImg}</div>
                </a>
              </div>
            ))}
          </div>
          <button id="RecordButton">페이지로 이동</button>
        </div>
        <div>
          <div id="bodyMainCreate">
            <img
              src="http://192.168.10.51:8084/ImageMain/VPT-2000-BLK-ATE-LIFE-3_600x600.jpg"
              alt="Hero Lifestyle"
            />
            <div>여기는 글씨?</div>
          </div>
          <div>여기는 제작</div>
        </div>
      </div>
    </>
  );
};
export default BodyMiddle;

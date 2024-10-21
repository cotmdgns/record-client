import "../../assets/bodyMiddle.scss";
import { MainLP, MainRecord } from "../../api/porduct";
import { useEffect, useState } from "react";
//메인페이지
//imageBox 까지가 8081

const BodyMiddle = () => {
  const [mainLps, setMainLps] = useState([]);
  const [mainRecords, setMainRecords] = useState([]);
  const mainlps = async () => {
    const result = await MainLP();
    setMainLps(result.data);
  };
  const mianRecode = async () => {
    const result = await MainRecord();
    setMainRecords(result.data);
  };

  useEffect(() => {
    mainlps();
    mianRecode();
  }, []);

  return (
    <>
      <div id="bodyMiddle">
        <div id="bodyMainLp">
          <div>
            <img
              src="http://192.168.10.51:8084/ImageMain/Hero_Lifestyle_VSC-750SB-YEL_11_x700.jpg"
              alt="Hero Lifestyle"
            />
            <div>여기는 글씨?</div>
          </div>
          <div>여기는 LP판</div>
          <div>
            {mainLps.map((mainLp) => (
              <a key={mainLp.productCode}>
                <div>{mainLp.productName}</div>
                <div>{mainLp.productPrice}</div>
                <div>{mainLp.productExplanation}</div>
              </a>
            ))}
            <div>
              <button>페이지로 이동</button>
            </div>
          </div>
        </div>
        <div id="bodyMainRecord">
          <div>
            <img
              src="http://192.168.10.51:8084/ImageMain/Lifestyle_high_angle_record_on_platter_VTA-270B-ESP__14_600x600.jpg"
              alt="Hero Lifestyle"
            />
            <div>여기는 글씨?</div>
          </div>
          <div>여기는 레코드판</div>
          <div>
            {mainRecords.map((mainRecord) => (
              <a key={mainRecord.productCode}>
                <div>{mainRecord.productName}</div>
                <div>{mainRecord.productPrice}</div>
                <div>{mainRecord.productExplanation}</div>
              </a>
            ))}
            <button>페이지로 이동</button>
          </div>
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
        <div>
          <div id="bodyMainNotice">
            <img
              src="http://192.168.10.51:8084/ImageMain/Lifestyle_side_view_cloth_in_use_VA-55-ESP_15_600x600.jpg"
              alt="Hero Lifestyle"
            />
            <div>여기는 글씨?</div>
          </div>
          <div>여기는 공지사항 및 회사소개?</div>
        </div>
      </div>
      <div> 장바구니 </div>
    </>
  );
};
export default BodyMiddle;

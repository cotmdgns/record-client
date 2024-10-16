import "../../assets/bodyMiddle.scss";
import { MainLP } from "../../api/porduct";
import { useEffect, useState } from "react";
//메인페이지
//imageBox 까지가 8081
const BodyMiddle = () => {
  useEffect(() => {
    MainLP();
  }, []);
  return (
    <>
      <div id="bodyMiddle">
        <div>
          <img
            src="http://192.168.10.23:8081/ImageMain/Hero_Lifestyle_VSC-750SB-YEL_11_x700.jpg"
            alt="Hero Lifestyle"
          />
        </div>
        <div>
          <img
            src="http://192.168.10.23:8081/ImageMain/Lifestyle_high_angle_record_on_platter_VTA-270B-ESP__14_600x600.jpg"
            alt="Hero Lifestyle"
          />
        </div>
        <div>
          <img
            src="http://192.168.10.23:8081/ImageMain/Lifestyle_side_view_cloth_in_use_VA-55-ESP_15_600x600.jpg"
            alt="Hero Lifestyle"
          />
        </div>
        <div>
          <img
            src="http://192.168.10.23:8081/ImageMain/VPT-2000-BLK-ATE-LIFE-3_600x600.jpg"
            alt="Hero Lifestyle"
          />
        </div>
      </div>
    </>
  );
};
export default BodyMiddle;

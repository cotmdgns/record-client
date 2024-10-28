import "../../assets/mainLpPage.scss";
import { AllViewLp } from "../../api/porduct";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { idCheck } from "../../api/member";
// 상단에 관리자는 추가할 수 있게끔 만들기

// 그리고 수량이 0개이면 살수없게끔 만들면서 클릭못하게 만들기

// 유저가 장바구니에 추가하면 인설트 되면서 장바구니 옆에 1 뜨게 만들기

// 만약 유저가 구매하면 쿼리문에서 1을 빼주고 주문내역에 나오게끔 만들기
const MainLpPage = () => {
  const [Lps, setLps] = useState([]);
  const navigate = useNavigate();

  const LpPlayer = async () => {
    const result = await AllViewLp();
    setLps(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    LpPlayer();
    console.log(Lps);
  }, []);

  const DetailPage = (productCode) => {
    navigate(`detailLpPage/${productCode}`);
  };

  return (
    <div id="mainLpPage">
      <div id="mainLpPageBox">
        {Lps.map((Lp) => (
          <div key={Lp.productCode} id="mainLp">
            <a onClick={() => DetailPage(Lp.productCode)}>
              <div>
                <img
                  id="mainLpImg"
                  src={
                    "http://192.168.10.51:8084/Product/" +
                    Lp.productType +
                    "/" +
                    Lp.productName +
                    "/" +
                    Lp.productImgOne
                  }
                />
              </div>
              <div>이름 : {Lp.productName}</div>
              <div>가격 : {Lp.productPrice}</div>
              <div>정보 : {Lp.productExplanation}</div>
              <div>수량 : {Lp.productQuantity}</div>
            </a>
          </div>
        ))}
      </div>

      {/* <div>
        설명란
        <div>1. 상품들 이쁘게 정렬하기</div>
        <div>2. 페이징 처리는 무한페이징으로</div>
        <div>3. 상품 누르면 디테일로 들어가게끔 만들기</div>
        <div>4. 다크모드는 안쓸꺼임</div>
        <div>5. 한줄에 5개정도 들어갈수있게끔 만들꺼임</div>
      </div> */}
    </div>
  );
};
export default MainLpPage;

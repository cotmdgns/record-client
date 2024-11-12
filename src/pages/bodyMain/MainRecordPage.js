import "../../assets/mainLpPage.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AllView, TotalPage } from "../../api/porduct";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
// 상단에 관리자는 추가할 수 있게끔 만들기

// 그리고 수량이 0개이면 살수없게끔 만들면서 클릭못하게 만들기

// 유저가 장바구니에 추가하면 인설트 되면서 장바구니 옆에 1 뜨게 만들기

// 만약 유저가 구매하면 쿼리문에서 1을 빼주고 주문내역에 나오게끔 만들기
const MainRecodePage = () => {
  const [Lps, setLps] = useState([]);
  const navigate = useNavigate();

  const LpPlayer = async () => {
    // 페이징 처리때문에 0 보내기
    const result = await AllView({ no: 0, productType: "레코드" });
    setLps(result.data);
    console.log(result.data);
  };

  // 페이지 버튼처리
  const [page, setPage] = useState(0);

  const pageCount = async () => {
    const result = await TotalPage();
    setPage(result.data);
  };

  useEffect(() => {
    LpPlayer();
    pageCount();
  }, []);

  const DetailPage = (productCode) => {
    navigate(`detailLpPage/${productCode}`);
  };

  const selectPage = async (no) => {
    const a = await AllView({ no: (no - 1) * 16, productType: "레코드" });
    setLps(a.data);
  };

  const [pageButton, setPageButton] = useState(0);
  const leftPage = () => {
    if (pageButton > 0) {
      setPageButton(pageButton - 1);
      selectPage(1 + (pageButton - 1) * (a + 1));
    }
  };
  const rightPage = () => {
    setPageButton(pageButton + 1);
    selectPage(1 + (pageButton + 1) * (a + 1));
  };
  const a = 4;

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
                    Lp.productCode +
                    "/" +
                    Lp.productImgOne
                  }
                />
              </div>
              <div id="mainLpBoxs">
                <div id="mainLpName">{Lp.productName}</div>
                <div id="mainLpExplanation">정보 : {Lp.productExplanation}</div>
                <div id="mainLpBox">
                  <div id="mainLpPrice">가격 : {Lp.productPrice}</div>
                  <div id="mainLpQuantity">수량 : {Lp.productQuantity}</div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div id="buttons">
        <button id="buttonPage" onClick={leftPage} disabled={pageButton == 0}>
          <SlArrowLeft />
        </button>
        {Array.from(
          { length: Math.ceil(page / 16) },
          (_, index) =>
            index <= a &&
            index + 1 + pageButton * (a + 1) <= Math.ceil(page / 16) && (
              <button
                id="pageButton"
                key={index}
                onClick={() => selectPage(index + 1 + pageButton * (a + 1))}
              >
                {index + 1 + pageButton * (a + 1)}
              </button>
            )
        )}

        <button
          id="buttonPage"
          onClick={rightPage}
          disabled={(pageButton + 1) * a > Math.ceil(page / 16)}
        >
          <SlArrowRight />
        </button>
      </div>
    </div>
  );
};
export default MainRecodePage;

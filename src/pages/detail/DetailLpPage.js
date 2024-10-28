import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailViewLp } from "../../api/porduct";

const DetailLpPage = () => {
  const { productCode } = useParams();
  const [detail, setDetail] = useState([]);
  const detailPage = async () => {
    const result = await DetailViewLp(productCode);
    setDetail(result.data);
  };

  useEffect(() => {
    if (productCode !== 0) {
      detailPage();
    }
    console.log(detail);
  }, []);

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
  useEffect(() => {}, []);
  return (
    <div class="quill" id="detailPage">
      <div class="ql-container ql-snow">
        <div
          class="ql-editor"
          dangerouslySetInnerHTML={{ __html: detail.productLongtext }}
        ></div>
      </div>
    </div>
  );
};
export default DetailLpPage;

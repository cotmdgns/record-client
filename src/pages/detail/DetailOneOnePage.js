import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailOneOneView } from "../../api/oneOneInquiry";

const DetailOneOnePage = () => {
  const { OneOneCode } = useParams();
  const [detailView, setDetailView] = useState(null);
  const detailViewCode = () => {
    const result = DetailOneOneView(OneOneCode);
    setDetailView(result);
  };
  useEffect(() => {
    console.log(detailView);
  }, []);
  useEffect(() => {
    console.log(detailView);
  }, [OneOneCode]);
  return <div>디테일 페이지에양</div>;
};
export default DetailOneOnePage;

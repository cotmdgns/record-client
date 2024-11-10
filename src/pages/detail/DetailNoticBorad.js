import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailViewNoticeBoard } from "../../api/noticeBoardAPI";

const DetailNoticBorad = () => {
  const { noticBoradCode } = useParams();
  const [detailView, setDetailView] = useState("");

  const view = async () => {
    const result = await detailViewNoticeBoard(noticBoradCode);
    setDetailView(result.data);
  };

  useEffect(() => {
    view();
    console.log(detailView);
  }, []);
  return (
    <div>
      <div className="quill" id="detailPage">
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: detailView.noticeBoardText }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default DetailNoticBorad;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailNoticBorad = () => {
  return (
    <div>
      <div className="quill" id="detailPage">
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            // dangerouslySetInnerHTML={{ __html: detail.productLongtext }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default DetailNoticBorad;

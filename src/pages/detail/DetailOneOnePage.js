import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DetailOneOneView } from "../../api/oneOneInquiry";
import { useAuth } from "../../contexts/AuthContext";
import "../../assets/oneOneInquiry.scss";
import { CreateComment, ViewComment } from "../../api/oneOneInquiry";

const DetailOneOnePage = () => {
  const [comment, setComment] = useState({
    oneOneInquiryCode: "",
    userTable: [],
    oneOneInquiryCommentText: "",
  });
  const { OneOneCode } = useParams();
  const [detailView, setDetailView] = useState(null);
  const [detailComment, setDetailComment] = useState(false);
  const [oneOneInquiryCodeComment, setOneOneInquiryCodeComment] =
    useState(null);
  const { member, userMember } = useAuth();
  const inputRef = useRef(null);
  const navigator = useNavigate();
  const detailViewCode = async () => {
    const result = await DetailOneOneView(OneOneCode);
    setDetailView(result.data);
    //시작하자마자 일단 디테일코드 집어놓기 ( 댓글 )
    setComment(() => ({
      ...comment,
      oneOneInquiryCode: OneOneCode,
      userTable: {
        userCode: member?.userCode,
      },
    }));
  };
  const PageViewComment = async () => {
    // 페이지 코드 보내기
    const result = await ViewComment(OneOneCode);
    console.log(result.data);
    setOneOneInquiryCodeComment(result.data);
  };
  // 새로고침때문에 임펙트 두번 사용함
  useEffect(() => {
    detailViewCode();
    PageViewComment();
  }, []);

  useEffect(() => {
    detailViewCode();
    PageViewComment();
  }, [member]);

  // 목록페이지로 가기
  const allViewBtn = () => {
    navigator("/OneOneInquiry");
  };
  // 댓글 작성하기
  const commentBtn = async () => {
    if (
      comment.oneOneInquiryCode === "" ||
      comment.userTable === "" ||
      comment.oneOneInquiryCommentText === ""
    ) {
      alert("댓글을 작성해주세요");
    } else {
      await CreateComment(comment);
      PageViewComment();
    }
  };
  // 핸들러
  const handleChange = (e) => {
    setComment({ ...comment, oneOneInquiryCommentText: e.target.value });
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // 초기화
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // 새로운 높이 설정
    }
  }, []);
  return (
    <div id="detailOneOnePage">
      <div id="detailOneOnePageBox">
        <div id="detailOneOnePageUserName">
          작성자 : {detailView?.userTable.userName}
        </div>
        <div id="detailOneOnePageH1">제목 : {detailView?.oneOneInquiryH1}</div>
        <div id="detailOneOnePageCreated">
          생성날짜 :{" "}
          {detailView?.oneOneInquiryCreated?.replace("T", " ").substr(0, 16)}
        </div>
      </div>
      <div id="detailOneOnePageText">
        <div>{detailView?.oneOneInquiryText}</div>
      </div>
      {/*댓글작성보이기 */}
      {oneOneInquiryCodeComment !== null && oneOneInquiryCodeComment !== "" ? (
        <>
          {!detailComment ? (
            <>
              {" "}
              <div id="detailOneOnePageUserComment">
                <div id="detailOneOnePageUserCommentH1">
                  <div>{oneOneInquiryCodeComment?.userTable?.userName}</div>
                  <div>
                    {oneOneInquiryCodeComment?.oneOneInquiryCommentCreated
                      .replace("T", " ")
                      .substr(0, 16)}
                  </div>
                </div>
                <div id="detailOneOnePageUserCommentText">
                  <div>
                    {oneOneInquiryCodeComment?.oneOneInquiryCommentText}
                  </div>
                </div>
              </div>{" "}
              <div>
                <button onClick={allViewBtn}>목록보기</button>
                <button>수정하기</button>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <></>
      )}

      {/*댓글작성부분 */}
      <div id="detailOneOnePageComment">
        {member?.userManager == 3 && oneOneInquiryCodeComment === "" ? (
          <>
            <div>
              {/* <div contenteditable="true" placeholder="답글"></div> */}
              <textarea
                id="detailOneOnePageCommentText"
                ref={inputRef}
                type="text"
                value={comment.oneOneInquiryCommentText}
                onChange={handleChange}
                placeholder="답글 작성하기"
              ></textarea>
            </div>
            <div>
              <button onClick={allViewBtn}>목록보기</button>
              {oneOneInquiryCodeComment === "" ||
              oneOneInquiryCodeComment === null ||
              oneOneInquiryCodeComment === undefined ? (
                <button onClick={commentBtn}>답글쓰기</button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default DetailOneOnePage;

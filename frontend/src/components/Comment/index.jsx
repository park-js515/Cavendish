import { useEffect, useState } from "react";
import "styles/css/comment.css";
import CommentUpdateComponent from "./CommentUpdateComponent";

export default function CommentComponent({
  commentId,
  createDateTime,
  nickname,
  isMine,
  commentList,
  setCommentList,
}) {
  const [comment, setComment] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const updateHandler = () => {
    if (isUpdate === false) setIsUpdate(true);
    else setIsUpdate(false);
  };

  return (
    <>
      {!isUpdate && (
        <div className="comment_body">
          <div className="comment_header">
            <div className="comment_user">
              <div>{nickname}</div>
            </div>
            {isMine && (
              <div className="buttons">
                <button onClick={updateHandler} type="button">
                  수정
                </button>{" "}
                <button type="button">삭제</button>
              </div>
            )}
          </div>
          <div className="comment_content">
            <div className="comment_id">{commentId}.</div>
            <div className="comment_content">{"댓글 내용"}</div>
            <div className="date">작성일시 : {createDateTime}</div>
          </div>
        </div>
      )}
      {isUpdate && (
        <CommentUpdateComponent
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          comment={comment}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      )}
    </>
  );
}

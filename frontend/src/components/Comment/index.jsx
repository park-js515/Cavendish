import { useEffect, useState } from "react";
import "styles/css/comment.css";
import CommentUpdateComponent from "./CommentUpdateComponent";
import { deleteComment, getCommentsList } from "api/comments";

export default function CommentComponent({
  commentId,
  createDateTime,
  nickname,
  isMine,
  commentList,
  setCommentList,
  page,
  size,
}) {
  const [comment, setComment] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const updateHandler = () => {
    if (isUpdate === false) setIsUpdate(true);
    else setIsUpdate(false);
  };

  const reloadCommentList = () => {
    getCommentsList(
      { page: page, size: size },
      (response) => {
        const data = response.data.response;
        setCommentList(data.content);
      },
      () => {},
    );
  };

  const commentDeleteHandler = () => {
    deleteComment(
      commentId,
      () => {
        reloadCommentList();
      },
      () => {},
    );
  };

  return (
    <>
      {!isUpdate && (
        <div className="comment_body">
          <div className="comment_header">
            <div className="comment_user">
              <div>{nickname}</div>
            </div>
            {!isMine && (
              <div className="buttons">
                <button type="button" onClick={updateHandler}>
                  수정
                </button>{" "}
                <button type="button" onClick={commentDeleteHandler}>삭제</button>
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
          commentId={commentId}
          setIsUpdate={setIsUpdate}
          comment={comment}
          commentList={commentList}
          setCommentList={setCommentList}
          page={page}
          size={size}
        />
      )}
    </>
  );
}

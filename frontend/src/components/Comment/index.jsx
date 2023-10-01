import { useEffect, useState } from "react";
import "styles/css/comment.css";
import CommentUpdateComponent from "./CommentUpdateComponent";
import { deleteComment, getCommentsList } from "api/comments";

export default function CommentComponent({
  commentId,
  boardId,
  createDateTime,
  nickname,
  isMine,
  comment,
  setCommentList,
  page,
  size,
}) {

  const [isUpdate, setIsUpdate] = useState(false);

  const updateHandler = () => {
    if (isUpdate === false) setIsUpdate(true);
    else setIsUpdate(false);
  };

  const reloadCommentList = () => {
    getCommentsList(
      { boardId:boardId, page: page, size: size },
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
                </button><span>{" "}|{" "}</span>
                <button type="button" onClick={commentDeleteHandler}>삭제</button>
              </div>
            )}
          </div>
          <div className="comment_content">
            <div className="comment_content">{comment}</div>
            <div className="date">작성일시 : {createDateTime}</div>
          </div>
        </div>
      )}
      {isUpdate && (
        <CommentUpdateComponent
          commentId={commentId}
          boardId={boardId}
          setIsUpdate={setIsUpdate}
          comment={comment}
          setCommentList={setCommentList}
          page={page}
          size={size}
        />
      )}
    </>
  );
}

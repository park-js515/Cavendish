import { useState } from "react";
import "styles/css/comment.css";
import CommentUpdateComponent from "./CommentUpdateComponent";

export default function CommentComponent({
  content,
  commentList,
  setCommentList,
}) {
  const [comment, setComment] = useState(content);

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
              <image className="user_img" src="#" alt="user_img" />
              <div>닉네임</div>
            </div>
            <div className="buttons">
              <button onClick={updateHandler} type="button">
                수정
              </button>{" "}
              |{/* commentList.splice({id}, 1) */}
              <button type="button">삭제</button>
            </div>
          </div>
          <div className="comment_content">
            <div>{content}</div>
            <div className="date">일시 2023-09-22</div>
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

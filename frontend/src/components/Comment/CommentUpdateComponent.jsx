import { getCommentsList, updateComment } from "api/comments";
import { useState } from "react";

export default function CommentUpdateComponent({
  commentId,
  setIsUpdate,
  comment,
  setCommentList,
  page,
  size,
}) {
  const [newComment, setNewComment] = useState(comment);
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
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

  const handleCommentSubmit = () => {
    if (newComment === "") return;
    updateComment(
      { commentId: commentId, contents: newComment },
      () => {
        reloadCommentList();
        setIsUpdate(false);
      },
      () => {},
    );
  };

  return (
    <div className="comment_area">
      <textarea
        className="comment_input"
        value={newComment}
        onChange={handleCommentChange}
      />
      <button
        className="comment_input_button"
        onClick={handleCommentSubmit}
        type="button"
      >
        수정
      </button>
    </div>
  );
}

import { useState } from "react";

export default function CommentUpdateComponent({
  comment,
  setIsUpdate,
  commentList,
  setCommentList,
}) {
  const [newComment, setNewComment] = useState(comment);
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleCommentSubmit = () => {
    setCommentList((commentList) => [...commentList, newComment]);
    setIsUpdate(false);
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

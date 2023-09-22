import "styles/css/comment.css";

export default function CommentComponent({ content }) {
  return (
    <div className="comment_body">
      <div className="comment_header">
        <div className="comment_user">
          <image className="user_img" src="#" alt="user_img" />
          <div>닉네임</div>
        </div>
        <div className="buttons">
          <button type="button">수정</button> |
          <button type="button">삭제</button>
        </div>
      </div>
      <div className="comment_content">
        <div>{content}</div>
        <div className="date">일시 2023-09-22</div>
      </div>
    </div>
  );
}

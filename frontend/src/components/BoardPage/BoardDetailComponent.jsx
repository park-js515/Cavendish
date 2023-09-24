import { useState } from "react";
import { Link, useParams } from "../../../node_modules/react-router-dom/dist/index";
import { current } from "../../../node_modules/@reduxjs/toolkit/dist/index";
import CommentComponent from "components/Comment/index";

export default function BoardDetailComponent() {

  const { id } = useParams();
  const item={
    id:id,
    title: "게시글 제목",
    content: "게시글 내용"
  }

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleCommentChange = (e) => {
    setComment((current) => e.target.value);
  };
  const handleCommentSubmit = () => {
    setCommentList((currentList) => [...currentList, comment]);
    setComment("");
  };

  return (
    <div className="detail_page">
      <div className="detail_header">
        <h2>{item.title}</h2>
        <div className="header_info">
          <div>일시 2023-09-22</div>
          <div>nickname</div>
        </div>
      </div>

      <hr />

      <div className="detail_content">{item.content}</div>

      <hr />

      <div className="comment_block">
        <h2>댓글</h2>
        <div className="comment_area">
          <textarea
            className="comment_input"
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            className="comment_input_button"
            onClick={handleCommentSubmit}
            type="button"
          >
            등록
          </button>
        </div>
        <ul className="comment_list">
          {commentList.map((comment) => {
            return (
              <li>
                <CommentComponent content={comment} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="buttons">
        <Link className="button_link right" to="/board">
          돌아가기
        </Link>
      </div>
    </div>
  );
}

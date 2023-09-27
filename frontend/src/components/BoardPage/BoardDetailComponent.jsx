import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import CommentComponent from "components/Comment/index";
import CommentCreateComponent from "components/Comment/CommentCreateComponent";
import { deleteBoardContent, getBoardDetailContent } from "api/boards";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardDetailComponent() {
  const { id } = useParams();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [date, setDate] = useState("");

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getBoardDetailContent(
      id,
      (response) => {
        const data = response.data.response;
        // console.log(data);
        setNickname(data.nickname);
        setTitle(data.title);
        setContents(data.contents);
        setDate(data.createDateTime);
      },
      () => {},
    );
  });

  const deleteHandler = () => {
    deleteBoardContent(
      id,
      () => {
        console.log("delete complete");
        navigate(`/board`);
      },
      () => {
        console.error();
      },
    );
  };

  return (
    <div className="detail_page">
      <div className="detail_header">
        <h2>{title}</h2>
        <div className="header_info">
          <div>일시 {date}</div>
          <div>{nickname}</div>
        </div>
      </div>

      <hr />

      <div className="detail_content">{contents}</div>

      <hr />

      <div className="comment_block">
        <h2>댓글</h2>
        <CommentCreateComponent
          commentList={commentList}
          setCommentList={setCommentList}
        />

        <ul className="comment_list">
          {commentList.map((comment, idx) => {
            return (
              <li key={idx}>
                <CommentComponent
                  content={comment}
                  commentList={commentList}
                  setCommentList={setCommentList}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="buttons">
        <Link className="button_link right" to="/board">
          돌아가기
        </Link>
        <button className="button_link" onClick={deleteHandler} type="button">
          삭제하기
        </button>
      </div>
    </div>
  );
}

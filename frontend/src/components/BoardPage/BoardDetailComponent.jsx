import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import CommentComponent from "components/Comment/index";
import CommentCreateComponent from "components/Comment/CommentCreateComponent";
import {
  deleteBoardContent,
  getBoardDetailContent,
  getBoardImage,
} from "api/boards";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "components/Carousel/index";
import { getCommentsList } from "api/comments";

export default function BoardDetailComponent() {
  const { id } = useParams();

  // 게시글
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState([]);
  // 본인 게시글인지 확인
  const [isMine, setIsMine] = useState(false);

  const [like, setLike] = useState(0);

  // 댓글
  const [commentList, setCommentList] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const navigate = useNavigate();

  // 댓글 리스트 로드
  useEffect(() => {
    getCommentsList(
      { boardId: id, page: page, size: size },
      (response) => {
        const data = response.data.response;
        setCommentList(data.content);
        // console.log(data);
      },
      () => {},
    );
  }, [page, size]);

  useEffect(() => {
    getBoardDetailContent(
      id,
      (response) => {
        const data = response.data.response;
        setNickname(data.nickname);
        setTitle(data.title);
        setContents(data.contents);
        setDate(data.createDateTime);
        setImageData(data.images);
        setLike(data.like);
        setIsMine(data.isMine);
        // console.log(data);
      },
      () => {},
    );
  }, []);

  const deleteHandler = async () => {
    await deleteBoardContent(
      id,
      () => {
        navigate(`/board`);
        console.log("delete complete");
      },
      () => {
        console.error();
      },
    );
  };

  const updateHandler = () => {
    // if(isMine!==true) return
    navigate(`/board/update/${id}`);
  };

  return (
    <div className="detail_page">
      <div className="detail_header">
        <h2>{title}</h2>
        <div className="header_info">
          <div className="flex-row">
            <div>{nickname}</div> |<div>좋아요 : {like}</div>
          </div>
          <div className="flex-row">
            <div>작성일자 : {date}</div>
          </div>
        </div>
      </div>

      <hr />

      <div className="detail_content">
        <Carousel carouselList={imageData} />
        {contents}
      </div>

      <hr />

      <div className="comment_block">
        <h2>댓글</h2>
        <CommentCreateComponent
          boardId={id}
          page={page}
          size={size}
          setCommentList={setCommentList}
        />

        <ul className="comment_list">
          {commentList.map((comment, idx) => {
            return (
              <li key={idx}>
                <CommentComponent
                  commentId={comment.commentId}
                  boardId={id}
                  createDateTime={comment.createDateTime}
                  nickname={comment.nickname}
                  isMine={comment.isMine}
                  comment={comment.contents}
                  setCommentList={setCommentList}
                  page={page}
                  size={size}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="button_container">
        <div className="buttons between">
          <Link className="button_link" to="/board">
            돌아가기
          </Link>
          {isMine && (
            <div>
              <button
                className="button_link"
                onClick={updateHandler}
                type="button"
              >
                수정하기
              </button>
              <button
                className="button_link delete"
                onClick={deleteHandler}
                type="button"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { memberInfo } from "api/member";
import { useEffect, useRef, useState } from "react";
import MyPageUpdateComponent from "./MyPageUpdateComponent";
import { getBoardsList } from "api/boards";
import { getCommentsList } from "api/comments";

export default function MyPageComponent() {
  const [data, setData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [boardPage, setBoardPage] = useState(0);
  const [boardSize, setBoardSize] = useState(10);
  const [commentPage, setCommentPage] = useState(0);
  const [commentSize, setCommentSize] = useState(10);

  const [myArticles, setMyArticles] = useState([]);
  const [myComments, setMyComments] = useState([]);

  const [toggle, setToggle] = useState(0);

  const toggleHandelr = (e) => {
    setToggle(e.target.value);
  };

  const myArticleList = () => {
    getBoardsList(
      {
        type: "MY",
      },
      (response) => {
        const data = response.data.response.content;
        setMyArticles(data);
      },
      () => {
        console.error();
      },
    );
  };

  const myCommentList = () => {
    getCommentsList(
      {
        type: "MY",
      },
      (response) => {
        const data = response.data.response.content;
        setMyComments(data);
      },
      () => {
        console.error();
      },
    );
  };

  useEffect(() => {
    memberInfo(
      (response) => {
        const data = response.data.response;
        setData(data);
        getBoardsList();
        myCommentList();
      },
      () => {
        console.log("error");
      },
    );
  }, []);

  return (
    <div className="mypage_main">
      {!isUpdate && (
        <div className="mypage_info">
          {/* <image className="user_img" src="#" alt="user_img" /> */}
          <div className="user_info">
            <div className="user_id">{data.loginId}</div>
            <div className="user_nickname">@{data.nickname}</div>
          </div>
          {/* <button className="update_nick" onClick={updateHandler}>닉네임 수정</button> */}
        </div>
      )}
      {isUpdate && (
        <MyPageUpdateComponent data={data} setIsUpdate={setIsUpdate} />
      )}
      <ul className="mypage_content">
        <li
          value={0}
          className={toggle === 0 ? "selected" : ""}
          onClick={toggleHandelr}
        >
          내가 쓴 글
        </li>
        <li
          value={1}
          className={toggle === 1 ? "selected" : ""}
          onClick={toggleHandelr}
        >
          내가 쓴 댓글
        </li>
      </ul>
      <ul>
        {toggle === 0 && (
          <div className="my_article">
            {myArticles.map((article) => {
              return <div>{article.contents}</div>;
            })}
          </div>
        )}
        {toggle === 1 && (
          <div className="my_comment">
            {myComments.map((comment) => {
              return <div>{comment.contents}</div>;
            })}
          </div>
        )}
      </ul>
    </div>
  );
}

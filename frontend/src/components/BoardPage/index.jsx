import { useState } from "react";
import { Link, Route, useParams } from "../../../node_modules/react-router-dom/dist/index";

export default function BoardPageComponent() {
  // 더미데이터
  const boardContentData = [
    {
      id: 1,
      title: "1번 테스트",
      content: "테스트를 위한 게시글 내용",
    },
    {
      id: 2,
      title: "2번 테스트",
      content: "테스트를 위한 게시글 내용",
    },
    {
      id: 3,
      title: "3번 테스트",
      content: "테스트를 위한 게시글 내용",
    },
    {
      id: 4,
      title: "4번 테스트",
      content: "테스트를 위한 게시글 내용",
    },
    {
      id: 5,
      title: "5번 테스트",
      content: "테스트를 위한 게시글 내용",
    },
  ];

  const page = useParams();
  // 더미 페이지 데이터
  const itemsPerPage = 5; // 페이지당 아이템 개수
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = boardContentData.slice(startIndex, endIndex);

  return (
    <div className="board_main">
      <div className="board_list">
        <div className="board_header">
          <div>
            <h2>게시판</h2>
          </div>
          <div className="buttons">
            <Link className="button_link" to="/board/create">
              생성하기
            </Link>
          </div>
        </div>
        <ul>
          {boardContentData.map((item) => {
            return (
            <Link to={`/board/detail/${item.id}`} key={item.id}>
              <li>
                <div>
                  <img src="images/logo.png" alt="ㅋㅋ" />
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <span>{item.content}</span>
                </div>
              </li>
            </Link>
            )
          })}
        </ul>
      </div>
      <div className="board_number">
        <Link className="page_button" to={`/board/${parseInt(page) > 1 ? parseInt(page) - 1 : 1}`} type="button">{"<"}</Link>
        <Link className="page_button" to={`/board/1`} type="button">1</Link>
        <Link className="page_button" to={`/board/2`} type="button">2</Link>
        <Link className="page_button" to={`/board/3`} type="button">3</Link>
        <Link className="page_button" to={`/board/4`} type="button">4</Link>
        <Link className="page_button" to={`/board/5`} type="button">5</Link>
        <Link className="page_button" to={`/board/${parseInt(page) + 1}`} type="button">{">"}</Link>
      </div>
    </div>
  );
}

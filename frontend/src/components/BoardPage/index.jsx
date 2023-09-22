import { useState } from "react";
import { Link, Route } from "../../../node_modules/react-router-dom/dist/index";

export default function BoardPageComponent() {
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
          <Link to="/board/detail">
            <li>
              <div>
                <img src="images/logo.png" alt="ㅋㅋ" />
              </div>
              <div>
                <h2>샘플 게시글 제목</h2>
                <span>샘플 게시글 내용</span>
              </div>
            </li>
          </Link>
          <Link to="/board/detail">
            <li>
              <div>
                <img src="images/logo.png" alt="ㅋㅋ" />
              </div>
              <div>
                <h2>샘플 게시글 제목</h2>
                <span>샘플 게시글 내용</span>
              </div>
            </li>
          </Link>
          <Link to="/board/detail">
            <li>
              <div>
                <img src="images/logo.png" alt="ㅋㅋ" />
              </div>
              <div>
                <h2>샘플 게시글 제목</h2>
                <span>샘플 게시글 내용</span>
              </div>
            </li>
          </Link>
          <Link to="/board/detail">
            <li>
              <div>
                <img src="images/logo.png" alt="ㅋㅋ" />
              </div>
              <div>
                <h2>샘플 게시글 제목</h2>
                <span>샘플 게시글 내용</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
      <div className="board_number">
        <button type="button">{"<<"}</button>
        <button type="button">{"<"}</button>
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
        <button type="button">{">"}</button>
        <button type="button">{">>"}</button>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function BoardPageComponent() {
  return (
    <div className="board_main">
      <div className="board_list">
        <ul>
          <li>
            <div>
              <img src="images/logo.png" alt="ㅋㅋ" />
            </div>
            <div>
              <h2>It's Too hard</h2>
              <span>샘플 게시글 내용</span>
            </div>
          </li>
          <li>
            <div>
              <img src="images/logo.png" alt="ㅋㅋ" />
            </div>
            <div>
              <h2>It's Too hard</h2>
              <span>샘플 게시글 내용</span>
            </div>
          </li>
          <li>
            <div>
              <img src="images/logo.png" alt="ㅋㅋ" />
            </div>
            <div>
              <h2>It's Too hard</h2>
              <span>샘플 게시글 내용</span>
            </div>
          </li>
          <li>
            <div>
              <img src="images/logo.png" alt="ㅋㅋ" />
            </div>
            <div>
              <h2>It's Too hard</h2>
              <span>샘플 게시글 내용</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="board_number">
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
      </div>
    </div>
  );
}

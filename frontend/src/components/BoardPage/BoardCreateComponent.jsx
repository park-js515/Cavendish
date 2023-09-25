import { useState } from "react";
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import { current } from "../../../node_modules/@reduxjs/toolkit/dist/index";

export default function BoardCreateComponent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitle = (e) => {
    setTitle((current) => e.target.value);
  };
  const handleContent = (e) => {
    setContent((current) => e.target.value);
  };

  return (
    <div className="create_page">
      <form className="create_form">
        <input
          className="create_title"
          type="text"
          value={title}
          onChange={handleTitle}
          placeholder="제목을 입력해 주세요."
        />
        <textarea
          className="create_body"
          type="text"
          value={content}
          onChange={handleContent}
        />
        <div className="buttons">
          <Link className="button_link" to="/board">
            생성
          </Link>
          <Link className="button_link" to="/board">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

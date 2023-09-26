import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { createBoardContent } from "api/boards";

export default function BoardCreateComponent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle((current) => e.target.value);
  };
  const handleContent = (e) => {
    setContent((current) => e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let files = e.target.files.files;
    let formData = new FormData();

    let dataSet = {
      quotation_id: null,
      title: title,
      contents: content,
    };

    formData.append("data", JSON.stringify(dataSet));

    if (files === null) formData.append("files", null);
    else {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        console.log(files[i]);
      }
    }

    console.log(formData.get("data"));
    console.log(formData.getAll("files"));

    createBoardContent(
      formData,
      () => {
        navigate.push("/board");
      },
      () => {
        console.error();
      },
    );
  };

  return (
    <div className="create_page">
      <form className="create_form" onSubmit={(e) => onSubmit(e)}>
        <input
          className="create_title"
          type="text"
          name="title"
          value={title}
          onChange={handleTitle}
          placeholder="제목을 입력해 주세요."
        />
        <textarea
          className="create_body"
          type="text"
          name="content"
          value={content}
          onChange={handleContent}
        />
        <input type="file" name="files" multiple="multiple" />
        <div className="buttons">
          <button type="submit" className="button_link">
            생성
          </button>
          <Link className="button_link" to="/board">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

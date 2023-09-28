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

  const onSubmit = async (e) => {
    e.preventDefault();

    let files = e.target.uploadedFile.files;
    let formData = new FormData();

    let data = {
      quotation_id: null,
      title: title,
      contents: content,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
    );

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
    } else formData.append("files", new Blob([], { type: "application/json" }));

    // console.log(formData.get("data"));
    // console.log(formData.getAll("files"));

    // for (let key of formData.keys()) {
    //   console.log(key);
    // }
    // for (let value of formData.values()) {
    //   console.log(value);
    // }

    await createBoardContent(
      formData,
      () => {
        navigate("/board");
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
        <input type="file" name="uploadedFile" multiple="multiple" />
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

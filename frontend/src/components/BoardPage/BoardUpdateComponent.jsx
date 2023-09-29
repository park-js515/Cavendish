import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUpdateBoardContent, updateBoardContent } from "api/boards";

export default function BoardUpdateComponent() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [imageData, setImageData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUpdateBoardContent(
      id,
      (response) => {
        const data = response.data.response;
        setTitle(data.title);
        setContent(data.contents);
        setImageData(data.images);
        console.log(data);
      },
      () => {},
    );
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
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

    await updateBoardContent(
      formData,
      () => {
        navigate(`/board/detail/${id}`);
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
            수정
          </button>
          <Link className="button_link" to="/board">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

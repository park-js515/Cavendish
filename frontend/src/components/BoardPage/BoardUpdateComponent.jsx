import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUpdateBoardContent, updateBoardContent } from "api/boards";

export default function BoardUpdateComponent() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [imageData, setImageData] = useState([]);
  const [deleteImage, setDeleteImage] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUpdateBoardContent(
      id,
      (response) => {
        const data = response.data.response;
        setTitle(data.title);
        setContent(data.contents);
        setImageData(data.images);
        // console.log(data);
      },
      () => {},
    );
  }, []);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let files = e.target.uploadedFile.files;
    let formData = new FormData();

    let data = {
      id: id,
      contents: content,
      deleteImage: deleteImage,
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
      (response) => {
        // console.log(response);
        navigate(`/board/detail/${id}`);
      },
      () => {
        console.error();
      },
    );
  };

  // X 버튼 클릭 이벤트 핸들러 함수
  function handleRemoveButtonClick(e) {
    // X 버튼을 클릭한 요소의 부모 요소를 찾아 해당 이미지와 X 버튼을 삭제합니다.
    const imageWrapper = e.target.closest(".imageWrapper");
    if (imageWrapper) {
      imageWrapper.remove();
      setDeleteImage((deleteImage) => [...deleteImage, e.target.value]);
    }
  }

  // 모든 X 버튼에 클릭 이벤트 리스너 추가
  const removeButtons = document.querySelectorAll(".removeButton");
  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemoveButtonClick);
  });

  return (
    <div className="update_page">
      <form className="update_form" onSubmit={(e) => onSubmit(e)}>
        <div className="title">{title}</div>
        <textarea
          className="update_body"
          type="text"
          name="content"
          value={content}
          onChange={handleContent}
        />
        <input type="file" name="uploadedFile" multiple="multiple" />
        <ul className="updated_image">
          {imageData.map((image, idx) => {
            return (
              <div className="imageWrapper" key={`${image.imageId}`}>
                <img
                  className="updated_image"
                  src={`https://localhost:5000/api/image/${image.imageId}`}
                  alt={`${image.imageId}`}
                />
                <button value={image.imageId} className="removeButton">
                  X
                </button>
              </div>
            );
          })}
        </ul>
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

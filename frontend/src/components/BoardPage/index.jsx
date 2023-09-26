import { getBoardsList } from "api/boards";
import { useEffect, useRef, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";

export default function BoardPageComponent() {
  const check = useRef(false);
  const [boardData, setBoardData] = useState([]);
  const [page, setpage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getBoardsList(
      { page: page, size: 10, sort: "contents,ASC" },
      (response) => {
        const data = response.data.response.content;
        setTotalPages(response.data.response.totalPages);
        setBoardData(data);
      },
      () => {
        console.error();
      },
    );
  }, [page]);

  const pageHandler = (newPage) => {
    setpage(newPage);
  };

  // 페이지 버튼을 렌더링할 때 반복문을 사용하여 단순화
  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <Link
          className="page_button"
          to={`/board/${i + 1}`}
          key={i}
          onClick={() => pageHandler(i)}
          type="button"
        >
          {i + 1}
        </Link>,
      );
    }

    return buttons;
  };

  return (
    <div className="board_main">
      <div className="board_list">
        <div className="board_header">
          <div>
            <h2>게시판</h2>
          </div>
          {}
          <div className="buttons">
            <Link className="button_link" to="/board/create">
              생성하기
            </Link>
          </div>
        </div>
        <ul>
          {boardData.map((item) => {
            return (
              <Link to={`/board/detail/${item.boardId}`} key={item.boardId}>
                <li>
                  <div>
                    <h2>{item.title}</h2>
                    <span>{item.contents}</span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="board_number">
        <Link
          className="page_button"
          to={`/board/${page - 1 > 0 ? page - 1 : 1}`}
          onClick={() => pageHandler(page - 1 > 0 ? page - 1 : 0)}
          type="button"
        >
          {"<"}
        </Link>
        {renderPageButtons()}
        <Link
          className="page_button"
          to={`/board/${page + 1 < totalPages - 1 ? page + 1 : totalPages}`}
          onClick={() =>
            pageHandler(page + 1 < totalPages - 1 ? page + 1 : totalPages - 1)
          }
          type="button"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}

import { getBoardsList } from "api/boards";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";

export default function BoardPageComponent() {
  const [boardData, setBoardData] = useState([]);
  const [page, setpage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    getBoardsList(
      { page: page, size: 10, sort: "createDateTime,DESC" },
      (response) => {
        const data = response.data.response.content;
        setTotalPages(response.data.response.totalPages);
        console.log(data)
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
          <div className="buttons">
            {isLogin && (
              <Link className="button_link" to="/board/create">
                생성하기
              </Link>
            )}
          </div>
        </div>
        <ul>
          {boardData.map((item) => {
            return (
              <Link to={`/board/detail/${item.boardId}`} key={item.boardId}>
                {/* {console.log(item)} */}
                <li>
                  <div className="content-container">
                    <div className="content-header">
                      <div className="board-id">
                        {item.boardId}.{" "}
                        <span className="article-title">
                          {item.title.substr(0, 20)}
                        </span>
                      </div>
                      <span className="nickname">작성자 : {item.nickname}</span>
                    </div>
                    <div className="content-date">작성일자 : {item.createDateTime} </div>
                    <div className="content-description">
                      <div className="article">
                        <span className="article-content">
                          {item.contents.substr(0, 20)}
                        </span>
                      </div>
                    </div>
                    <div className="content-footer">
                      <div><AiOutlineHeart/> {item.like}</div>
                      <div><AiOutlineEye/> {item.view}</div>
                    </div>
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

import { getBoardsList } from "api/boards";
import { useEffect, useRef, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";

export default function BoardPageComponent() {
  const check = useRef(false);
  const [boardData, setBoardData] = useState([]);

  useEffect(()=>{
    if (!check.current) {
      getBoardsList(
        (response) => {
          const data = response.data.response;
          setBoardData(data);
        },
        () => {
          console.log("error");
        },
      );
    }
    return () => {
      check.current = true;
    };
  }, []);

  const page = useParams();

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
          {boardData.map((item) => {
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
            );
          })}
        </ul>
      </div>
      <div className="board_number">
        <Link
          className="page_button"
          to={`/board/${parseInt(page) > 1 ? parseInt(page) - 1 : 1}`}
          type="button"
        >
          {"<"}
        </Link>
        <Link className="page_button" to={`/board/1`} type="button">
          1
        </Link>
        <Link className="page_button" to={`/board/2`} type="button">
          2
        </Link>
        <Link className="page_button" to={`/board/3`} type="button">
          3
        </Link>
        <Link className="page_button" to={`/board/4`} type="button">
          4
        </Link>
        <Link className="page_button" to={`/board/5`} type="button">
          5
        </Link>
        <Link
          className="page_button"
          to={`/board/${parseInt(page) + 1}`}
          type="button"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}

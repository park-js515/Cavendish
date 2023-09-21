import { Link } from "../../../node_modules/react-router-dom/dist/index";

export default function BoardDetailComponent() {
  return (
    <div className="detail_page">
      <div className="detail_title">
        <h2>title</h2>
      </div>
      <hr />
      <div className="detail_content">content</div>

      <div className="comment_block">
        <textarea className="comment_input" />
        <button className="comment_input_button" type="button">
          등록
        </button>
      </div>

      <div className="buttons">
        <Link className="button_link" to="/board">
          돌아가기
        </Link>
      </div>
    </div>
  );
}

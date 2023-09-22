import {
  Link,
  Route,
  Routes,
} from "../../../node_modules/react-router-dom/dist/index";

export default function MyPageComponent() {
  return (
    <div className="mypage_main">
      <div className="mypage_info">
        <image className="user_img" src="#" alt="user_img"></image>
        <div className="user_info">
          <div className="user_id">ID</div>
          <div className="user_nickname">nickname</div>
        </div>
      </div>
      <ul className="mypage_content">
        {["내가 쓴 글", "내 견적함"].map((content) => {
          return (
            <li key={content}>
              <Link to={`/mypage/`}>{content}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

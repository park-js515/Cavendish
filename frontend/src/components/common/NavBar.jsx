import { Link, useLocation } from "react-router-dom";

const naviList = [
  { name: "board-detail", to: "/board/detail" },
  { name: "board", to: "/board" },
  { name: "login", to: "/login" },
  { name: "main", to: "/" },
  { name: "mypage", to: "/mypage" },
  { name: "part", to: "/part" },
  { name: "quotation", to: "/quotation" },
  { name: "recommend", to: "/recommend" },
  { name: "signup", to: "/signup" },
];

const activeLink = {
  color: "red",
};

const inactiveLink = {
  color: "black",
};

// 향후 수정 예정
const NavBar = () => {
  const location = useLocation();

  return (
    <>
      <ul>
        {naviList.map((item) => {
          const selectedStyle =
            location.pathname === item.to ? activeLink : inactiveLink;
          return (
            <li key={item.name}>
              <Link to={item.to} style={{ ...selectedStyle }}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NavBar;

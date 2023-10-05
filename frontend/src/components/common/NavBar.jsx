import { Link, useLocation } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import "styles/css/common.css";

const main = "Cavendish";

const naviList = (isLogin) => {
  return isLogin
    ? [
        { name: "컴퓨터추천", to: "/recommend" },
        { name: "부품", to: "/part/CPU" },
        { name: "게시판", to: "/board" },
        { name: "견적서", to: "/quotation" },
      ]
    : [
        { name: "컴퓨터추천", to: "/recommend" },
        { name: "부품", to: "/part/CPU" },
        { name: "게시판", to: "/board" },
      ];
};

const userInfo = (isLogin) => {
  return isLogin
    ? [
        { name: "마이페이지", to: "/mypage" },
        { name: "로그아웃", to: "/logout" },
      ]
    : [{ name: "로그인", to: "/login" }];
};

const Btn = ({ name, to, pathname }) => {
  const toggle = to === pathname ? "btn-active" : "btn-inactive";
  return (
    <Link to={to} className={`${toggle}`}>
      {name}
    </Link>
  );
};

const NavBar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isLogin = useSelector((state) => state.user.isLogin);
  const userInfoList = userInfo(isLogin);

  return (
    <>
      <div className="common-navbar">
        <Link to={"/"} className="btn-title">
          {main}
        </Link>
        {naviList(isLogin).map((item) => {
          const props = {
            name: item.name,
            to: item.to,
            pathname,
          };
          return <Btn key={item.name} {...props} />;
        })}
        <div className="jc-end">
          {userInfoList.map((item) => {
            const props = {
              name: item.name,
              to: item.to,
              pathname,
            };
            return <Btn key={item.name} {...props}></Btn>;
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;

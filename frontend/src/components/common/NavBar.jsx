import { Link, useLocation } from "react-router-dom";
import "styles/css/common.css";

const naviList = [
  { name: "recommend", to: "/recommend" },
  { name: "part", to: "/part" },
  { name: "board", to: "/board" },
  { name: "quotation", to: "/quotation" },
];

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
  return (
    <>
      <div className="common-navbar">
        {naviList.map((item) => {
          const props = {
            name: item.name,
            to: item.to,
            pathname: location.pathname,
          };
          return <Btn key={item.name} {...props} />;
        })}
      </div>
      <p>{location.pathname === "/recommend"}</p>
    </>
  );
};

export default NavBar;

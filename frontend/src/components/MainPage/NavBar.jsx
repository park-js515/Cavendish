import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className="mainheader">
      <div className="mainheader__content">
        <div className="mainheader__content__logo"></div>
        <nav
          className={`${"mainheader__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          {!isLogin ? (
            <ul>
              {/* <Link to="/signup">
                <button className="btn">Register</button>
              </Link> */}
              <Link to="/login">
                <button className="btn btn__login">Login</button>
              </Link>
            </ul>
          ) : (
            <ul>
              <Link to="/mypage">
                <button className="btn">MyPage</button>
              </Link>
              <Link to="/logout">
                <button className="btn">Logout</button>
              </Link>
            </ul>
          )}
        </nav>
        <div className="mainheader__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

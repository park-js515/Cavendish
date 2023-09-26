import Loading from "components/common/Loading";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
// redux
import { useDispatch } from "react-redux";
import { logout } from "redux/userSlice";
import * as recom from "redux/recommendSlice"

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 후에 axios로 대체될 수 있다.
  // 한 번만 수행하기 위해 useEffect, useRef를 사용한다.
  const check = useRef(false);
  useEffect(() => {
    if (!check.current) {
      const clearLocalStorage = () => {
        localStorage.clear();
      }

      const promise = new Promise((resolve) => {
        dispatch(logout());
        dispatch(recom.resetProcessAll());
        clearLocalStorage();
        setTimeout(() => {
          resolve();
        }, 1500);
      });

      promise.then(() => {
        alert("로그아웃 성공");
        navigate("/");
      });
    }

    return () => {
      check.current = true;
    };
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default LogoutPage;

import { memberInfo, memberRemove } from "api/member";
import { useEffect, useRef, useState } from "react";
import MyPageUpdateComponent from "./MyPageUpdateComponent";
import { useSelector } from "react-redux";

export default function MyPageComponent() {
  const isLogin = useSelector((state) => state.user.isLogin);

  const check = useRef(false);
  const [data, setData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const updateHandler = () => {
    if (isUpdate === false) setIsUpdate(true);
  };

  const [toggle, setToggle] = useState(0);

  const toggleHandelr = (e) => {
    setToggle(e.target.value);
  };

  useEffect(() => {
    if (!check.current) {
      memberInfo(
        (response) => {
          const data = response.data.response;
          setData(data);
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

  return (
    <div className="mypage_main">
      {!isUpdate && (
        <div className="mypage_info">
          {/* <image className="user_img" src="#" alt="user_img" /> */}
          <div className="user_info">
            <div className="user_id">{data.loginId}</div>
            <div className="user_nickname">{data.nickname}</div>
          </div>
          <button onClick={updateHandler}>수정</button>
        </div>
      )}
      {isUpdate && (
        <MyPageUpdateComponent data={data} setIsUpdate={setIsUpdate} />
      )}
      <ul className="mypage_content">
        <li
          value={0}
          className={toggle === 0 ? "selected" : ""}
          onClick={toggleHandelr}
        >
          내가 쓴 글
        </li>
        <li
          value={1}
          className={toggle === 1 ? "selected" : ""}
          onClick={toggleHandelr}
        >
          내가 쓴 댓글
        </li>
      </ul>
      <ul>
        {toggle === 0 && (
          <div>
            <div>게시글1</div>
            <div>게시글2</div>
            <div>게시글3</div>
            <div>게시글4</div>
          </div>
        )}
        {toggle === 1 && (
          <div>
            <div>견적1</div>
            <div>견적2</div>
            <div>견적3</div>
            <div>견적4</div>
          </div>
        )}
      </ul>
    </div>
  );
}

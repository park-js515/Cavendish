import { Link, Route, Routes } from "react-router-dom";
import { memberInfo, memberRemove } from "api/member";
import { useEffect, useRef, useState } from "react";
import MyPageUpdateComponent from "./MyPageUpdateComponent";

export default function MyPageComponent() {
  const check = useRef(false);
  const [data, setData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const updateHandler = () => {
    if (isUpdate === false) setIsUpdate(true);
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
          <image className="user_img" src="#" alt="user_img" />
          <div className="user_info">
            <div className="user_id">{data.memberId}</div>
            <div className="user_nickname">{data.nickname}</div>
          </div>
          <button onClick={updateHandler}>수정</button>
        </div>
      )}
      {isUpdate && (
        <MyPageUpdateComponent data={data} setIsUpdate={setIsUpdate} />
      )}
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

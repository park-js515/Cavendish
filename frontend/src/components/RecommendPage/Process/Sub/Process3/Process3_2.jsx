import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

const selected = "pc 게임";

const Item = ({ imgUrl, value }) => {
  const onClick = () => {};

  return (
    <div className="item" onClick={onClick}>
      <div
        className="item-top"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div className="item-bot">{value}</div>
    </div>
  );
};

const TopIcons = ({ onClick }) => {
  const [leftCol, setLeftCol] = useState("black");

  return (
    <div
      style={{
        height: "20px",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <AiOutlineArrowLeft
        size="20"
        color={leftCol}
        onMouseEnter={() => {
          setLeftCol("red");
        }}
        onMouseLeave={() => {
          setLeftCol("black");
        }}
        onClick={onClick}
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  );
};

// 소분류에 해당하는 것1
// 검색 및 페이지네이션
// 컴포넌트 재사용 기존에 존재하던 것
// 게임만 사용할 것 -> selected가 필요하지 않음
const Process3_2 = ({ setSubProcess }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TopIcons
        onClick={() => {
          setSubProcess(0);
        }}
      />
      <div className="proc3-2"></div>
    </div>
  );
};

export default Process3_2;

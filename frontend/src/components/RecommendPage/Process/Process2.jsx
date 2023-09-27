import { useState } from "react";
import dummyImg from "assets/defaultImgs2/Briar.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

const list = [
  { imgUrl: dummyImg, usage: "pc 게임" },
  { imgUrl: dummyImg, usage: "인터넷 서핑, 사무, 영상 시청 등" },
  { imgUrl: dummyImg, usage: "개발" },
  { imgUrl: dummyImg, usage: "영상 편집 및 특수효과" },
  { imgUrl: dummyImg, usage: "방송, 스트리밍" },
  { imgUrl: dummyImg, usage: "포토샵 및 일러스트레이터" },
  { imgUrl: dummyImg, usage: "2D 및 3D 모델링" },
  { imgUrl: dummyImg, usage: "비디오 인코딩" },
  { imgUrl: dummyImg, usage: "음악 작곡 및 편집" },
];

const Item = ({ imgUrl, usage }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.recommend.processList[1];
  });

  const onClick = () => {
    if (data.includes(usage)) {
      dispatch(recom.removeProcessList1({ value: usage }));
    } else {
      dispatch(recom.addProcessList1({ value: usage }));
    }
  };

  const className = data.includes(usage) ? "item-active" : "item";

  return (
    <div className={className} onClick={onClick}>
      <div
        className="item-top"
        style={{
          backgroundImage: `url(${imgUrl})`,
          visibility: usage ? "visible" : "hidden",
        }}
      ></div>
      <div className="item-bot">{usage}</div>
    </div>
  );
};

const TopIcons = ({ disabled }) => {
  const [left, setLeft] = useState("20");
  const [leftCol, setLeftCol] = useState("black");
  const [right, setRight] = useState("20");
  const [rightCol, setRightCol] = useState("black");

  return (
    <div
      style={{
        height: "30px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <AiOutlineArrowLeft
        size={left}
        col={leftCol}
        onMouseEnter={() => {
          setLeft("30");
          setLeftCol("red");
        }}
        onMouseLeave={() => {
          setLeft("20");
          setLeftCol("black");
        }}
        style={{
          cursor: "pointer",
        }}
      />
      <AiOutlineArrowRight
        size={right}
        col={rightCol}
        style={{ cursor: "pointer" }}
        disabled={disabled}
      />
    </div>
  );
};

// 2. 용도 선택 대분류
// 용도 선택 컴포넌트
const Process2 = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <div className="proc2">
        {list.map((item, index) => {
          return <Item key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Process2;

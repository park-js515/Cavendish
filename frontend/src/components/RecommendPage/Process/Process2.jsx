import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// defaultImgs2
import gameImg from "assets/defaultImgs2/default_game.png";
import officeImg from "assets/defaultImgs2/default_office.png";
import developImg from "assets/defaultImgs2/default_develop.png";
import videoEditImg from "assets/defaultImgs2/default_videoEdit.png";
import broadcastImg from "assets/defaultImgs2/default_broadcast.png";
import imgEditImg from "assets/defaultImgs2/default_imgEdit.png";
import modelingImg from "assets/defaultImgs2/default_modeling.png";
import encodingImg from "assets/defaultImgs2/default_encoding.png";
import musicImg from "assets/defaultImgs2/default_music.png";

const list = [
  { imgUrl: gameImg, usage: "게임" },
  { imgUrl: officeImg, usage: "사무" },
  { imgUrl: developImg, usage: "개발" },
  { imgUrl: videoEditImg, usage: "영상 편집" },
  { imgUrl: broadcastImg, usage: "방송" },
  { imgUrl: imgEditImg, usage: "이미지 편집" },
  { imgUrl: modelingImg, usage: "모델링" },
  { imgUrl: encodingImg, usage: "인코딩" },
  { imgUrl: musicImg, usage: "음악 작업" },
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
        }}
      ></div>
      <div className="item-bot">{usage}</div>
    </div>
  );
};

const TopIcons = () => {
  const [leftCol, setLeftCol] = useState("black");
  const [rightCol, setRightCol] = useState("black");
  const dispatch = useDispatch();
  const disabled =
    useSelector((state) => {
      return state.recommend.processList[1].length;
    }) < 1;

  return (
    <div
      style={{
        height: "30px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <AiOutlineArrowLeft
        size="30"
        color={leftCol}
        onMouseEnter={() => {
          setLeftCol("red");
        }}
        onMouseLeave={() => {
          setLeftCol("black");
        }}
        onClick={() => {
          dispatch(recom.removeProcess());
          dispatch(recom.setProcessNo(-1));
        }}
        style={{
          cursor: "pointer",
          transition: "all 200ms ease-in-out",
        }}
      />
      {disabled ? (
        <span style={{ color: "gray" }}>한 개 이상의 입력은 필수입니다.</span>
      ) : null}
      <AiOutlineArrowRight
        size="30"
        color={disabled ? "gray" : rightCol}
        onMouseEnter={() => {
          setRightCol("red");
        }}
        onMouseLeave={() => {
          setRightCol("black");
        }}
        onClick={() => {
          if (!disabled) {
            dispatch(recom.setProcessNo(1));
          }
        }}
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 200ms ease-in-out",
        }}
      />
    </div>
  );
};

// 2. 용도 선택 대분류
// 용도 선택 컴포넌트
const Process2 = ({ className }) => {
  const [data, setData] = useState(list);

  return (
    <div className={className}>
      <TopIcons />
      <div className="proc2">
        {data.map((item, index) => {
          return <Item key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Process2;

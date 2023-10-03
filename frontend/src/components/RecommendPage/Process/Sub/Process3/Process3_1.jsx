import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// redux
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

const Item = ({ imgUrl, value, onClick }) => {
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

const TopIcons = ({ onClick1, onClick2 }) => {
  const [leftCol, setLeftCol] = useState("black");
  const [rightCol, setRightCol] = useState("black");
  const data = useSelector((state) => {
    return state.recommend.processList[2];
  });
  const disabled = () => {
    for (const key in data) {
      for (let i in data[key]) {
        return false;
      }
    }

    return true;
  };

  return (
    <div
      style={{
        height: "20px",
        display: "flex",
        justifyContent: "space-between",
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
        onClick={onClick1}
        style={{
          cursor: "pointer",
          transition: "all 200ms ease-in-out",
        }}
      />
      {disabled() ? (
        <span style={{ color: "gray" }}>한 개 이상의 입력은 필수입니다.</span>
      ) : null}
      <AiOutlineArrowRight
        size="20"
        color={disabled() ? "gray" : rightCol}
        onMouseEnter={() => {
          setRightCol("red");
        }}
        onMouseLeave={() => {
          setRightCol("black");
        }}
        onClick={() => {
          if (!disabled()) {
            onClick2();
          }
        }}
        style={{
          cursor: disabled() ? "not-allowed" : "pointer",
          transition: "all 200ms ease-in-out",
        }}
      />
    </div>
  );
};

// 대분류에 해당하는 것
// 대분류에 대응되는 컴포넌트
const Process3_1 = ({ setSubProcess, setSelected }) => {
  const dispatch = useDispatch();
  const usage = useSelector((state) => {
    return state.recommend.processList[1];
  });
  const [data, setData] = useState(list);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TopIcons
        onClick1={() => {
          dispatch(recom.setProcessNo(0));
        }}
        onClick2={() => {
          dispatch(recom.setProcessNo(2));
        }}
      />
      <div className="proc3-1">
        {usage.map((item, itemIndex) => {
          const index = data.findIndex((elem) => {
            return elem.usage === item;
          });
          const imgUrl = data[index].imgUrl;
          const onClick = () => {
            setSelected(item);

            if (["게임", "이미지 편집", "모델링"].includes(item)) {
              setSubProcess(1);
            } else {
              setSubProcess(2);
            }
          };

          return (
            <Item
              key={itemIndex}
              imgUrl={imgUrl}
              value={item}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Process3_1;

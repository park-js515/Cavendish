import { useState } from "react";
import dummyImg from "assets/defaultImgs2/Briar.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// redux
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
        style={{ cursor: disabled() ? "not-allowed" : "pointer" }}
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
          const index = list.findIndex((elem) => {
            return elem.usage === item;
          });
          const imgUrl = list[index].imgUrl;
          const onClick = () => {
            setSelected(item);

            if (item === "pc 게임") {
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
import { setTab } from "../Tab/TabGroup";
import dummyImg from "assets/defaultImgs2/Briar.png";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const dummy = [
  { imgUrl: dummyImg, usage: "pc 게임" },
  { imgUrl: dummyImg, usage: "인터넷 서핑" },
  { imgUrl: dummyImg, usage: "영상 시청" },
  { imgUrl: dummyImg, usage: "사무" },
  { imgUrl: dummyImg, usage: "개발" },
  { imgUrl: dummyImg, usage: "영상편집 및 특수효과" },
  { imgUrl: dummyImg, usage: "방송, 스트리밍" },
  { imgUrl: dummyImg, usage: "포토샵" },
  { imgUrl: dummyImg, usage: "VFX 작업" },
  { imgUrl: dummyImg, usage: "비디오 인코딩" },
];

const temp = 4 - (dummy.length % 4);
for (let i = 0; i < temp; i++) {
  dummy.push({ imgUrl: "", usage: "" });
}

const Item = ({ imgUrl, usage }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    const value = usage
      ? window.confirm("해당 용도를 선택하시겠습니까?")
      : false;

    if (value) {
      dispatch(recom.setProcess({ usage }));
      dispatch(recom.setProcessNo(1));
    }
  };

  return (
    <div className="item" onClick={onClick}>
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

// 2. 용도 선택 대분류
// 용도 선택 컴포넌트
// overflow -> scroll: 나중에 좀 더 많은 요소가 들어올 수 있음.
const Process2 = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(-1));
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(1));
        }}
      >
        go
      </button>
      <div className="proc2">
        {dummy.map((item, index) => {
          return <Item key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Process2;

import { useState, useEffect, useRef } from "react";
import dummyImg from "assets/defaultImgs2/Briar.png";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

const dummy = [
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

const Item = ({ selected, imgUrl, value }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => {
    return state.recommend.processList[2][selected];
  });

  const className = list.includes(value) ? "item-active" : "item";

  const onClick = () => {
    if (list.includes(value)) {
      dispatch(recom.removeProcessList2({ key: selected, value: value }));
    } else {
      dispatch(
        recom.addProcessList2({
          key: selected,
          value: value,
        }),
      );
    }
  };

  return (
    <div className={className} onClick={onClick}>
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

// 소분류에 해당하는 것2
// 컴포넌트만 존재
// 컴포넌트 재사용 기존에 존재하던 것
const Process3_3 = ({ setSubProcess, selected }) => {
  const [data, setData] = useState(dummy);
  const check = useRef(false);
  useEffect(() => {
    if (check.current) {
    }
    return () => {
      if (!check.current) {
        check.current = true;
      }
    };
  }, []);

  return (
    <div className="proc3-3">
      {data.map((item, index) => {
        return (
          <Item
            key={index}
            selected={selected}
            imgUrl={item.imgUrl}
            value={item.usage}
          />
        );
      })}
    </div>
  );
};

export default Process3_3;

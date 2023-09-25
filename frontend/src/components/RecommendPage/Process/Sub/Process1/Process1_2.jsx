import { useState } from "react";
import { setTab } from "components/RecommendPage/Tab/TabGroup";
import PartSelect from "./PartSelect";

// imgs
import defaultCase from "assets/defaultImgs/default_case.avif";
import defaultCooler from "assets/defaultImgs/default-cooler.webp";
import defaultCPU from "assets/defaultImgs/default-cpu.avif";
import defaultGPU from "assets/defaultImgs/default-gpu.webp";
import defaultHDD from "assets/defaultImgs/default-hdd.avif";
import defaultMainboard from "assets/defaultImgs/defalut-mainboard.webp";
import defaultPower from "assets/defaultImgs/default-power.avif";
import defaultRam from "assets/defaultImgs/default-ram.avif";
import defaultSSD from "assets/defaultImgs/default-ssd.avif";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

const defaultImgs = [
  defaultCase,
  defaultCooler,
  defaultCPU,
  defaultGPU,
  defaultHDD,
  defaultMainboard,
  defaultPower,
  defaultRam,
  defaultSSD,
];

// code pen에서 card 찾아서 대체하기
const Card = ({ front, back, imgUrl, onClick, style }) => {
  return (
    <div className="card" onClick={onClick}>
      <div
        className="card-front"
        style={{ backgroundImage: `url(${imgUrl})`, ...style }}
      >
        {front}
      </div>
      <div className="card-back" style={{ ...style }}>
        {back}
      </div>
    </div>
  );
};

// 수정 예정
const BackDetail = ({ name, value }) => {
  const text = value !== "-1" ? value : "선택된 제품이 없습니다";
  return (
    <div>
      <div>{name}</div>
      <div>{text}</div>
    </div>
  );
};

const Process1_2 = ({ setSubProcess }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => {
    return state.recommend.processList[0];
  });
  const [listMapper, setListMapper] = useState(
    Array(list.length).fill({ detailName: "", imgUrl: "" }),
  );

  // redux & axios
  const setSelected = (target) => {
    dispatch(recom.setSelected(target));
  };

  return (
    <div className="proc1_2">
      <div className="card-container">
        <Card
          key={-1}
          front={"←"}
          back={"돌아가기"}
          onClick={() => {
            setSubProcess(0);
          }}
          style={{ fontSize: "30px" }}
        />
        {list.map((item, index) => {
          const imgUrl = listMapper[index].imgUrl
            ? listMapper[index].imgUrl
            : defaultImgs[index];

          return (
            <Card
              key={index}
              imgUrl={imgUrl}
              back={<BackDetail {...item} />}
              onClick={() => {
                setSelected(index);
                setSubProcess(2);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Process1_2;

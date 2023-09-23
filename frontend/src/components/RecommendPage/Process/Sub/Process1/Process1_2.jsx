import { useState } from "react";
import { setTab } from "components/RecommendPage/Tab/TabGroup";
import PartSelect from "./PartSelect";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// code pen에서 card 찾아서 대체하기
const PlusBtn = ({ name, value }) => {
  const [text, setText] = useState("+");
  return (
    <div
      className="plusBtn"
      onMouseEnter={() => {
        setText(name);
      }}
      onMouseLeave={() => {
        setText("+");
      }}
      onClick={() => {
        //
      }}
    >
      {text}
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

  return (
    <div className="proc1_2">
      <button
        onClick={() => {
          setSubProcess(0);
        }}
      >
        reset
      </button>
      {list.map((item, index) => {
        return <PlusBtn key={index} {...item} />;
      })}
    </div>
  );
};

export default Process1_2;

import SearchComponent from "../SearchComponent";
import ItemList from "../ItemList";

//redux
import { useSelector } from "react-redux";
import { useState } from "react";

// 검색결과 페이지네이션
const PartSelect = ({ setSubProcess }) => {
  const selected = useSelector((state) => {
    return state.recommend.selected;
  });
  const [value, setValue] = useState("");

  return (
    <div className="partSelect">
      <div className="back-wrapper">
        <div
          className="back"
          onClick={() => {
            setSubProcess(1);
          }}
        >
          back
        </div>
      </div>
      <SearchComponent value={value} setValue={setValue} />
      <ItemList />
    </div>
  );
};

export default PartSelect;

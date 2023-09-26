import { setTab } from "../Tab/TabGroup";
import { useState } from "react";
import Select from "react-select";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const MultiSelectComponent = ({ selectedOptions, setSelectedOptions }) => {
  const options = [
    { value: 0, label: "성능" },
    { value: 1, label: "기간" },
    { value: 2, label: "저장 공간" },
    { value: 3, label: "소음" },
  ];

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleSelectChange}
      isOptionDisabled={() => selectedOptions.length >= 3}
      // placeholder="우선순위를 골라주세요."
    />
  );
};

const SubmitBtn = ({ onClick }) => {
  return (
    <div className="submitBtn" onClick={onClick}>
      제출
    </div>
  );
};

// 우선순위 선택
// 우선순위 컴포넌트 -> 반응형
const Process5 = ({ className }) => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <div className={className}>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(2));
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(4));
        }}
      >
        go
      </button>
      <div className="proc5">
        <div className="proc5-top">
          <div className="text">우선순위를 골라주세요...</div>
          <div className="select-wrapper">
            <MultiSelectComponent
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        </div>
        <div className="proc5-bot">
          <div className="submitBtn-wrapper">
            <SubmitBtn onClick={() => {
              // const text = `priority`;
              // const priority = {};
              // selectedOptions.map((item, index) => {
                
              // })
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process5;

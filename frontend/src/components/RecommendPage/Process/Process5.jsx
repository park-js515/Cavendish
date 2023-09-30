import { useState } from "react";
import Select from "react-select";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

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
    />
  );
};

const SubmitBtn = ({ onClick }) => {
  return (
    <div className="submitBtn" onClick={onClick}>
      <AiOutlineArrowRight />
    </div>
  );
};

const TopIcons = ({ onClick1 }) => {
  const [leftCol, setLeftCol] = useState("black");

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
      <TopIcons onClick1={() => {
        dispatch(recom.setProcessNo(2));
      }}/>
      <div className="proc5">
        <div className="proc5-top">
          <div className="text">우선순위를 골라주세요</div>
        </div>
        <div className="proc5-bot">
          <div className="select-wrapper">
            <MultiSelectComponent
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        </div>
        <div className="footer">
          <div className="submitBtn-wrapper">
            <SubmitBtn
              onClick={() => {
                const text = `priority`;
                const priority = {};
                for (let i = 0; i < selectedOptions.length; i++) {
                  // priority[`${text}${i + 1}`] = selectedOptions[i].label;
                  // priority[`${text}${i + 1}`] = selectedOptions[i].value;
                  priority[`${text}${i + 1}`] = selectedOptions[i].label;
                }
                dispatch(recom.setProcess(priority));
                dispatch(recom.setProcessNo(4));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process5;

import { useState } from "react";
import Select from "react-select";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const MultiSelectComponent = ({ selectedOptions, setSelectedOptions }) => {
  const options = [
    { value: "성능", label: "성능" },
    { value: "가성비", label: "가성비" },
    { value: "A/S", label: "A/S" },
    { value: "감성", label: "감성" },
    { value: "소음", label: "소음" },
    { value: "저장공간", label: "저장공간" },
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
      <TopIcons
        onClick1={() => {
          dispatch(recom.setProcessNo(2));
        }}
      />
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SubmitBtn
                onClick={() => {
                  const arr = [];
                  selectedOptions.forEach((item) => {
                    arr.push(item.value);
                  });

                  dispatch(recom.setProcess(arr));
                  dispatch(recom.setProcessNo(4));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process5;

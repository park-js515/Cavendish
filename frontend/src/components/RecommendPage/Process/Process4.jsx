import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const dummyBudget = 120;

const BudgetComponent = ({ value, setValue }) => {
  const onChange = (event) => {
    const inputValue = event.target.value;
    const newValue = inputValue === "" ? "" : Math.max(0, inputValue);
    setValue(newValue);
  };

  return (
    <div className="budget-wrapper">
      <input
        id="budget"
        type="number"
        value={value}
        onChange={onChange}
        className="budget"
      />
    </div>
  );
};

const SubmitBtn = ({ onClick }) => {
  return (
    <div className="submitBtn" onClick={onClick}>
      제출
    </div>
  );
};
// 예산 선택
// 예산 입력
// 최소 예산
const Process4 = ({ className }) => {
  const dispatch = useDispatch();
  const [budget, setBudget] = useState(0);

  return (
    <div className={className}>
      <div className="proc4">
        <div className="upper">예산을 입력해주세요.</div>
        <div className="lower">
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BudgetComponent value={budget} setValue={setBudget} />
              <p>만원</p>
            </div>
            <div className="budget-recom">{`권장되는 최소 예산은 ${dummyBudget}만원 이상입니다.`}</div>
          </div>
        </div>
        <div className="submitBtn-wrapper">
          <SubmitBtn
            onClick={() => {
              const fixedBudget = budget !== "" ? budget : 0;
              dispatch(recom.setProcess({ budget: fixedBudget }));
              dispatch(recom.setProcessNo(3));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Process4;

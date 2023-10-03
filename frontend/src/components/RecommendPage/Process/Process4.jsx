import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

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
          transition: "all 200ms ease-in-out",
        }}
      />
    </div>
  );
};

const PartCheck = ({ index, name, value, id, imgUrl, is_have }) => {
  const Btn = () => {
    return <></>;
  };

  return <></>;
};

const SubmitBtn = ({ onClick }) => {
  return (
    <div className="submitBtn" onClick={onClick}>
      <AiOutlineArrowRight />
    </div>
  );
};
// 예산 선택
// 예산 입력
// 최소 예산
const Process4 = ({ className }) => {
  const dispatch = useDispatch();
  const processList0 = useSelector((state) => {
    return state.recommend.processList[0];
  });
  const [budget, setBudget] = useState(0);

  return (
    <div className={className}>
      <div className="proc4">
        <TopIcons
          onClick1={() => {
            dispatch(recom.setProcessNo(1));
          }}
        />
        <div className="proc4-wrapper">
          <div className="proc4-wrapper-left">
            <div className="upper">예산을 입력해주세요.</div>
            <div className="lower">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <BudgetComponent value={budget} setValue={setBudget} />
                  <p>만원</p>
                </div>
              </div>
            </div>
          </div>
          <div className="proc4-wrapper-right">
            {processList0.map((item, index) => {
              return <div key={index}>{item.value}</div>;
            })}
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

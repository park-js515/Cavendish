import { useState } from "react";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import Swal from "sweetalert2";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// defaultImgs3
import crossImg from "assets/defaultImgs3/cross.png";

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
      <p
        style={{
          fontSize: "2rem",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        만원
      </p>
    </div>
  );
};

const TopIcons = ({ onClick1 }) => {
  const [leftCol, setLeftCol] = useState("black");

  return (
    <div
      style={{
        height: "35px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ImArrowLeft
        size="35"
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
  const dispatch = useDispatch();

  const Btn = ({ disabled }) => {
    const onClick = () => {
      if (!disabled) {
        dispatch(recom.setSelected(index));
        dispatch(recom.setProcessList0({ is_have: !is_have }));
      }
    };

    const btnText = disabled ? "N/A" : is_have ? "보유" : "미보유";
    const className = disabled
      ? "btn-disabled"
      : is_have
      ? "btn-yes"
      : "btn-no";

    return (
      <div className={className} onClick={onClick}>
        {btnText}
      </div>
    );
  };

  const disabled = value === "-1" ? true : false;
  const partName = disabled ? "N/A" : value;

  return (
    <div className="part-check">
      <div
        className="partImg"
        style={{ backgroundImage: `url(${imgUrl ? imgUrl : crossImg})` }}
      ></div>
      <div className="text1">{name}</div>
      <div className="text2">
        <div className="inner">{partName}</div>
      </div>
      <Btn disabled={disabled} />
    </div>
  );
};

const SubmitBtn = ({ onClick }) => {
  return (
    <div className="submitBtn" onClick={onClick}>
      <ImArrowRight />
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
                <div>
                  <BudgetComponent value={budget} setValue={setBudget} />
                  <div
                    style={{
                      fontSize: "1.25rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    최소 예산은 40만원입니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="proc4-wrapper-right">
            <div className="title">보유 여부 확인</div>
            <div className="part-check-wrapper">
              {processList0.map((item, index) => {
                return <PartCheck key={index} index={index} {...item} />;
              })}
            </div>
          </div>
        </div>
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
                const fixedBudget = budget !== "" ? Number(budget) : 0;

                if (fixedBudget >= 40) {
                  dispatch(recom.setProcess({ budget: fixedBudget }));
                  dispatch(recom.setProcessNo(3));
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "예산 에러",
                    text: "최소  예산은 40만원입니다.",
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process4;

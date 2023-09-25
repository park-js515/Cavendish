import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 우선순위 선택
// 우선순위 컴포넌트 -> 반응형
const Process5 = ({ className }) => {
  const dispatch = useDispatch();
  return (
    <div className={className}>
      {" "}
      <p>Process5</p>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(4));
        }}
      >
        버튼1
      </button>
    </div>
  );
};

export default Process5;

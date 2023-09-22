import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 우선순위 선택
// 우선순위 컴포넌트 -> 반응형
const Process5 = ({ processHandler }) => {
  const dispatch = useDispatch();
  return (
    <div className="process">
      {" "}
      <p>Process5</p>
      <button
        onClick={() => {
          processHandler(1);
          dispatch(recom.setProcessNo(3));
        }}
      >
        버튼1
      </button>
    </div>
  );
};

export default Process5;

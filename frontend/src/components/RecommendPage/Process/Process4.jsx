import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 예산 선택
// 예산 입력
// 최소 예산
const Process4 = ({ processHandler }) => {
  const dispatch = useDispatch();

  return (
    <div className="process">
      <p>Process4</p>
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

export default Process4;

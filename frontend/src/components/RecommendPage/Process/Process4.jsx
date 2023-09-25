import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 예산 선택
// 예산 입력
// 최소 예산
const Process4 = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <p>Process4</p>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(1));
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(3));
        }}
      >
        go
      </button>
    </div>
  );
};

export default Process4;

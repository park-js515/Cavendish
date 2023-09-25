import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 3. 용도 선택 자세히
// 입력창?
const Process3 = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <p>Process3</p>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(0));
        }}
      >
        back
      </button>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(2));
        }}
      >
        go
      </button>
    </div>
  );
};

export default Process3;
